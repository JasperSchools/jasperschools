'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Child, ChildInsert } from '@/types/database.types'

export default function AdminDashboard() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingChild, setEditingChild] = useState<Child | null>(null)
  const [formData, setFormData] = useState<ChildInsert>({
    first_name: '',
    last_name: '',
    bio: '',
    class_year: '',
    amount_needed: 0,
    amount_raised: 0,
    photo_path: '',
    age: undefined,
    location: 'Nyairongo, Uganda',
    interests: '',
    archived: false,
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [modal, setModal] = useState<{
    isOpen: boolean
    type: 'success' | 'error' | 'confirm'
    title: string
    message: string
    onConfirm?: () => void
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  })
  const router = useRouter()

  const showModal = (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void) => {
    setModal({ isOpen: true, type, title, message, onConfirm })
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const fetchChildren = useCallback(async () => {
    try {
      const adminPassword = sessionStorage.getItem('adminPassword')
      const res = await fetch('/api/children', {
        headers: {
          'x-admin-password': adminPassword || '',
        },
      })
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      
      const data = await res.json()
      
      // Check if data needs migration
      if (data.length > 0 && !data[0].hasOwnProperty('first_name')) {
        showModal('error', 'Database Migration Required', 'Database schema needs to be updated before using the admin dashboard. Please contact the administrator.')
        console.error('⚠️ DATABASE MIGRATION REQUIRED!')
        console.error('Database schema needs to be updated. Please contact the administrator.')
        setLoading(false)
        return
      }
      
      setChildren(data)
    } catch (error) {
      console.error('Error fetching children:', error)
      showModal('error', 'Error Loading Children', 'Failed to load children. Please check the console for details.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Check if user is authenticated
    const adminPassword = sessionStorage.getItem('adminPassword')
    if (!adminPassword) {
      router.push('/admin')
      return
    }

    fetchChildren()
  }, [router, fetchChildren])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<{ photo_url: string; photo_path: string } | null> => {
    if (!imageFile) return null

    const adminPassword = sessionStorage.getItem('adminPassword')
    const formData = new FormData()
    formData.append('file', imageFile)

    try {
      setUploadingImage(true)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-admin-password': adminPassword || '',
        },
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to upload image')
      }

      const data = await res.json()
      return {
        photo_url: data.photo_url,
        photo_path: data.photo_path,
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      showModal('error', 'Upload Failed', `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemovePhoto = () => {
    showModal('confirm', 'Remove Photo', 'Are you sure you want to remove this photo?', async () => {
      const adminPassword = sessionStorage.getItem('adminPassword')

    try {
      // If there's a photo_path, delete from storage
      if (formData.photo_path) {
        const res = await fetch('/api/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': adminPassword || '',
          },
          body: JSON.stringify({ photo_path: formData.photo_path }),
        })

        if (!res.ok) {
          console.warn('Failed to delete from storage, but will clear from record')
        }
      }

      // Clear photo from form state
      setFormData({
        ...formData,
        photo_path: '',
      })
      setImagePreview('')
      setImageFile(null)

      showModal('success', 'Photo Removed', 'Photo removed successfully')
    } catch (error) {
      console.error('Error removing photo:', error)
      showModal('error', 'Removal Failed', 'Failed to remove photo')
    }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = sessionStorage.getItem('adminPassword')

    try {
      // Upload image if there's a new file
      let photoData: { photo_url?: string; photo_path?: string } = {}

      if (imageFile) {
        const uploadResult = await uploadImage()
        if (uploadResult) {
          photoData = {
            photo_url: uploadResult.photo_url,
            photo_path: uploadResult.photo_path,
          }
        } else {
          return // Stop if image upload failed
        }
      } else if (formData.photo_path) {
        // Keep existing photo if no new upload
        photoData = {
          photo_path: formData.photo_path,
        }
      }

      const url = editingChild ? `/api/children/${editingChild.id}` : '/api/children'
      const method = editingChild ? 'PUT' : 'POST'

      // Remove photo_url from formData if it exists
      const { photo_url, ...formDataWithoutPhotoUrl } = formData as any

      const dataToSend = {
        ...formDataWithoutPhotoUrl,
        ...photoData,
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword || '',
        },
        body: JSON.stringify(dataToSend),
      })

      if (res.ok) {
        fetchChildren()
        resetForm()
        showModal('success', 'Success', `Child ${editingChild ? 'updated' : 'added'} successfully!`)
      } else {
        const error = await res.json()
        showModal('error', 'Save Failed', error.error || 'Failed to save child')
      }
    } catch (error) {
      console.error('Error saving child:', error)
      showModal('error', 'Error', 'Failed to save child')
    }
  }

  const handleArchive = (id: string, currentlyArchived: boolean) => {
    const action = currentlyArchived ? 'unarchive' : 'archive'
    showModal('confirm', `${action.charAt(0).toUpperCase() + action.slice(1)} Child`, `Are you sure you want to ${action} this child?`, async () => {
      const adminPassword = sessionStorage.getItem('adminPassword')

      try {
        const res = await fetch(`/api/children/${id}/archive`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': adminPassword || '',
          },
          body: JSON.stringify({ archived: !currentlyArchived }),
        })

        if (res.ok) {
          fetchChildren()
          showModal('success', 'Success', `Child ${action}d successfully!`)
        } else {
          showModal('error', 'Error', `Failed to ${action} child`)
        }
      } catch (error) {
        console.error(`Error ${action}ing child:`, error)
        showModal('error', 'Error', `Failed to ${action} child`)
      }
    })
  }


  const handleEdit = (child: Child) => {
    setEditingChild(child)
    setFormData({
      first_name: child.first_name || '',
      last_name: child.last_name || '',
      bio: child.bio || '',
      class_year: child.class_year || '',
      amount_needed: Number(child.amount_needed) || 0,
      amount_raised: Number(child.amount_raised) || 0,
      photo_path: child.photo_path || '',
      age: child.age ?? undefined,
      location: child.location || 'Nyairongo, Uganda',
      interests: child.interests || '',
      archived: child.archived || false,
    })
    // Use photo_url for preview (for backward compatibility)
    setImagePreview(child.photo_url || '')
    setImageFile(null)
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingChild(null)
    setFormData({
      first_name: '',
      last_name: '',
      bio: '',
      class_year: '',
      amount_needed: 0,
      amount_raised: 0,
      photo_path: '',
      age: undefined,
      location: 'Nyairongo, Uganda',
      interests: '',
      archived: false,
    })
    setImageFile(null)
    setImagePreview('')
  }

  const CLASS_OPTIONS = [
    { value: 'Baby Class', label: 'Baby Class (KG)' },
    { value: 'Middle Class', label: 'Middle Class (KG)' },
    { value: 'Top Class', label: 'Top Class (KG)' },
    { value: 'P1', label: 'Primary 1' },
    { value: 'P2', label: 'Primary 2' },
    { value: 'P3', label: 'Primary 3' },
    { value: 'P4', label: 'Primary 4' },
    { value: 'P5', label: 'Primary 5' },
    { value: 'P6', label: 'Primary 6' },
    { value: 'P7', label: 'Primary 7' },
  ]

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
              <Link
                href="/"
                className="px-4 py-2 text-school-green hover:text-green-700 font-heading-medium"
              >
                View Site
              </Link>
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
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age ?? ''}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Class/Year *
                  </label>
                  <select
                    required
                    value={formData.class_year}
                    onChange={(e) => setFormData({ ...formData, class_year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  >
                    <option value="">Select a class</option>
                    {CLASS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location ?? ''}
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
                    min="0"
                    value={formData.amount_needed || 0}
                    onChange={(e) => setFormData({ ...formData, amount_needed: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Amount Raised ($) - Read Only
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount_raised || 0}
                    readOnly
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 font-paragraph cursor-not-allowed"
                    title="This field is automatically updated by donations"
                  />
                  <p className="text-xs text-gray-500 mt-1">Updated automatically via donations</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Photo Upload
                  </label>
                  <div className="space-y-3">
                    {imagePreview ? (
                      <div className="space-y-3">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex gap-2">
                          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-heading-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            Change Photo
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="px-4 py-2 border border-red-300 rounded-lg shadow-sm text-sm font-heading-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="cursor-pointer inline-flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-school-green transition-colors w-full justify-center">
                          <div className="text-center py-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm font-heading-medium text-gray-700">
                              Click to upload photo
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              JPEG, PNG, WebP (Max 5MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  <input
                    type="text"
                    value={formData.interests ?? ''}
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

              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="bg-school-green text-white px-6 py-2 rounded-lg hover:bg-green-700 font-heading-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading...' : editingChild ? 'Update Child' : 'Add Child'}
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
              No children added yet. Click &quot;Add New Child&quot; to get started.
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {children.map((child) => (
                    <tr key={child.id} className={`hover:bg-gray-50 ${child.archived ? 'bg-gray-100' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {child.photo_url && (
                            <div className="relative h-10 w-10 rounded-full mr-3 overflow-hidden">
                              <Image
                                src={child.photo_url}
                                alt={`${child.first_name} ${child.last_name}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-heading-medium text-gray-900">
                              {child.first_name} {child.last_name}
                            </div>
                            {child.archived && (
                              <span className="text-xs text-gray-500 italic">Archived</span>
                            )}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-paragraph">
                        <div>
                          <div className="text-gray-900">${child.amount_raised.toFixed(2)}</div>
                          {child.amount_raised >= child.amount_needed && !child.archived && (
                            <span className="text-xs text-green-600 font-heading-semibold">Goal Reached!</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-paragraph">
                        <button
                          onClick={() => handleEdit(child)}
                          className="text-school-green hover:text-green-700 mr-4 font-heading-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleArchive(child.id, child.archived)}
                          className={`font-heading-medium ${
                            child.archived 
                              ? 'text-blue-600 hover:text-blue-800' 
                              : 'text-orange-600 hover:text-orange-800'
                          }`}
                        >
                          {child.archived ? 'Unarchive' : 'Archive'}
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

      {/* Custom Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={modal.type !== 'confirm' ? closeModal : undefined}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scale-in">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4" style={{
                backgroundColor: modal.type === 'success' ? '#DEF7EC' : modal.type === 'error' ? '#FDE8E8' : '#FEF3C7'
              }}>
                {modal.type === 'success' && (
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {modal.type === 'error' && (
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {modal.type === 'confirm' && (
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-heading-bold text-gray-900 mb-2">
                  {modal.title}
                </h3>
                <p className="text-sm text-gray-600 font-paragraph whitespace-pre-line">
                  {modal.message}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3 justify-center">
                {modal.type === 'confirm' ? (
                  <>
                    <button
                      onClick={() => {
                        closeModal()
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-heading-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        modal.onConfirm?.()
                        closeModal()
                      }}
                      className="px-4 py-2 bg-school-green text-white rounded-lg hover:bg-green-700 font-heading-medium transition-colors"
                    >
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-school-green text-white rounded-lg hover:bg-green-700 font-heading-medium transition-colors"
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

