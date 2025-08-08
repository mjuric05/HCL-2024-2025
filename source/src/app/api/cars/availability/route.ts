import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const body = await request.json()
    const { car_id, pickup_date, dropoff_date } = body

    if (!car_id || !pickup_date || !dropoff_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if the car is already booked for the requested dates
    const { data: conflictingBookings, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('car_id', car_id)
      .or(`and(pickup_date.lte.${dropoff_date},dropoff_date.gte.${pickup_date})`)

    if (error) {
      console.error('Error checking availability:', error)
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
    }

    // If there are conflicting bookings, the car is not available
    const available = conflictingBookings.length === 0

    return NextResponse.json({ available })
  } catch (error) {
    console.error('Error in availability API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
