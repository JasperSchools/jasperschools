'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TeamMemberProps {
  name: string
  education: string
  profile: string
  imageSrc?: string
  delay?: number
}

export default function TeamMember({ name, education, profile, imageSrc, delay = 0 }: TeamMemberProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-school-blue to-school-green">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl">
              <span className="text-5xl font-bold text-school-blue">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-clean-medium text-school-blue mb-2">{name}</h3>
        <p className="text-sm text-gray-600 font-clean mb-4">{education}</p>
        
        {/* Profile Text */}
        <div className="space-y-3">
          {isExpanded ? (
            <p className="text-gray-700 leading-relaxed font-clean text-sm">{profile}</p>
          ) : (
            <p className="text-gray-700 leading-relaxed font-clean text-sm line-clamp-3">
              {profile}
            </p>
          )}
          
          {/* Read More/Less Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-school-green hover:text-green-700 font-clean-medium text-sm transition-colors"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  )
}
