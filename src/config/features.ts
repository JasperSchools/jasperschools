/**
 * Application Feature Flags
 * 
 * Centralized feature flags for controlling dynamic / interactive features.
 * All flags are disabled (false) by default so the application functions as a static website.
 * 
 * Flags can be toggled on if desired by setting the corresponding environment variable
 * to 'true' in .env.local (e.g., NEXT_PUBLIC_ENABLE_DONATIONS=true).
 */

export const FEATURES = {
  /**
   * Master toggle for database connections (Supabase).
   * Default: false
   */
  ENABLE_DATABASE: process.env.NEXT_PUBLIC_ENABLE_DATABASE === 'true',

  /**
   * Toggle for donation page (/donate) and "Donate Now" buttons/CTAs.
   * Default: false
   */
  ENABLE_DONATIONS: process.env.NEXT_PUBLIC_ENABLE_DONATIONS === 'true',

  /**
   * Toggle for student sponsorship pages (/sponsor, /sponsor/[id]) and "Sponsor a Child" buttons/CTAs.
   * Default: false
   */
  ENABLE_CHILDREN_SPONSORSHIP: process.env.NEXT_PUBLIC_ENABLE_CHILDREN_SPONSORSHIP === 'true',

  /**
   * Toggle for volunteer page (/volunteer) and "Volunteer" buttons/CTAs.
   * Default: false
   */
  ENABLE_VOLUNTEER: process.env.NEXT_PUBLIC_ENABLE_VOLUNTEER === 'true',

  /**
   * Toggle for "Contact Us" buttons/CTAs and contact navigation links.
   * Default: false
   */
  ENABLE_CONTACT: process.env.NEXT_PUBLIC_ENABLE_CONTACT === 'true',

  /**
   * Toggle for careers portal and job applications (/careers, etc.).
   * Default: false
   */
  ENABLE_CAREERS: process.env.NEXT_PUBLIC_ENABLE_CAREERS === 'true',

  /**
   * Toggle for admin management portal (/admin, /admin/dashboard, etc.).
   * Default: false
   */
  ENABLE_ADMIN: process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true',
} as const

export type FeatureKey = keyof typeof FEATURES

export function isFeatureEnabled(key: FeatureKey): boolean {
  return FEATURES[key] === true
}
