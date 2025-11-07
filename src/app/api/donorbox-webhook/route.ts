import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { SponsorshipInsert } from '@/types/database.types'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const webhookSecret = request.headers.get('x-donorbox-signature')
    if (webhookSecret !== process.env.DONORBOX_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = await request.json()
    
    // Extract relevant data from DonorBox payload
    // Adjust these fields based on actual DonorBox webhook structure
    const {
      donation,
    } = payload

    const childId = donation.custom_fields?.child_id || donation.metadata?.child_id
    const amount = parseFloat(donation.amount)
    const donorName = donation.donor.name
    const donorEmail = donation.donor.email
    const frequency = donation.recurring ? 'monthly' : 'one_time'
    const transactionId = donation.id

    if (!childId) {
      return NextResponse.json(
        { error: 'Child ID not found in donation' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()

    // Create sponsorship record
    const sponsorshipData: SponsorshipInsert = {
      child_id: childId,
      donor_name: donorName,
      donor_email: donorEmail,
      amount,
      frequency: frequency as 'one_time' | 'monthly' | 'yearly',
      donorbox_transaction_id: transactionId,
      status: 'completed',
    }

    const { error: sponsorshipError } = await supabase
      .from('sponsorships')
      .insert([sponsorshipData])

    if (sponsorshipError) throw sponsorshipError

    // Update child's amount_raised
    const { data: child, error: childFetchError } = await supabase
      .from('children')
      .select('amount_raised, amount_needed')
      .eq('id', childId)
      .single()

    if (childFetchError) throw childFetchError

    const newAmountRaised = (child.amount_raised || 0) + amount
    let newStatus: 'available' | 'partially_sponsored' | 'fully_sponsored' = 'available'

    if (newAmountRaised >= child.amount_needed) {
      newStatus = 'fully_sponsored'
    } else if (newAmountRaised > 0) {
      newStatus = 'partially_sponsored'
    }

    const { error: updateError } = await supabase
      .from('children')
      .update({
        amount_raised: newAmountRaised,
        status: newStatus,
      })
      .eq('id', childId)

    if (updateError) throw updateError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing DonorBox webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

