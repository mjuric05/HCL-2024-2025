import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const body = await request.json()
    const { car_id, pickup_date, dropoff_date, pickup_time, dropoff_time } = body

    if (!car_id || !pickup_date || !dropoff_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // For proper datetime comparison, we need to combine date and time
    const requestedPickupTime = pickup_time || '09:00:00'
    const requestedDropoffTime = dropoff_time || '18:00:00'

    // Convert to timestamps for reliable comparison
    const requestedStart = new Date(`${pickup_date}T${requestedPickupTime}`)
    const requestedEnd = new Date(`${dropoff_date}T${requestedDropoffTime}`)

    // Get all bookings for this car using proper car_id matching
    const { data: allBookings, error } = await supabase
      .from('bookings')
      .select('id, pickup_date, pickup_time, dropoff_date, dropoff_time, car_id')
      .eq('car_id', car_id)

    if (error) {
      console.error('Error checking availability:', error)
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
    }

    // Check for actual datetime conflicts
    let hasConflict = false
    
    if (allBookings && allBookings.length > 0) {
      hasConflict = allBookings.some(booking => {
        const existingStart = new Date(`${booking.pickup_date}T${booking.pickup_time}`)
        const existingEnd = new Date(`${booking.dropoff_date}T${booking.dropoff_time}`)
        
        // Standard interval overlap logic: existing_start < requested_end AND existing_end > requested_start
        const overlap = existingStart < requestedEnd && existingEnd > requestedStart
        
        return overlap
      })
    }

    const available = !hasConflict

    return NextResponse.json({ available })
  } catch (error) {
    console.error('Error in availability API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
