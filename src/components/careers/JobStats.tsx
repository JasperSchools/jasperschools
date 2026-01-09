'use client'

import Link from 'next/link'
import { JobStats as Stats } from '@/types/careers'

interface JobStatsProps {
  stats: Stats
}

export default function JobStats({ stats }: JobStatsProps) {
  const statCards = [
    {
      title: `${stats.total} total positions`,
      subtitle: `${stats.active} currently open`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v6a2 2 0 002 2h4a2 2 0 002-2V6" />
        </svg>
      ),
      accent: 'green',
    },
    {
      title: `${stats.expired} closed positions`,
      subtitle: '',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accent: 'yellow',
      action: { label: 'View archived roles', href: '/careers/browse?status=expired' },
    },
    {
      title: `${stats.categories} job categories`,
      subtitle: '',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      accent: 'blue',
      action: { label: 'Browse fields', href: '/careers/browse' },
    },
    {
      title: `${stats.locations} work locations`,
      subtitle: '',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      accent: 'green',
      action: { label: 'View locations', href: '/careers/browse' },
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                card.accent === 'green'
                  ? 'bg-school-green/10 text-school-green'
                  : card.accent === 'yellow'
                  ? 'bg-school-yellow/20 text-yellow-700'
                  : 'bg-school-blue/10 text-school-blue'
              }`}
            >
              {card.icon}
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-heading-bold text-gray-900 mb-1">
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="text-xs sm:text-sm text-gray-600 mb-3 font-paragraph">
              {card.subtitle}
            </p>
          )}
          {card.action && (
            <Link
              href={card.action.href}
              className="mt-auto inline-flex items-center text-sm text-school-green font-heading-medium hover:text-school-green/80 transition-colors"
            >
              {card.action.label}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

