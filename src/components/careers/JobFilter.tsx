'use client'

import { useState } from 'react'
import { JobCategory, EmploymentType, JobStatus } from '@/types/careers'
import { JobFilters } from '@/types/careers'
import { formatEmploymentType } from '@/lib/careers/utils'

interface JobFilterProps {
  categories: JobCategory[]
  locations: string[]
  filters: JobFilters
  onFilterChange: (filters: JobFilters) => void
}

export default function JobFilter({ categories, locations, filters, onFilterChange }: JobFilterProps) {
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters)

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value || undefined }
    setLocalFilters(newFilters)
  }

  const applyFilters = () => {
    onFilterChange(localFilters)
  }

  const resetFilters = () => {
    const emptyFilters: JobFilters = {}
    setLocalFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-heading-bold text-gray-900 mb-4">Filter Jobs</h2>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <label className="block text-sm font-heading-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by job title or keywords"
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-heading-medium text-gray-700 mb-2">Category</label>
          <select
            value={localFilters.category_id || ''}
            onChange={(e) => handleFilterChange('category_id', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-heading-medium text-gray-700 mb-2">Location</label>
          <select
            value={localFilters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent bg-white"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-heading-medium text-gray-700 mb-2">Employment Type</label>
          <select
            value={localFilters.employment_type || ''}
            onChange={(e) => handleFilterChange('employment_type', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent bg-white"
          >
            <option value="">All Types</option>
            {(['full_time', 'part_time', 'contract', 'volunteer'] as EmploymentType[]).map((type) => (
              <option key={type} value={type}>
                {formatEmploymentType(type)}
              </option>
            ))}
          </select>
        </div>

        {/* Job Status */}
        <div>
          <label className="block text-sm font-heading-medium text-gray-700 mb-2">Job Status</label>
          <div className="space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value=""
                checked={!localFilters.status || localFilters.status === 'active'}
                onChange={() => handleFilterChange('status', undefined)}
              />
              All Jobs
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="active"
                checked={localFilters.status === 'active'}
                onChange={() => handleFilterChange('status', 'active')}
              />
              Active Only
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="expired"
                checked={localFilters.status === 'expired'}
                onChange={() => handleFilterChange('status', 'expired')}
              />
              Expired Only
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={applyFilters}
            className="flex-1 bg-school-green text-white px-4 py-2 rounded-lg font-heading-semibold text-sm hover:bg-green-800 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-lg font-heading-medium text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

