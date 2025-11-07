'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      setError('Please enter a password')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Validate password with server
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        // Password is correct, store it and redirect
        sessionStorage.setItem('adminPassword', password)
        router.push('/admin/dashboard')
      } else {
        // Password is incorrect
        setError('Invalid password. Please try again.')
        setPassword('')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading-bold text-school-blue mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 font-paragraph">
            Enter your admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-heading-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph text-gray-900"
              placeholder="Enter admin password"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 font-paragraph">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-school-green text-white font-heading-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-school-green hover:text-green-700 font-paragraph">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

