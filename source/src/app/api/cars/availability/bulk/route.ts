import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const body = await request.json()
    const { car_ids, pickup_date, dropoff_date, pickup_time, dropoff_time } = body

    if (!car_ids || !Array.isArray(car_ids) || !pickup_date || !dropoff_date) {
      return NextResponse.json({ error: 'Missing required fields or invalid car_ids' }, { status: 400 })
    }

    // For proper datetime comparison, we need to combine date and time
    const requestedPickupTime = pickup_time || '09:00:00'
    const requestedDropoffTime = dropoff_time || '18:00:00'

    // Use the database function that bypasses RLS for availability checking
    const { data: unavailableCarIds, error } = await supabase
      .rpc('check_car_availability', {
        car_ids_input: car_ids,
        pickup_date_input: pickup_date,
        pickup_time_input: requestedPickupTime,
        dropoff_date_input: dropoff_date,  
        dropoff_time_input: requestedDropoffTime
      })

    if (error) {
      console.error('Error calling availability function:', error)
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
    }

    // Create availability map: car is available if NOT in the unavailable list
    const unavailableSet = new Set(unavailableCarIds || [])
    const availability = car_ids.reduce((acc, car_id) => {
      acc[car_id] = !unavailableSet.has(car_id)
      return acc
    }, {} as Record<string, boolean>)

    return NextResponse.json({ availability })
  } catch (error) {
    console.error('Error in bulk availability API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
