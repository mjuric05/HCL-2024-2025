import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    
    // Get cars from Supabase database
    const { data: cars, error } = await supabase
      .from('cars')
      .select('*')
      .eq('available', true)
      .order('title', { ascending: true })

    if (error) {
      console.error('Error fetching cars from Supabase:', error)
      return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
    }

    // Transform data to match the expected format for the frontend
    const transformedCars = cars.map(car => ({
      sys: { id: car.id },
      fields: {
        title: car.title,
        description: {
          nodeType: 'document',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: car.description || '',
                  marks: []
                }
              ]
            }
          ]
        },
        price: car.price,
        size: car.size,
        thumbnail: car.thumbnail_url ? {
          fields: {
            file: {
              url: car.thumbnail_url,
              size: car.size
            }
          }
        } : undefined
      }
    }))

    return NextResponse.json(transformedCars)
  } catch (error) {
    console.error('Error in cars API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
