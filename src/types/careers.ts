// Careers portal types

export type JobStatus = 'active' | 'expired' | 'draft'
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'volunteer'
export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'

export interface JobCategory {
  id: string
  created_at: string
  name: string
  slug: string
  description?: string
}

export interface Job {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  category_id: string | null
  location: string
  employment_type: EmploymentType
  status: JobStatus
  description: string
  about_organization?: string
  position_details?: {
    reports_to?: string
    [key: string]: any
  }
  key_responsibilities?: string[]
  qualifications?: string[]
  requirements?: string[]
  posted_date: string
  deadline: string
  application_email: string
  application_whatsapp?: string
  application_instructions?: string
  featured: boolean
  view_count: number
  archived: boolean
  // Joined data
  category?: JobCategory
  application_count?: number
}

export interface JobInsert {
  title: string
  slug?: string
  category_id?: string | null
  location: string
  employment_type: EmploymentType
  status?: JobStatus
  description: string
  about_organization?: string
  position_details?: Record<string, any>
  key_responsibilities?: string[]
  qualifications?: string[]
  requirements?: string[]
  posted_date?: string
  deadline: string
  application_email: string
  application_whatsapp?: string
  application_instructions?: string
  featured?: boolean
  view_count?: number
  archived?: boolean
}

export interface JobUpdate extends Partial<JobInsert> {
  id?: never
  created_at?: never
  updated_at?: never
}

export interface JobApplication {
  id: string
  created_at: string
  updated_at: string
  job_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  whatsapp?: string
  cover_letter?: string // Kept for backward compatibility
  cover_letter_url?: string
  cover_letter_filename?: string
  cv_url?: string
  cv_filename?: string
  academic_documents_url?: string[]
  status: ApplicationStatus
  admin_notes?: string
  ip_address?: string
  user_agent?: string
  // Joined data
  job?: Job
}

export interface JobApplicationInsert {
  job_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  whatsapp?: string
  cover_letter?: string // Kept for backward compatibility
  cover_letter_url?: string
  cover_letter_filename?: string
  cv_url?: string
  cv_filename?: string
  academic_documents_url?: string[]
  status?: ApplicationStatus
  admin_notes?: string
  ip_address?: string
  user_agent?: string
}

export interface JobApplicationUpdate {
  status?: ApplicationStatus
  admin_notes?: string
}

export interface JobStats {
  total: number
  active: number
  expired: number
  categories: number
  locations: number
}

export interface JobFilters {
  search?: string
  category_id?: string
  location?: string
  employment_type?: EmploymentType
  status?: JobStatus
  featured?: boolean
  page?: number
  limit?: number
}

