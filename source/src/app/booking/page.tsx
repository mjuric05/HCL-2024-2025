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

export default function BookingPage() {
    const [carType, setCarType] = useState('--Car Type--');
    const [carBrand, setCarBrand] = useState('--Choose Car Type First--');
    const [insurance, setInsurance] = useState('--Insurance--');
    const [pickupLocation, setPickupLocation] = useState('--Pick Up Location--');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
    const [cars, setCars] = useState<Car[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
        setCarType('--Car Type--');
        setCarBrand('--Choose Car Type First--');
        setInsurance('--Insurance--');
        setPickupLocation('--Pick Up Location--');
        setPickupTime('');
        setDropoffTime('');
        setPickupDate(null);
        setDropoffDate(null);
        setCars([]);
    }, []);

    const getAvailableCars = async () => {
        try {
            const carsData = await fetchCarsFromSupabase();
            setCars(carsData);
            console.log("Cars fetched:", carsData);
        } catch (error) {
            console.log("Error fetching cars:", error);
        }
    };

    useEffect(() => {
        getAvailableCars();
    }, []);

    const calculateProgress = () => {
        let progress = 0;
        if (carType !== '--Car Type--') progress += 1;
        if (carBrand !== '--Choose Car Type First--') progress += 1;
        if (insurance !== '--Insurance--') progress += 1;
        if (pickupLocation !== '--Pick Up Location--') progress += 1;
        if (pickupTime) progress += 1;
        if (dropoffTime) progress += 1;
        if (pickupDate) progress += 1;
        if (dropoffDate) progress += 1;

        if (pickupDate && dropoffDate && pickupTime && dropoffTime) {
            const pickupDateTime = new Date(`${pickupDate.toDateString()} ${pickupTime}`);
            const dropoffDateTime = new Date(`${dropoffDate.toDateString()} ${dropoffTime}`);
            if (pickupDateTime >= dropoffDateTime) {
                progress -= 1;
            }
        }

        return (progress / 8) * 100;
    };

    const customDayClassName = (date: Date) => {
        const selectedDate = pickupDate || dropoffDate;
        return date.getTime() === selectedDate?.getTime() ? 'custom-selected' : '';
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const handleContinue = async () => {
        if (!user) {
            router.push('/sign_in_and_log_in');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Calculate total price
            const selectedCar = carBrands.find(car => `${car.brand} - $${car.price}` === carBrand);
            const carPrice = selectedCar ? selectedCar.price : 0;
            const insurancePrice = insurance === 'Basic - $50' ? 50 : 
                                 insurance === 'Medium - $70' ? 70 : 
                                 insurance === 'Full - $100' ? 100 : 0;
            const totalPrice = carPrice + insurancePrice;

            const bookingData = {
                car_type: carType,
                car_brand: carBrand,
                insurance_type: insurance,
                pickup_location: pickupLocation,
                pickup_date: pickupDate?.toISOString().split('T')[0],
                pickup_time: pickupTime,
                dropoff_date: dropoffDate?.toISOString().split('T')[0],
                dropoff_time: dropoffTime,
                total_price: totalPrice
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                setSuccessMessage('Booking created successfully! Redirecting to your profile...');
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to create booking');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            setErrorMessage('Failed to create booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = calculateProgress();
    const isContinueDisabled = progress < 100;

    const filteredCars = cars.filter((c) => c.size && c.size.toLowerCase() === carType.toLowerCase());

    const carBrands = Array.from(
        new Set(
            filteredCars.map((car) => ({
                brand: car.title,
                price: car.price
            }))
        )
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            <h2 className="text-[#9747FF] text-3xl md:text-4xl font-semibold mt-4 text-center">Book Your Car</h2>
            
            {/* Success/Error Messages */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-2xl w-full mt-4">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-2xl w-full mt-4">
                    {errorMessage}
                </div>
            )}

            <div className="w-full max-w-2xl space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-4 mt-10 -mb-5">
                    <div
                        className="h-4 rounded-full transition-all duration-500 bg-[#9747FF] dark:bg-[#9747FF]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-center mt-2">
                    <span className="text-black dark:text-white">{progress.toFixed(0)}%</span>
                </div>
                {/* Car Type Selection */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label htmlFor="car-type" className="block text-lg font-medium text-black dark:text-white">
                            Car Type
                        </label>
                    </div>
                    <div className="flex justify-between items-center">
                        <select
                            id="car-type"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            value={carType}
                            onChange={(e) => {
                                setCarType(e.target.value);
                                setCarBrand("--Choose Car Type First--");
                            }}
                        >
                            <option>--Car Type--</option>
                            {["small", "medium", "large"].map((size) => (
                                <option key={size}>{size.charAt(0).toUpperCase() + size.slice(1)}</option>
                            ))}
                        </select>
                        <span className="ml-2">
                            {carType === "--Car Type--" ? "❌" : "✔️"}
                        </span>
                    </div>
                </div>

                {/* Car Brand Selection */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label htmlFor="car-brand" className="block text-lg font-medium text-black dark:text-white">
                            Car Brand
                        </label>
                    </div>
                    {/* Update select component */}
                    <div className="flex justify-between items-center">
                        <select
                            id="car-brand"
                            className={`mt-1 block w-full p-2 border border-[#A9A9A9] rounded-md text-black dark:text-black ${carType === "--Car Type--" ? 'bg-[#A9A9A9]' : ''}`}
                            value={carBrand}
                            onChange={(e) => setCarBrand(e.target.value)}
                            disabled={carType === "--Car Type--"}
                        >
                            <option>--Choose Car Type First--</option>
                            {carBrands.map((car) => (
                                <option key={car.brand} value={car.brand}>
                                    {car.brand} - ${car.price}
                                </option>
                            ))}
                        </select>
                        <span className="ml-2">
                            {carType === "--Car Type--" || carBrand === "--Choose Car Type First--" ? "❌" : "✔️"}
                        </span>
                    </div>
                </div>

                {/* Insurance Selection */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <label htmlFor="insurance" className="block text-lg font-medium text-black dark:text-white">
                            Insurance
                        </label>
                    </div>
                    <div className="flex justify-between items-center">
                        <select
                            id="insurance"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            value={insurance}
                            onChange={(e) => setInsurance(e.target.value)}
                        >
                            <option>--Insurance--</option>
                            <option>Basic - $50</option>
                            <option>Medium - $70</option>
                            <option>Full - $100</option>
                        </select>
                        <span className="ml-2">{insurance !== "--Insurance--" ? "✔️" : "❌"}</span>
                    </div>
                </div>

                {/* Pick Up Location Selection */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <label htmlFor="pickup-location" className="block text-lg font-medium text-black dark:text-white">
                            Pick Up Location
                        </label>
                    </div>
                    <div className="flex justify-between items-center">
                        <select
                            id="pickup-location"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                        >
                            <option>--Pick Up Location--</option>
                            <option>A: Put Trščenice 6, Split</option>
                            <option>B: Ul. Tomića stine 9, Split</option>
                            <option>C: Split Airport, Cesta Dr. Franje Tuđmana 1270</option>
                        </select>
                        <span className="ml-2">{pickupLocation !== "--Pick Up Location--" ? "✔️" : "❌"}</span>
                    </div>
                </div>

                {/* Time and Date Inputs */}
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                        <label htmlFor="pickup-time" className="block text-lg font-medium text-black dark:text-white">Pick Up Time</label>
                        <input
                            type="time"
                            id="pickup-time"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                        />
                        <label htmlFor="pickup-date" className="block text-lg font-medium text-black dark:text-white mt-4">Pick Up Date</label>
                        <DatePicker
                            selected={pickupDate}
                            onChange={(date) => setPickupDate(date)}
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            dateFormat="yyyy/MM/dd"
                            inline
                            dayClassName={customDayClassName}
                            renderDayContents={(day, date) => (
                                <div
                                    style={{
                                        color: isPastDate(date) ? '#d3d3d3' : 'inherit',
                                    }}
                                >
                                    {day}
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="dropoff-time" className="block text-lg font-medium text-black dark:text-white">Drop Off Time</label>
                        <input
                            type="time"
                            id="dropoff-time"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            value={dropoffTime}
                            onChange={(e) => setDropoffTime(e.target.value)}
                        />
                        <label htmlFor="dropoff-date" className="block text-lg font-medium text-black dark:text-white mt-4">Drop Off Date</label>
                        <DatePicker
                            selected={dropoffDate}
                            onChange={(date) => setDropoffDate(date)}
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
                            dateFormat="yyyy/MM/dd"
                            inline
                            dayClassName={customDayClassName}
                            renderDayContents={(day, date) => (
                                <div
                                    style={{
                                        color: isPastDate(date) ? '#d3d3d3' : 'inherit',
                                    }}
                                >
                                    {day}
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4 space-x-4">
                    <button
                        className="bg-red-500 text-white py-3 px-6 rounded-md"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className={`py-3 px-6 rounded-md ${isContinueDisabled || isSubmitting ? 'bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}
                        disabled={isContinueDisabled || isSubmitting}
                        onClick={handleContinue}
                    >
                        {isSubmitting ? 'Creating Booking...' : 'Continue'}
                    </button>
                </div>
            </div>
        </main >
    );
}