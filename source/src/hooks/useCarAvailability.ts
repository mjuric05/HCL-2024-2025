import { useState, useEffect, useCallback, useRef } from 'react'

// Simple debounce utility
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout
  const debouncedFn = (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
  debouncedFn.cancel = () => clearTimeout(timeoutId)
  return debouncedFn as T & { cancel: () => void }
}

interface Car {
  id: string
  title: string
  description?: string
  price: number
  size: string
  thumbnail_url: string
  available?: boolean
}

export const useCarAvailability = (cars: Car[], pickupDate: string, dropoffDate: string, pickupTime: string, dropoffTime: string) => {
  const [availableCars, setAvailableCars] = useState<Car[]>(cars)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkBulkAvailability = useCallback(
    debounce(async (carsToCheck: Car[], pickup_date: string, dropoff_date: string, pickup_time: string, dropoff_time: string) => {
      if (!pickup_date || !dropoff_date || carsToCheck.length === 0) {
        setAvailableCars(carsToCheck)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const car_ids = carsToCheck.map(car => car.id)
        
        const response = await fetch('/api/cars/availability/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            car_ids,
            pickup_date,
            dropoff_date,
            pickup_time: pickup_time || '09:00:00',
            dropoff_time: dropoff_time || '18:00:00',
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to check car availability')
        }

        const { availability } = await response.json()
        
        // Filter cars to only include available ones
        const availableCarsList = carsToCheck.filter(car => availability[car.id] === true)

        setAvailableCars(availableCarsList)
      } catch (err) {
        console.error('Error checking car availability:', err)
        setError('Failed to check car availability')
        // Fallback: show all cars as available
        setAvailableCars(carsToCheck.map(car => ({ ...car, available: true })))
      } finally {
        setIsLoading(false)
      }
    }, 500), // 500ms debounce
    []
  )

  useEffect(() => {
    setIsLoading(true)
    checkBulkAvailability(cars, pickupDate, dropoffDate, pickupTime, dropoffTime)
    
    return () => {
      checkBulkAvailability.cancel()
    }
  }, [cars, pickupDate, dropoffDate, pickupTime, dropoffTime, checkBulkAvailability])

  return {
    availableCars,
    isLoading,
    error,
    refreshAvailability: () => checkBulkAvailability(cars, pickupDate, dropoffDate, pickupTime, dropoffTime)
  }
}
