'use client'

import { useState, useRef } from 'react'
import { Job } from '@/types/careers'
import { isValidEmail, isValidPhone } from '@/lib/careers/utils'

interface ApplicationFormProps {
  job: Job
  onSubmit: (data: FormData) => Promise<void>
}

interface FormData {
  full_name: string
  email: string
  phone?: string
  whatsapp?: string
  cover_letter: string
  cv_url?: string
  cv_filename?: string
  academic_documents_url?: string[]
}

export default function ApplicationForm({ job, onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    cover_letter: '',
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [academicFiles, setAcademicFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const cvInputRef = useRef<HTMLInputElement>(null)
  const academicInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const allowedExtensions = ['.pdf', '.doc', '.docx']
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        setErrors(prev => ({ ...prev, cv: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' }))
        return
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cv: 'File too large. Maximum size is 5MB.' }))
        return
      }

      setCvFile(file)
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.cv
        return newErrors
      })
    }
  }

  const handleAcademicFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Validate each file
    const validFiles: File[] = []
    files.forEach(file => {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const allowedExtensions = ['.pdf', '.doc', '.docx']
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
        if (file.size <= 5 * 1024 * 1024) {
          validFiles.push(file)
        }
      }
    })

    setAcademicFiles(prev => [...prev, ...validFiles])
  }

  const removeAcademicFile = (index: number) => {
    setAcademicFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFile = async (file: File, jobId: string): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('jobId', jobId)

    const res = await fetch('/api/upload-cv', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to upload file')
    }

    const data = await res.json()
    return data.cv_url
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number format'
    }

    if (!formData.cover_letter.trim()) {
      newErrors.cover_letter = 'Cover letter is required'
    } else if (formData.cover_letter.trim().length < 50) {
      newErrors.cover_letter = 'Cover letter must be at least 50 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setSubmitting(true)
    setUploading(true)

    try {
      // Upload CV if provided
      let cvUrl: string | undefined
      let cvFilename: string | undefined
      if (cvFile) {
        cvUrl = await uploadFile(cvFile, job.id)
        cvFilename = cvFile.name
      }

      // Upload academic documents if provided
      const academicUrls: string[] = []
      if (academicFiles.length > 0) {
        for (const file of academicFiles) {
          const url = await uploadFile(file, job.id)
          academicUrls.push(url)
        }
      }

      const submitData = {
        ...formData,
        cv_url: cvUrl,
        cv_filename: cvFilename,
        academic_documents_url: academicUrls.length > 0 ? academicUrls : undefined,
      }

      await onSubmit(submitData)
    } catch (error) {
      console.error('Error submitting application:', error)
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to submit application. Please try again.',
      }))
      setSubmitting(false)
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-school-red/30 text-school-red px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="block text-sm font-heading-semibold text-gray-900 mb-2">
          Full Name <span className="text-school-red">*</span>
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent ${
            errors.full_name ? 'border-school-red' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.full_name && <p className="mt-1 text-sm text-school-red">{errors.full_name}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-heading-semibold text-gray-900 mb-2">
            Email Address <span className="text-school-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent ${
              errors.email ? 'border-school-red' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-school-red">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-heading-semibold text-gray-900 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent ${
              errors.phone ? 'border-school-red' : 'border-gray-300'
            }`}
            placeholder="+256 770 799066"
          />
          {errors.phone && <p className="mt-1 text-sm text-school-red">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-900 mb-2">
          WhatsApp (Optional)
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="+256 770 799066"
        />
      </div>

      <div>
        <label htmlFor="cover_letter" className="block text-sm font-heading-semibold text-gray-900 mb-2">
          Cover Letter <span className="text-school-red">*</span>
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          rows={8}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent ${
            errors.cover_letter ? 'border-school-red' : 'border-gray-300'
          }`}
          placeholder="Write a cover letter explaining your suitability for this role..."
        />
        <p className="mt-1 text-sm text-gray-500 font-paragraph">
          {formData.cover_letter.length} characters (minimum 50)
        </p>
        {errors.cover_letter && <p className="mt-1 text-sm text-school-red">{errors.cover_letter}</p>}
      </div>

      <div>
        <label htmlFor="cv" className="block text-sm font-heading-semibold text-gray-900 mb-2">
          CV/Resume <span className="text-school-red">*</span>
        </label>
        <input
          ref={cvInputRef}
          type="file"
          id="cv"
          name="cv"
          onChange={handleCvChange}
          accept=".pdf,.doc,.docx"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-heading-semibold file:bg-school-green/10 file:text-school-green hover:file:bg-school-green/20"
        />
        {cvFile && (
          <p className="mt-2 text-sm text-school-green font-paragraph-medium">
            Selected: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
        {errors.cv && <p className="mt-1 text-sm text-school-red">{errors.cv}</p>}
        <p className="mt-1 text-sm text-gray-500 font-paragraph">PDF, DOC, or DOCX (Max 5MB)</p>
      </div>

      <div>
        <label htmlFor="academic_documents" className="block text-sm font-heading-semibold text-gray-900 mb-2">
          Academic Documents (Optional)
        </label>
        <input
          ref={academicInputRef}
          type="file"
          id="academic_documents"
          name="academic_documents"
          onChange={handleAcademicFilesChange}
          accept=".pdf,.doc,.docx"
          multiple
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-heading-semibold file:bg-school-green/10 file:text-school-green hover:file:bg-school-green/20"
        />
        {academicFiles.length > 0 && (
          <div className="mt-2 space-y-2">
            {academicFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-700 font-paragraph">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
                <button
                  type="button"
                  onClick={() => removeAcademicFile(index)}
                  className="text-school-red hover:text-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500 font-paragraph">PDF, DOC, or DOCX (Max 5MB per file)</p>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full bg-school-yellow text-gray-900 px-6 py-4 rounded-lg font-heading-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {uploading ? 'Uploading files...' : submitting ? 'Submitting...' : 'Submit Application'}
        </button>
        <p className="mt-2 text-sm text-gray-600 text-center">
          By submitting this application, you agree to our terms and conditions.
        </p>
      </div>
    </form>
  )
}

