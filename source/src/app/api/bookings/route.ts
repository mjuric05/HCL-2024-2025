import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error in bookings API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      car_id,
      car_type,
      car_brand,
      insurance_type,
      pickup_location,
      pickup_date,
      pickup_time,
      dropoff_location,
      dropoff_date,
      dropoff_time,
      total_price
    } = body

    // Create new booking
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        car_id,
        car_type,
        car_brand,
        insurance_type,
        pickup_location,
        pickup_date,
        pickup_time,
        dropoff_location,
        dropoff_date,
        dropoff_time,
        total_price,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    return NextResponse.json({ booking: data }, { status: 201 })
  } catch (error) {
    console.error('Error in booking creation API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
