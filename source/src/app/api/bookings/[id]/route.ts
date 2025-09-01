import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bookingId = params.id

    // First check if the booking exists and belongs to the user
    const { data: existingBooking, error: checkError } = await supabase
      .from('bookings')
      .select('id, user_id, pickup_date, pickup_time')
      .eq('id', bookingId)
      .eq('user_id', user.id)
      .single()

    if (checkError || !existingBooking) {
      return NextResponse.json({ error: 'Booking not found or unauthorized' }, { status: 404 })
    }

    // Check if the booking has already started
    const pickupDateTime = new Date(`${existingBooking.pickup_date} ${existingBooking.pickup_time}`)
    const now = new Date()
    
    if (pickupDateTime <= now) {
      return NextResponse.json({ 
        error: 'Cannot cancel booking that has already started' 
      }, { status: 400 })
    }

    // Delete the booking from the database
    const { data: deletedData, error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)
      .eq('user_id', user.id)
      .select()

    if (error) {
      console.error('Error deleting booking:', error)
      return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
    }

    // Check if any rows were actually deleted
    if (!deletedData || deletedData.length === 0) {
      return NextResponse.json({ error: 'Booking not found or access denied' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Booking cancelled successfully', deletedBooking: deletedData[0] })
  } catch (error) {
    console.error('Error in booking deletion API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
