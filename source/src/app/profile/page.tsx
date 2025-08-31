"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'

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
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [validatePassword, setValidatePassword] = useState(true)
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(true)

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
    
    // Base score for length
    if (checks.length) score += 2;
    // Additional points for longer passwords
    if (password.length >= 10) score += 1;
    if (password.length >= 12) score += 1;
    
    if (checks.lowercase) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.special) score += 1;
    
    if (score <= 2) return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 4) return { strength: 2, label: "Medium", color: "bg-yellow-500" };
    return { strength: 3, label: "Strong", color: "bg-green-500" };
  }

  const passwordsMatch = () => {
    return formData.password === formData.confirmPassword;
  }

  const EyeClosedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="black"
      className="w-5 h-5"
    >
      <path d="M10 3C6 3 2.73 5.44 1.3 9.1a1 1 0 0 0 0 .8C2.73 13.56 6 16 10 16s7.27-2.44 8.7-6.1a1 1 0 0 0 0-.8C17.27 5.44 14 3 10 3zm5 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
      <path d="M13.59 13.41 6.59 6.41 5.17 7.82l7 7z" />
    </svg>
  );

  const EyeOpenIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="black"
      className="w-5 h-5"
    >
      <path d="M10 3C6 3 2.73 5.44 1.3 9.1a1 1 0 0 0 0 .8C2.73 13.56 6 16 10 16s7.27-2.44 8.7-6.1a1 1 0 0 0 0-.8C17.27 5.44 14 3 10 3zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/sign_in_and_log_in')
      return
    }

    // Only fetch data if we have a user and haven't loaded data yet
    if (user && !profile && bookings.length === 0 && !error) {
      fetchUserData()
    }
  }, [user, authLoading, router, profile, bookings.length, error])

  const fetchUserData = async () => {
    try {
      // Only show loading if we don't have any data yet
      if (!profile && bookings.length === 0) {
        setLoading(true)
      }
      
      // Fetch user profile
      const profileResponse = await fetch('/api/user/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData.profile)
        setFormData({
          first_name: profileData.profile.first_name || '',
          last_name: profileData.profile.last_name || '',
          password: '',
          confirmPassword: ''
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
    
    // Validate password if provided
    if (formData.password.trim()) {
      if (!isValidPassword(formData.password)) {
        setError('Password must be at least 8 characters long')
        return
      }
      if (!passwordsMatch()) {
        setError('Passwords do not match')
        return
      }
    }
    
    try {
      const supabase = createSupabaseClient()
      
      // Handle password change with Supabase Auth
      if (formData.password.trim()) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.password
        })
        
        if (passwordError) {
          setError(`Failed to update password: ${passwordError.message}`)
          return
        }
      }

      // Handle profile data (first_name, last_name) with custom API
      if (formData.first_name !== profile?.first_name || formData.last_name !== profile?.last_name) {
        const updateData = {
          first_name: formData.first_name,
          last_name: formData.last_name
        }

        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        })

        if (!response.ok) {
          setError('Failed to update profile information')
          return
        }

        const data = await response.json()
        setProfile(data.profile)
      }

      // Success
      setEditMode(false)
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
      setError(null)
      
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Remove the booking from the state since it's deleted from the database
        setBookings(bookings.filter(booking => booking.id !== bookingId))
        setCancelBookingId(null)
        setError(null)
      } else {
        const errorData = await response.json();
        setError(`Failed to cancel booking: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      setError('Failed to cancel booking')
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (loading && !profile && bookings.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    )
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
            <h2 className="text-2xl font-semibold text-[#9747FF]">Profile Information</h2>
            <div className="space-x-2">
              {!editMode ? (
                <button
                  onClick={() => {
                    setFormData({
                      first_name: profile?.first_name || '',
                      last_name: profile?.last_name || '',
                      password: '',
                      confirmPassword: ''
                    })
                    setEditMode(true)
                  }}
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
            </div>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4" autoComplete="off">
              <div>
                <label className="block text-sm font-medium text-[#9747FF]">First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#9747FF] focus:border-[#9747FF] text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9747FF]">Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#9747FF] focus:border-[#9747FF] text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9747FF]">New Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      setValidatePassword(e.target.value === '' || isValidPassword(e.target.value))
                      setValidateConfirmPassword(e.target.value === formData.confirmPassword || formData.confirmPassword === '')
                    }}
                    placeholder="Leave blank to keep current password"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className={`block w-full px-3 py-2 pr-12 border rounded-md focus:outline-none focus:ring-[#9747FF] focus:border-[#9747FF] text-gray-700 ${
                      validatePassword ? 'border-gray-300' : 'border-red-500'
                    }`}
                  />
                  {formData.password && (
                    <button
                      type="button"
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      onMouseLeave={() => setShowPassword(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 flex items-center justify-center"
                    >
                      {showPassword ? EyeOpenIcon : EyeClosedIcon}
                    </button>
                  )}
                </div>
                {!validatePassword && formData.password && (
                  <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long</p>
                )}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`}
                          style={{ width: `${(getPasswordStrength(formData.password).strength / 3) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {getPasswordStrength(formData.password).label}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9747FF]">Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    setValidateConfirmPassword(formData.password === e.target.value || e.target.value === '')
                  }}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#9747FF] focus:border-[#9747FF] text-gray-700 ${
                    validateConfirmPassword ? 'border-gray-300' : 'border-red-500'
                  }`}
                />
                {!validateConfirmPassword && formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                )}
              </div>
              <button
                type="submit"
                disabled={
                  formData.password.trim() !== '' && (!validatePassword || !validateConfirmPassword)
                }
                className={`px-4 py-2 rounded text-white ${
                  (formData.password.trim() !== '' && (!validatePassword || !validateConfirmPassword))
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <p><strong className="text-[#9747FF]">Email:</strong> <span className="text-gray-700">{user.email}</span></p>
              <p><strong className="text-[#9747FF]">First Name:</strong> <span className="text-gray-700">{profile?.first_name || 'Not set'}</span></p>
              <p><strong className="text-[#9747FF]">Last Name:</strong> <span className="text-gray-700">{profile?.last_name || 'Not set'}</span></p>
              <p><strong className="text-[#9747FF]">Member since:</strong> <span className="text-gray-700">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</span></p>
            </div>
          )}
        </div>

        {/* Bookings Section - Hidden when editing profile */}
        {!editMode && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#9747FF]">Your Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-700">{booking.car_brand}</h3>
                        <p><strong className="text-[#9747FF]">Type:</strong> <span className="text-gray-700">{booking.car_type}</span></p>
                        <p><strong className="text-[#9747FF]">Insurance:</strong> <span className="text-gray-700">{booking.insurance_type}</span></p>
                      </div>
                      <div>
                        <p><strong className="text-[#9747FF]">Pickup:</strong> <span className="text-gray-700">{booking.pickup_location}</span></p>
                        <p><strong className="text-[#9747FF]">Pickup Date:</strong> <span className="text-gray-700">{booking.pickup_date} at {booking.pickup_time}</span></p>
                        <p><strong className="text-[#9747FF]">Return Date:</strong> <span className="text-gray-700">{booking.dropoff_date} at {booking.dropoff_time}</span></p>
                        <p><strong className="text-[#9747FF]">Total Price:</strong> <span className="text-gray-700">${booking.total_price}</span></p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-500">
                        <strong className="text-[#9747FF]">Booked on:</strong> {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => setCancelBookingId(booking.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cancel Booking Confirmation Dialog */}
      {cancelBookingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancel Booking</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCancelBookingId(null)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(cancelBookingId)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
