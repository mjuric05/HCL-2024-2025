"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
}

interface Booking {
  id: string
  car_type: string
  car_brand: string
  insurance_type: string
  pickup_location: string
  pickup_date: string
  pickup_time: string
  dropoff_date: string
  dropoff_time: string
  total_price: number
  status: string
  created_at: string
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/sign_in_and_log_in')
      return
    }

    if (user) {
      fetchUserData()
    }
  }, [user, authLoading, router])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      
      // Fetch user profile
      const profileResponse = await fetch('/api/user/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData.profile)
        setFormData({
          first_name: profileData.profile.first_name || '',
          last_name: profileData.profile.last_name || ''
        })
      }

      // Fetch user bookings
      const bookingsResponse = await fetch('/api/bookings')
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        setBookings(bookingsData.bookings)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setError('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setEditMode(false)
      } else {
        setError('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-[#9747FF]">User Profile</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Profile Information</h2>
            <div className="space-x-2">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#9747FF] text-white px-4 py-2 rounded hover:bg-[#7a33cc]"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#9747FF] focus:border-[#9747FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#9747FF] focus:border-[#9747FF]"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>First Name:</strong> {profile?.first_name || 'Not set'}</p>
              <p><strong>Last Name:</strong> {profile?.last_name || 'Not set'}</p>
              <p><strong>Member since:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</p>
            </div>
          )}
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.car_brand}</h3>
                      <p><strong>Type:</strong> {booking.car_type}</p>
                      <p><strong>Insurance:</strong> {booking.insurance_type}</p>
                      <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-sm ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>{booking.status}</span></p>
                    </div>
                    <div>
                      <p><strong>Pickup:</strong> {booking.pickup_location}</p>
                      <p><strong>Pickup Date:</strong> {booking.pickup_date} at {booking.pickup_time}</p>
                      <p><strong>Return Date:</strong> {booking.dropoff_date} at {booking.dropoff_time}</p>
                      <p><strong>Total Price:</strong> ${booking.total_price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Booked on: {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
