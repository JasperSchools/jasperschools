'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Child, ChildInsert } from '@/types/database.types'

export default function AdminDashboard() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingChild, setEditingChild] = useState<Child | null>(null)
  const [formData, setFormData] = useState<ChildInsert>({
    name: '',
    bio: '',
    class_year: '',
    amount_needed: 0,
    amount_raised: 0,
    photo_url: '',
    age: null,
    location: 'Nyairongo, Uganda',
    interests: '',
    status: 'available',
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const adminPassword = sessionStorage.getItem('adminPassword')
    if (!adminPassword) {
      router.push('/admin')
      return
    }

    fetchChildren()
  }, [router])

  const fetchChildren = async () => {
    try {
      const res = await fetch('/api/children')
      const data = await res.json()
      setChildren(data)
    } catch (error) {
      console.error('Error fetching children:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = sessionStorage.getItem('adminPassword')

    try {
      const url = editingChild ? `/api/children/${editingChild.id}` : '/api/children'
      const method = editingChild ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword || '',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchChildren()
        resetForm()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to save child')
      }
    } catch (error) {
      console.error('Error saving child:', error)
      alert('Failed to save child')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this child?')) return

    const adminPassword = sessionStorage.getItem('adminPassword')

    try {
      const res = await fetch(`/api/children/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword || '',
        },
      })

      if (res.ok) {
        fetchChildren()
      } else {
        alert('Failed to delete child')
      }
    } catch (error) {
      console.error('Error deleting child:', error)
      alert('Failed to delete child')
    }
  }

  const handleEdit = (child: Child) => {
    setEditingChild(child)
    setFormData({
      name: child.name,
      bio: child.bio,
      class_year: child.class_year,
      amount_needed: child.amount_needed,
      amount_raised: child.amount_raised,
      photo_url: child.photo_url || '',
      age: child.age,
      location: child.location || 'Nyairongo, Uganda',
      interests: child.interests || '',
      status: child.status,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingChild(null)
    setFormData({
      name: '',
      bio: '',
      class_year: '',
      amount_needed: 0,
      amount_raised: 0,
      photo_url: '',
      age: null,
      location: 'Nyairongo, Uganda',
      interests: '',
      status: 'available',
    })
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminPassword')
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-heading-medium text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading-bold text-school-blue">
              Sponsor a Child - Admin Dashboard
            </h1>
            <div className="flex gap-4">
              <a
                href="/"
                className="px-4 py-2 text-school-green hover:text-green-700 font-heading-medium"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-heading-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Child Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-school-green text-white px-6 py-3 rounded-lg hover:bg-green-700 font-heading-semibold transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add New Child'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-heading-bold text-school-blue mb-6">
              {editingChild ? 'Edit Child' : 'Add New Child'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Class/Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.class_year}
                    onChange={(e) => setFormData({ ...formData, class_year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                    placeholder="e.g., Primary 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Amount Needed ($) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.amount_needed}
                    onChange={(e) => setFormData({ ...formData, amount_needed: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Amount Raised ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount_raised}
                    onChange={(e) => setFormData({ ...formData, amount_raised: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={formData.photo_url || ''}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  <input
                    type="text"
                    value={formData.interests || ''}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                    placeholder="e.g., Reading, Soccer, Art"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Bio *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                    placeholder="Tell us about this child..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'partially_sponsored' | 'fully_sponsored' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  >
                    <option value="available">Available</option>
                    <option value="partially_sponsored">Partially Sponsored</option>
                    <option value="fully_sponsored">Fully Sponsored</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-school-green text-white px-6 py-2 rounded-lg hover:bg-green-700 font-heading-semibold transition-colors"
                >
                  {editingChild ? 'Update Child' : 'Add Child'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 font-heading-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Children List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-heading-bold text-school-blue">
              All Children ({children.length})
            </h2>
          </div>
          
          {children.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-paragraph">
              No children added yet. Click "Add New Child" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Amount Needed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Amount Raised
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {children.map((child) => (
                    <tr key={child.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {child.photo_url && (
                            <img
                              src={child.photo_url}
                              alt={child.name}
                              className="h-10 w-10 rounded-full mr-3 object-cover"
                            />
                          )}
                          <div className="text-sm font-heading-medium text-gray-900">
                            {child.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-paragraph">
                        {child.age || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-paragraph">
                        {child.class_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-paragraph">
                        ${child.amount_needed.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-paragraph">
                        ${child.amount_raised.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-heading-semibold rounded-full ${
                          child.status === 'fully_sponsored'
                            ? 'bg-green-100 text-green-800'
                            : child.status === 'partially_sponsored'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {child.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-paragraph">
                        <button
                          onClick={() => handleEdit(child)}
                          className="text-school-green hover:text-green-700 mr-4 font-heading-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(child.id)}
                          className="text-red-600 hover:text-red-800 font-heading-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

