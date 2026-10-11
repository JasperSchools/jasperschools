import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { FEATURES } from '@/config/features'

export async function createClient() {
  if (
    !FEATURES.ENABLE_DATABASE ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          const normalized = {
            ...options,
            expires:
              options?.expires instanceof Date
                ? options.expires.getTime()
                : options?.expires,
          }
          cookieStore.set(name, value, normalized)
        },
        remove(name: string, options: CookieOptions) {
          const normalized = {
            ...options,
            expires:
              options?.expires instanceof Date
                ? options.expires.getTime()
                : options?.expires,
          }
          cookieStore.set(name, '', normalized)
        },
      },
    }
  )
}

export async function createServiceClient() {
  if (
    !FEATURES.ENABLE_DATABASE ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return null
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          const normalized = {
            ...options,
            expires:
              options?.expires instanceof Date
                ? options.expires.getTime()
                : options?.expires,
          }
          cookieStore.set(name, value, normalized)
        },
        remove(name: string, options: CookieOptions) {
          const normalized = {
            ...options,
            expires:
              options?.expires instanceof Date
                ? options.expires.getTime()
                : options?.expires,
          }
          cookieStore.set(name, '', normalized)
        },
      },
    }
  )
}
