import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (token_hash && type) {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.auth.verifyOtp({
      type: type as 'signup',
      token_hash,
    })

    if (!error) {
      // Redirect to success page or dashboard
      return NextResponse.redirect(new URL('/auth/confirmed', request.url))
    } else {
      // Redirect to error page
      return NextResponse.redirect(new URL('/auth/error', request.url))
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/auth/error', request.url))
}
