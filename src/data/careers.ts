import { Job, JobCategory } from '@/types/careers'

export const sampleJobCategories: JobCategory[] = [
  {
    id: 'teaching',
    created_at: '2025-01-01T00:00:00Z',
    name: 'Teaching & Academics',
    slug: 'teaching',
    description: 'Classroom teaching and academic instruction roles',
  },
  {
    id: 'administration',
    created_at: '2025-01-01T00:00:00Z',
    name: 'School Administration',
    slug: 'administration',
    description: 'School operations and management roles',
  },
]

export const sampleJobs: Job[] = [
  {
    id: 'primary-teacher',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
    title: 'Primary School Teacher',
    slug: 'primary-school-teacher',
    category_id: 'teaching',
    location: 'Nyairongo, Uganda',
    employment_type: 'full_time',
    status: 'active',
    description: 'We are seeking an enthusiastic, qualified Primary Teacher to join our dedicated team at Jasper Primary School in Nyairongo, Uganda.',
    about_organization: 'Jasper Primary School is dedicated to providing high-quality, inclusive, and transformative education for rural communities in Uganda.',
    position_details: {
      reports_to: 'Head Teacher',
    },
    key_responsibilities: [
      'Deliver engaging lessons aligned with the Ugandan primary curriculum',
      'Create a nurturing, student-centered classroom environment',
      'Assess and support students across various learning abilities',
      'Collaborate with fellow educators and parents',
    ],
    qualifications: [
      'Diploma or Degree in Primary Education',
      'Registered with the Ministry of Education and Sports (Uganda)',
      'Experience teaching primary school learners in rural or community settings',
    ],
    requirements: [
      'Strong communication skills in English',
      'Passion for inclusive rural education',
    ],
    posted_date: '2025-01-15T00:00:00Z',
    deadline: '2026-12-31T00:00:00Z',
    application_email: 'careers@jasperschools.org',
    application_whatsapp: '+256777470651',
    application_instructions: 'Please email your CV, cover letter, and academic credentials to careers@jasperschools.org with the subject line "Primary School Teacher Application".',
    featured: true,
    view_count: 42,
    archived: false,
    category: sampleJobCategories[0],
    application_count: 0,
  },
]
