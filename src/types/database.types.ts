export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      children: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          bio: string
          class_year: string
          amount_needed: number
          amount_raised: number
          photo_url: string | null
          status: 'available' | 'partially_sponsored' | 'fully_sponsored'
          age: number | null
          location: string | null
          interests: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          bio: string
          class_year: string
          amount_needed: number
          amount_raised?: number
          photo_url?: string | null
          status?: 'available' | 'partially_sponsored' | 'fully_sponsored'
          age?: number | null
          location?: string | null
          interests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          bio?: string
          class_year?: string
          amount_needed?: number
          amount_raised?: number
          photo_url?: string | null
          status?: 'available' | 'partially_sponsored' | 'fully_sponsored'
          age?: number | null
          location?: string | null
          interests?: string | null
        }
      }
      sponsorships: {
        Row: {
          id: string
          created_at: string
          child_id: string
          donor_name: string
          donor_email: string
          amount: number
          frequency: 'one_time' | 'monthly' | 'yearly'
          donorbox_transaction_id: string | null
          status: 'pending' | 'completed' | 'cancelled'
        }
        Insert: {
          id?: string
          created_at?: string
          child_id: string
          donor_name: string
          donor_email: string
          amount: number
          frequency?: 'one_time' | 'monthly' | 'yearly'
          donorbox_transaction_id?: string | null
          status?: 'pending' | 'completed' | 'cancelled'
        }
        Update: {
          id?: string
          created_at?: string
          child_id?: string
          donor_name?: string
          donor_email?: string
          amount?: number
          frequency?: 'one_time' | 'monthly' | 'yearly'
          donorbox_transaction_id?: string | null
          status?: 'pending' | 'completed' | 'cancelled'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Child = Database['public']['Tables']['children']['Row']
export type ChildInsert = Database['public']['Tables']['children']['Insert']
export type ChildUpdate = Database['public']['Tables']['children']['Update']

export type Sponsorship = Database['public']['Tables']['sponsorships']['Row']
export type SponsorshipInsert = Database['public']['Tables']['sponsorships']['Insert']
export type SponsorshipUpdate = Database['public']['Tables']['sponsorships']['Update']

