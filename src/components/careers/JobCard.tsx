'use client'

import Link from 'next/link'
import { Job } from '@/types/careers'
import { formatDate, formatEmploymentType, getJobExcerpt, isJobExpired } from '@/lib/careers/utils'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const expired = isJobExpired(job.deadline)
  const excerpt = getJobExcerpt(job.description, 150)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 bg-school-green/10 text-school-green text-xs font-heading-semibold rounded">
              {formatEmploymentType(job.employment_type)}
            </span>
            {job.featured && (
              <span className="inline-block px-3 py-1 bg-school-yellow/20 text-gray-900 text-xs font-heading-semibold rounded">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {job.title}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        {job.category && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>{job.category.name}</span>
          </div>
        )}
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{job.location}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={expired ? 'text-school-red font-heading-semibold' : ''}>
            Deadline: {formatDate(job.deadline)}
          </span>
        </div>
        {job.application_count !== undefined && job.application_count > 0 && (
          <span className="text-sm text-school-green font-heading-medium">
            {job.application_count} {job.application_count === 1 ? 'application' : 'applications'}
          </span>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <Link
          href={`/careers/browse/${job.slug || job.id}`}
          className="flex-1 bg-school-blue text-white px-4 py-2 rounded-lg text-center font-heading-semibold hover:bg-blue-900 transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/careers/apply/${job.id}`}
          className="flex-1 bg-school-yellow text-gray-900 px-4 py-2 rounded-lg text-center font-heading-semibold hover:bg-yellow-400 transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
}

