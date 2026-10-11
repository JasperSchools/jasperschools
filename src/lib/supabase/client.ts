import { createBrowserClient } from '@supabase/ssr'
import { FEATURES } from '@/config/features'

export function createClient() {
  if (
    !FEATURES.ENABLE_DATABASE ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
