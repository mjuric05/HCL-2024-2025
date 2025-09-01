"use client";

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './_components/costum-datepicker.css';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useCarAvailability } from '@/hooks/useCarAvailability';

// Updated interface for Supabase car data
interface Car {
    id: string;
    title: string;
    description?: string;
    price: number;
    size: string;
    thumbnail_url: string;
    available?: boolean;
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
    'Office 1, Put Trščenice 6, Split',
    'Office 2, Ul. Tomića stine 9, Split', 
    'Split Airport, Cesta Dr. Franje Tuđmana 1270'
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
            const errorText = await response.text();
            console.error("API error response:", errorText);
            throw new Error('Failed to fetch cars');
        }
        
        const data: Car[] = await response.json();
        
        return data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
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
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Validation state for step 1 fields
    const [fieldValidation, setFieldValidation] = useState({
        pickupDate: true,
        pickupTime: true,
        pickupLocation: true,
        dropoffDate: true,
        dropoffTime: true,
        dropoffLocation: true
    });

    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // Use the optimized car availability hook
    const { availableCars, isLoading, error: availabilityError } = useCarAvailability(
        cars,
        bookingData.pickupDate?.toISOString().split('T')[0] || '',
        bookingData.dropoffDate?.toISOString().split('T')[0] || '',
        bookingData.pickupTime,
        bookingData.dropoffTime
    );

    // Redirect to login if user is not authenticated (but wait for auth to finish loading)
    useEffect(() => {
        if (!authLoading && user === null) {
            router.push('/sign_in_and_log_in');
        }
    }, [user, authLoading, router]);

    // Load cars on component mount
    useEffect(() => {
        if (user) {
            loadCars();
        }
    }, [user]);

    // Show availability errors
    useEffect(() => {
        if (availabilityError) {
            setErrorMessage(availabilityError);
        }
    }, [availabilityError]);

    const loadCars = async () => {
        try {
            const carsData = await fetchCarsFromSupabase();
            setCars(carsData);
        } catch (error) {
            console.error("Error loading cars:", error);
        }
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
            const hasAllFields = !!(bookingData.pickupDate && bookingData.pickupTime && bookingData.pickupLocation && 
                bookingData.dropoffDate && bookingData.dropoffTime && bookingData.dropoffLocation);
            
            const isDateTimeValid = hasAllFields && isValidDateTime();
            
            const validationErrors = {
                pickupDate: !!bookingData.pickupDate && (hasAllFields ? isDateTimeValid : true),
                pickupTime: !!bookingData.pickupTime && (hasAllFields ? isDateTimeValid : true),
                pickupLocation: !!bookingData.pickupLocation,
                dropoffDate: !!bookingData.dropoffDate && (hasAllFields ? isDateTimeValid : true),
                dropoffTime: !!bookingData.dropoffTime && (hasAllFields ? isDateTimeValid : true),
                dropoffLocation: !!bookingData.dropoffLocation
            };

            setFieldValidation(validationErrors);

            if (!hasAllFields) {
                setErrorMessage('Please fill in all fields');
                return;
            }

            if (!isDateTimeValid) {
                setErrorMessage('Drop-off date and time must be after pickup date and time');
                return;
            }

            // Car availability is automatically checked by the hook
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
            
            // Calculate number of days
            const pickupDate = bookingData.pickupDate!;
            const dropoffDate = bookingData.dropoffDate!;
            const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            const numberOfDays = Math.max(1, daysDifference); // Minimum 1 day
            
            const carPriceTotal = (bookingData.selectedCar?.price || 0) * numberOfDays;
            const insurancePrice = selectedInsurance?.price || 0;
            const total = carPriceTotal + insurancePrice;
            
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

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    car_id: bookingData.selectedCar?.id,
                    car_type: bookingData.selectedCar?.size,
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
            setIsSubmitting(false);
        }
    };

    // Helper function to validate date/time when fields change
    const validateDateTimeFields = () => {
        const hasAllDateTimeFields = !!(bookingData.pickupDate && bookingData.pickupTime && 
            bookingData.dropoffDate && bookingData.dropoffTime);
        
        if (hasAllDateTimeFields) {
            const isValid = isValidDateTime();
            setFieldValidation(prev => ({
                ...prev,
                pickupDate: isValid,
                pickupTime: isValid,
                dropoffDate: isValid,
                dropoffTime: isValid
            }));
        }
    };

    const renderTimePicker = (
        value: string,
        onChange: (time: string) => void,
        label: string,
        isValid: boolean = true
    ) => {
        const borderClass = isValid ? 'border-gray-300 dark:border-gray-600' : 'border-red-500';
        const focusClass = isValid ? 'focus:ring-[#9747FF] focus:border-transparent' : 'focus:ring-red-500 focus:border-red-500';
        const validClass = isValid && value ? 'border-green-500' : borderClass;
        
        return (
            <div className="flex gap-1 items-center">
                <select
                    value={value.split(':')[0] || ''}
                    onChange={(e) => {
                        const hour = e.target.value.padStart(2, '0');
                        const minute = value.split(':')[1] || '00';
                        onChange(`${hour}:${minute}`);
                    }}
                    className={`w-16 p-2.5 border ${validClass} rounded-lg focus:ring-2 ${focusClass} text-gray-800 dark:text-white dark:bg-gray-700 text-sm`}
                >
                    <option value="">HH</option>
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
                <span className="text-gray-700 dark:text-gray-300 font-bold">:</span>
                <select
                    value={value.split(':')[1] || ''}
                    onChange={(e) => {
                        const hour = value.split(':')[0] || '00';
                        const minute = e.target.value;
                        onChange(`${hour}:${minute}`);
                    }}
                    className={`w-16 p-2.5 border ${validClass} rounded-lg focus:ring-2 ${focusClass} text-gray-800 dark:text-white dark:bg-gray-700 text-sm`}
                >
                    <option value="">MM</option>
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
            </div>
        );
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
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Date & Time</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative">
                                <DatePicker
                                    selected={bookingData.pickupDate}
                                    onChange={(date) => {
                                        setBookingData(prev => ({ ...prev, pickupDate: date }));
                                        setFieldValidation(prev => ({ ...prev, pickupDate: true }));
                                        // Validate date/time combination after state updates
                                        setTimeout(() => validateDateTimeFields(), 0);
                                    }}
                                    filterDate={(date) => !isPastDate(date)}
                                    dateFormat="dd.MM.yyyy"
                                    className={`w-32 p-2.5 border ${
                                        !fieldValidation.pickupDate 
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : bookingData.pickupDate
                                                ? 'border-green-500 focus:ring-[#9747FF] focus:border-transparent'
                                                : 'border-gray-300 dark:border-gray-600 focus:ring-[#9747FF] focus:border-transparent'
                                    } rounded-lg focus:ring-2 text-gray-800 dark:text-white dark:bg-gray-700 text-sm`}
                                    placeholderText=""
                                />
                                {!bookingData.pickupDate && (
                                    <div className="absolute inset-0 flex items-center px-2.5 pointer-events-none text-gray-800 dark:text-gray-300 text-sm">
                                        Select date
                                    </div>
                                )}
                            </div>
                            {renderTimePicker(
                                bookingData.pickupTime,
                                (time) => {
                                    setBookingData(prev => ({ ...prev, pickupTime: time }));
                                    setFieldValidation(prev => ({ ...prev, pickupTime: true }));
                                    // Validate date/time combination after state updates
                                    setTimeout(() => validateDateTimeFields(), 0);
                                },
                                'Pickup Time',
                                fieldValidation.pickupTime
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Pickup Location</label>
                        <select
                            value={bookingData.pickupLocation}
                            onChange={(e) => {
                                setBookingData(prev => ({ ...prev, pickupLocation: e.target.value }));
                                setFieldValidation(prev => ({ ...prev, pickupLocation: true }));
                            }}
                            className={`w-full p-3 border ${
                                !fieldValidation.pickupLocation
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : bookingData.pickupLocation
                                        ? 'border-green-500 focus:ring-[#9747FF] focus:border-transparent'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-[#9747FF] focus:border-transparent'
                            } rounded-lg focus:ring-2 text-gray-800 dark:text-white dark:bg-gray-700`}
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
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Date & Time</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative">
                                <DatePicker
                                    selected={bookingData.dropoffDate}
                                    onChange={(date) => {
                                        setBookingData(prev => ({ ...prev, dropoffDate: date }));
                                        setFieldValidation(prev => ({ ...prev, dropoffDate: true }));
                                        // Validate date/time combination after state updates
                                        setTimeout(() => validateDateTimeFields(), 0);
                                    }}
                                    filterDate={(date) => !isPastDate(date)}
                                    dateFormat="dd.MM.yyyy"
                                    className={`w-32 p-2.5 border ${
                                        !fieldValidation.dropoffDate 
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : bookingData.dropoffDate
                                                ? 'border-green-500 focus:ring-[#9747FF] focus:border-transparent'
                                                : 'border-gray-300 dark:border-gray-600 focus:ring-[#9747FF] focus:border-transparent'
                                    } rounded-lg focus:ring-2 text-gray-800 dark:text-white dark:bg-gray-700 text-sm`}
                                    placeholderText=""
                                />
                                {!bookingData.dropoffDate && (
                                    <div className="absolute inset-0 flex items-center px-2.5 pointer-events-none text-gray-800 dark:text-gray-300 text-sm">
                                        Select date
                                    </div>
                                )}
                            </div>
                            {renderTimePicker(
                                bookingData.dropoffTime,
                                (time) => {
                                    setBookingData(prev => ({ ...prev, dropoffTime: time }));
                                    setFieldValidation(prev => ({ ...prev, dropoffTime: true }));
                                    // Validate date/time combination after state updates
                                    setTimeout(() => validateDateTimeFields(), 0);
                                },
                                'Drop-off Time',
                                fieldValidation.dropoffTime
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9747FF] mb-2">Drop-off Location</label>
                        <select
                            value={bookingData.dropoffLocation}
                            onChange={(e) => {
                                setBookingData(prev => ({ ...prev, dropoffLocation: e.target.value }));
                                setFieldValidation(prev => ({ ...prev, dropoffLocation: true }));
                            }}
                            className={`w-full p-3 border ${
                                !fieldValidation.dropoffLocation
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : bookingData.dropoffLocation
                                        ? 'border-green-500 focus:ring-[#9747FF] focus:border-transparent'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-[#9747FF] focus:border-transparent'
                            } rounded-lg focus:ring-2 text-gray-800 dark:text-white dark:bg-gray-700`}
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
    const renderStep2 = () => {
        // Use availableCars if they've been checked, otherwise show all cars
        const carsToShow = availableCars.length > 0 || isLoading ? availableCars : cars;
        
        return (
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-[#9747FF] mb-8 text-center">Choose Your Car</h2>
                
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9747FF] mx-auto"></div>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">Checking availability...</p>
                    </div>
                ) : carsToShow.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-700 dark:text-gray-300">No cars available for the selected dates. Please try different dates.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {carsToShow.map((car) => (
                            <div
                                key={car.id}
                                onClick={() => setBookingData(prev => ({ ...prev, selectedCar: car }))}
                                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                                    bookingData.selectedCar?.id === car.id
                                        ? 'border-[#9747FF] bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-[#9747FF]'
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
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{car.title}</h3>
                                {car.description && (
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{car.description}</p>
                                )}
                                <p className="text-[#9747FF] font-bold text-xl">${car.price}/day</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">{car.size} car</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

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
                                ? 'border-[#9747FF] bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-[#9747FF]'
                        }`}
                    >
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">{insurance.name}</h3>
                        <p className="text-[#9747FF] font-bold text-2xl mb-3">${insurance.price}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{insurance.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    // Step 4: Confirmation
    const renderStep4 = () => (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9747FF] mb-8 text-center">Confirm Your Booking</h2>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-[#9747FF]">Pickup</h3>
                        <p className="text-gray-700 dark:text-gray-300">{bookingData.pickupDate?.toLocaleDateString()}</p>
                        <p className="text-gray-700 dark:text-gray-300">{bookingData.pickupTime}</p>
                        <p className="text-gray-700 dark:text-gray-300">{bookingData.pickupLocation}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#9747FF]">Drop-off</h3>
                        <p className="text-gray-700 dark:text-gray-300">{bookingData.dropoffDate?.toLocaleDateString()}</p>
                        <p className="text-gray-700 dark:text-gray-300">{bookingData.dropoffTime}</p>
                        <p className="text-gray-700 dark:text-gray-300">{bookingData.dropoffLocation}</p>
                    </div>
                </div>
                
                <div className="border-t dark:border-gray-600 pt-4">
                    <h3 className="font-semibold text-[#9747FF]">Selected Car</h3>
                    <p className="text-gray-700 dark:text-gray-300">{bookingData.selectedCar?.title}</p>
                    {(() => {
                        const pickupDate = bookingData.pickupDate!;
                        const dropoffDate = bookingData.dropoffDate!;
                        const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
                        const numberOfDays = Math.max(1, Math.ceil(timeDifference / (1000 * 3600 * 24)));
                        const carPriceTotal = (bookingData.selectedCar?.price || 0) * numberOfDays;
                        return (
                            <p className="text-gray-700 dark:text-gray-300">
                                ${bookingData.selectedCar?.price}/day × {numberOfDays} day{numberOfDays > 1 ? 's' : ''} = ${carPriceTotal}
                            </p>
                        );
                    })()}
                </div>
                
                <div className="border-t dark:border-gray-600 pt-4">
                    <h3 className="font-semibold text-[#9747FF]">Insurance</h3>
                    <p className="text-gray-700 dark:text-gray-300">{bookingData.insuranceType}</p>
                    <p className="text-gray-700 dark:text-gray-300">${INSURANCE_OPTIONS.find(ins => ins.name === bookingData.insuranceType)?.price}</p>
                </div>
                
                <div className="border-t dark:border-gray-600 pt-4">
                    <h3 className="font-bold text-xl text-[#9747FF]">Total: ${bookingData.totalPrice}</h3>
                </div>
            </div>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            {/* Show loading while checking authentication */}
            {authLoading || user === null ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9747FF] mx-auto"></div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">Checking authentication...</p>
                </div>
            ) : (
                <>
                    {/* Progress Indicator */}
                    <div className="w-full max-w-4xl mb-8">
                        {/* Desktop Progress Indicator - Hidden on mobile */}
                        <div className="hidden md:block">
                            <div className="flex justify-between">
                                {[
                                    { step: 1, label: 'Dates & Locations' },
                                    { step: 2, label: 'Choose Car' },
                                    { step: 3, label: 'Insurance' },
                                    { step: 4, label: 'Confirm' }
                                ].map(({ step, label }) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-3 ${
                                                currentStep >= step
                                                    ? 'bg-[#9747FF] text-white'
                                                    : 'bg-gray-300 text-gray-600'
                                            }`}
                                        >
                                            {step}
                                        </div>
                                        <span className="text-lg font-bold text-[#9747FF] text-center leading-tight">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Progress Bar - Hidden on desktop */}
                        <div className="md:hidden">
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div 
                                        className="bg-[#9747FF] h-3 rounded-full transition-all duration-300 ease-in-out"
                                        style={{ width: `${(currentStep / 4) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
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
                            disabled={isLoading || isSubmitting}
                            className={`px-6 py-3 rounded-lg font-semibold ${
                                isLoading || isSubmitting
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#9747FF] text-white hover:bg-[#7a33cc]'
                            }`}
                        >
                            {isSubmitting ? 'Confirming...' : isLoading ? 'Checking availability...' : currentStep === 4 ? 'Confirm Booking' : 'Continue'}
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}
