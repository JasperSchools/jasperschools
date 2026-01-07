'use client'

import Link from 'next/link'
import { JobStats as Stats } from '@/types/careers'

interface JobStatsProps {
  stats: Stats
}

export default function JobStats({ stats }: JobStatsProps) {
  const statCards = [
    {
      title: `${stats.total} Total Positions`,
      subtitle: `${stats.active} Currently Open`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v6a2 2 0 002 2h4a2 2 0 002-2V6" />
        </svg>
      ),
      bgColor: 'bg-school-green',
      textColor: 'text-white',
    },
    {
      title: `${stats.expired} Closed Positions`,
      subtitle: '',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-school-yellow',
      textColor: 'text-gray-900',
      action: { label: 'View Archive', href: '/careers/browse?status=expired' },
    },
    {
      title: `${stats.categories} Job Categories`,
      subtitle: '',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      bgColor: 'bg-school-blue',
      textColor: 'text-white',
      action: { label: 'Browse Fields', href: '/careers/browse' },
    },
    {
      title: `${stats.locations} Work Locations`,
      subtitle: '',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-school-green',
      textColor: 'text-white',
      action: { label: 'Find Nearby', href: '/careers/browse' },
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} ${card.textColor} rounded-lg p-6 flex flex-col`}
        >
          <div className="mb-4">{card.icon}</div>
          <h3 className="text-xl font-bold mb-1">{card.title}</h3>
          {card.subtitle && <p className="text-sm opacity-90 mb-4">{card.subtitle}</p>}
          {card.action && (
            <Link
              href={card.action.href}
              className="mt-auto inline-block bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded font-semibold transition-colors"
            >
              {card.action.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

