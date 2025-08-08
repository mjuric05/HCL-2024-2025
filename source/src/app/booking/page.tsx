"use client";

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

// Updated interface for Supabase car data
interface Car {
    id: string;
    title: string;
    description: string;
    price: number;
    size: string;
    thumbnail_url: string;
    available: boolean;
}

interface BookingData {
    pickupDate: Date | null;
    pickupTime: string;
    pickupLocation: string;
    dropoffDate: Date | null;
    dropoffTime: string;
    dropoffLocation: string;
    selectedCar: Car | null;
    insuranceType: string;
    totalPrice: number;
}

// Location options
const LOCATIONS = [
    'Airport Terminal 1',
    'Airport Terminal 2', 
    'Downtown Office',
    'City Center',
    'Train Station',
    'Hotel District'
];

// Insurance options
const INSURANCE_OPTIONS = [
    { name: 'Basic Coverage', price: 50, description: 'Basic liability coverage' },
    { name: 'Standard Coverage', price: 70, description: 'Comprehensive coverage with deductible' },
    { name: 'Premium Coverage', price: 100, description: 'Full coverage with no deductible' }
];

async function fetchCarsFromSupabase(): Promise<Car[]> {
    try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        return data.cars || [];
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}

async function checkCarAvailability(carId: string, pickupDate: Date, dropoffDate: Date): Promise<boolean> {
    try {
        const response = await fetch('/api/cars/availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                car_id: carId,
                pickup_date: pickupDate.toISOString().split('T')[0],
                dropoff_date: dropoffDate.toISOString().split('T')[0]
            }),
        });
        
        if (!response.ok) {
            return false;
        }
        
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error("Error checking availability:", error);
        return false;
    }
}

export default function BookingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        pickupDate: null,
        pickupTime: '',
        pickupLocation: '',
        dropoffDate: null,
        dropoffTime: '',
        dropoffLocation: '',
        selectedCar: null,
        insuranceType: '',
        totalPrice: 0
    });
    
    const [cars, setCars] = useState<Car[]>([]);
    const [availableCars, setAvailableCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { user } = useAuth();
    const router = useRouter();

    // Load cars on component mount
    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        try {
            const carsData = await fetchCarsFromSupabase();
            setCars(carsData);
        } catch (error) {
            console.error("Error loading cars:", error);
        }
    };

    // Check availability when date/time changes
    const checkAvailability = async () => {
        if (!bookingData.pickupDate || !bookingData.dropoffDate || !bookingData.pickupTime || !bookingData.dropoffTime) {
            return;
        }

        setIsLoading(true);
        const available: Car[] = [];

        for (const car of cars) {
            const isAvailable = await checkCarAvailability(
                car.id,
                bookingData.pickupDate,
                bookingData.dropoffDate
            );
            if (isAvailable) {
                available.push(car);
            }
        }

        setAvailableCars(available);
        setIsLoading(false);
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isValidDateTime = () => {
        if (!bookingData.pickupDate || !bookingData.dropoffDate || !bookingData.pickupTime || !bookingData.dropoffTime) {
            return false;
        }

        const pickupDateTime = new Date(`${bookingData.pickupDate.toDateString()} ${bookingData.pickupTime}`);
        const dropoffDateTime = new Date(`${bookingData.dropoffDate.toDateString()} ${bookingData.dropoffTime}`);
        
        return dropoffDateTime > pickupDateTime;
    };

    const handleNext = async () => {
        setErrorMessage('');

        if (currentStep === 1) {
            // Validate date/time/location step
            if (!bookingData.pickupDate || !bookingData.pickupTime || !bookingData.pickupLocation || 
                !bookingData.dropoffDate || !bookingData.dropoffTime || !bookingData.dropoffLocation) {
                setErrorMessage('Please fill in all fields');
                return;
            }

            if (!isValidDateTime()) {
                setErrorMessage('Drop-off date and time must be after pickup date and time');
                return;
            }

            // Check car availability for next step
            await checkAvailability();
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Validate car selection
            if (!bookingData.selectedCar) {
                setErrorMessage('Please select a car');
                return;
            }
            setCurrentStep(3);
        } else if (currentStep === 3) {
            // Validate insurance selection
            if (!bookingData.insuranceType) {
                setErrorMessage('Please select an insurance option');
                return;
            }
            
            // Calculate total price
            const selectedInsurance = INSURANCE_OPTIONS.find(ins => ins.name === bookingData.insuranceType);
            const total = (bookingData.selectedCar?.price || 0) + (selectedInsurance?.price || 0);
            setBookingData(prev => ({ ...prev, totalPrice: total }));
            setCurrentStep(4);
        } else if (currentStep === 4) {
            // Confirm booking
            await submitBooking();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrorMessage('');
        }
    };

    const submitBooking = async () => {
        if (!user) {
            router.push('/sign_in_and_log_in');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    car_id: bookingData.selectedCar?.id,
                    car_brand: bookingData.selectedCar?.title,
                    insurance_type: bookingData.insuranceType,
                    pickup_location: bookingData.pickupLocation,
                    pickup_date: bookingData.pickupDate?.toISOString().split('T')[0],
                    pickup_time: bookingData.pickupTime,
                    dropoff_location: bookingData.dropoffLocation,
                    dropoff_date: bookingData.dropoffDate?.toISOString().split('T')[0],
                    dropoff_time: bookingData.dropoffTime,
                    total_price: bookingData.totalPrice
                }),
            });

            if (response.ok) {
                setSuccessMessage('Booking confirmed successfully!');
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to create booking');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 1: Date, Time, and Location Selection
    const renderStep1 = () => (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9747FF] mb-8 text-center">Select Dates & Locations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#9747FF]">Pickup Details</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Pickup Date</label>
                        <DatePicker
                            selected={bookingData.pickupDate}
                            onChange={(date) => setBookingData(prev => ({ ...prev, pickupDate: date }))}
                            filterDate={(date) => !isPastDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9747FF] focus:border-transparent text-gray-800"
                            placeholderText="Select pickup date"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Pickup Time</label>
                        <input
                            type="time"
                            value={bookingData.pickupTime}
                            onChange={(e) => setBookingData(prev => ({ ...prev, pickupTime: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9747FF] focus:border-transparent text-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Pickup Location</label>
                        <select
                            value={bookingData.pickupLocation}
                            onChange={(e) => setBookingData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9747FF] focus:border-transparent text-gray-800"
                        >
                            <option value="">Select pickup location</option>
                            {LOCATIONS.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dropoff Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#9747FF]">Drop-off Details</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Drop-off Date</label>
                        <DatePicker
                            selected={bookingData.dropoffDate}
                            onChange={(date) => setBookingData(prev => ({ ...prev, dropoffDate: date }))}
                            filterDate={(date) => !isPastDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9747FF] focus:border-transparent text-gray-800"
                            placeholderText="Select drop-off date"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Drop-off Time</label>
                        <input
                            type="time"
                            value={bookingData.dropoffTime}
                            onChange={(e) => setBookingData(prev => ({ ...prev, dropoffTime: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9747FF] focus:border-transparent text-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Drop-off Location</label>
                        <select
                            value={bookingData.dropoffLocation}
                            onChange={(e) => setBookingData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9747FF] focus:border-transparent text-gray-800"
                        >
                            <option value="">Select drop-off location</option>
                            {LOCATIONS.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 2: Car Selection
    const renderStep2 = () => (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9747FF] mb-8 text-center">Choose Your Car</h2>
            
            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9747FF] mx-auto"></div>
                    <p className="mt-4 text-gray-700">Checking availability...</p>
                </div>
            ) : availableCars.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-700">No cars available for the selected dates. Please try different dates.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCars.map((car) => (
                        <div
                            key={car.id}
                            onClick={() => setBookingData(prev => ({ ...prev, selectedCar: car }))}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                                bookingData.selectedCar?.id === car.id
                                    ? 'border-[#9747FF] bg-purple-50'
                                    : 'border-gray-300 hover:border-[#9747FF]'
                            }`}
                        >
                            <img
                                src={car.thumbnail_url}
                                alt={car.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                }}
                            />
                            <h3 className="font-semibold text-lg text-gray-800">{car.title}</h3>
                            <p className="text-gray-700 text-sm mb-2">{car.description}</p>
                            <p className="text-[#9747FF] font-bold text-xl">${car.price}/day</p>
                            <p className="text-sm text-gray-700 capitalize">{car.size} car</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Step 3: Insurance Selection
    const renderStep3 = () => (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9747FF] mb-8 text-center">Choose Insurance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INSURANCE_OPTIONS.map((insurance) => (
                    <div
                        key={insurance.name}
                        onClick={() => setBookingData(prev => ({ ...prev, insuranceType: insurance.name }))}
                        className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                            bookingData.insuranceType === insurance.name
                                ? 'border-[#9747FF] bg-purple-50'
                                : 'border-gray-300 hover:border-[#9747FF]'
                        }`}
                    >
                        <h3 className="font-semibold text-xl text-gray-800 mb-2">{insurance.name}</h3>
                        <p className="text-[#9747FF] font-bold text-2xl mb-3">${insurance.price}</p>
                        <p className="text-gray-700 text-sm">{insurance.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    // Step 4: Confirmation
    const renderStep4 = () => (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9747FF] mb-8 text-center">Confirm Your Booking</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-[#9747FF]">Pickup</h3>
                        <p className="text-gray-700">{bookingData.pickupDate?.toLocaleDateString()}</p>
                        <p className="text-gray-700">{bookingData.pickupTime}</p>
                        <p className="text-gray-700">{bookingData.pickupLocation}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#9747FF]">Drop-off</h3>
                        <p className="text-gray-700">{bookingData.dropoffDate?.toLocaleDateString()}</p>
                        <p className="text-gray-700">{bookingData.dropoffTime}</p>
                        <p className="text-gray-700">{bookingData.dropoffLocation}</p>
                    </div>
                </div>
                
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-[#9747FF]">Selected Car</h3>
                    <p className="text-gray-700">{bookingData.selectedCar?.title}</p>
                    <p className="text-gray-700">${bookingData.selectedCar?.price}/day</p>
                </div>
                
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-[#9747FF]">Insurance</h3>
                    <p className="text-gray-700">{bookingData.insuranceType}</p>
                    <p className="text-gray-700">${INSURANCE_OPTIONS.find(ins => ins.name === bookingData.insuranceType)?.price}</p>
                </div>
                
                <div className="border-t pt-4">
                    <h3 className="font-bold text-xl text-[#9747FF]">Total: ${bookingData.totalPrice}</h3>
                </div>
            </div>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            {/* Progress Indicator */}
            <div className="w-full max-w-4xl mb-8">
                <div className="flex items-center justify-between">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                    currentStep >= step
                                        ? 'bg-[#9747FF] text-white'
                                        : 'bg-gray-300 text-gray-600'
                                }`}
                            >
                                {step}
                            </div>
                            {step < 4 && (
                                <div
                                    className={`w-16 h-1 mx-2 ${
                                        currentStep > step ? 'bg-[#9747FF]' : 'bg-gray-300'
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-700">
                    <span>Dates & Locations</span>
                    <span>Choose Car</span>
                    <span>Insurance</span>
                    <span>Confirm</span>
                </div>
            </div>

            {/* Error and Success Messages */}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-2xl w-full">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-2xl w-full">
                    {successMessage}
                </div>
            )}

            {/* Step Content */}
            <div className="w-full mb-8">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-2xl">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                        currentStep === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                >
                    Back
                </button>
                
                <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                        isLoading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#9747FF] text-white hover:bg-[#7a33cc]'
                    }`}
                >
                    {isLoading ? 'Processing...' : currentStep === 4 ? 'Confirm Booking' : 'Continue'}
                </button>
            </div>
        </main>
    );
}
