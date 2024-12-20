"use client";

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingPage() {
    const [carType, setCarType] = useState('--Car Type--');
    const [carBrand, setCarBrand] = useState('--Car Brand--');
    const [insurance, setInsurance] = useState('--Insurance--');
    const [pickupLocation, setPickupLocation] = useState('--Pick Up Location--');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
    const titleh2ClassName = "text-[#9747FF] text-4xl font-semibold";

    useEffect(() => {
        window.scrollTo(0, 0);
        setCarType('--Car Type--');
        setCarBrand('--Car Brand--');
        setInsurance('--Insurance--');
        setPickupLocation('--Pick Up Location--');
        setPickupTime('');
        setDropoffTime('');
        setPickupDate(null);
        setDropoffDate(null);
    }, []);

    // Used to calculate the progress of the form
    // Stupid implementation, but it works so yeah
    const calculateProgress = () => {
        let progress = 0;
        if (carType !== '--Car Type--') progress += 1;
        if (carBrand !== '--Car Brand--') progress += 1;
        if (insurance !== '--Insurance--') progress += 1;
        if (pickupLocation !== '--Pick Up Location--') progress += 1;
        if (pickupTime) progress += 1;
        if (dropoffTime) progress += 1;
        if (pickupDate) progress += 1;
        if (dropoffDate) progress += 1;

        // Check if the dates and times are in order
        if (pickupDate && dropoffDate && pickupTime && dropoffTime) {
            const pickupDateTime = new Date(`${pickupDate.toDateString()} ${pickupTime}`);
            const dropoffDateTime = new Date(`${dropoffDate.toDateString()} ${dropoffTime}`);
            if (pickupDateTime >= dropoffDateTime) {
                progress -= 1; // Subtract progress if dates and times are not in order
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

    const progress = calculateProgress();
    const isContinueDisabled = progress < 100;

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className="text-[#9747FF] text-4xl font-semibold -mt-4 text-center">Book Your Car</h2>
            <div className="w-full max-w-2xl space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mt-10 -mb-5">
                    <div
                        className="bg-[#9747FF] h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-white text-center mt-2">
                    {progress.toFixed(0)}%
                </div>
                {/* Car Type Selection */}
                <div>
                    <label htmlFor="car-type" className="block text-lg font-medium text-white">Car Type</label>
                    <select
                        id="car-type"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                    >
                        <option>--Car Type--</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                        <option>Vans</option>
                    </select>
                </div>

                {/* Car Brand Selection */}
                <div>
                    <label htmlFor="car-brand" className="block text-lg font-medium text-white">Car Brand</label>
                    <select
                        id="car-brand"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
                        value={carBrand}
                        onChange={(e) => setCarBrand(e.target.value)}
                    >
                        <option>--Car Brand--</option>
                        <option>Audi</option>
                        <option>Mercedes</option>
                        <option>VW</option>
                    </select>
                </div>

                {/* Insurance Selection */}
                <div>
                    <label htmlFor="insurance" className="block text-lg font-medium text-white">Insurance</label>
                    <select
                        id="insurance"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                    >
                        <option>--Insurance--</option>
                        <option>Basic</option>
                        <option>Medium</option>
                        <option>Full</option>
                    </select>
                </div>

                {/* Pick Up Location Selection */}
                <div>
                    <label htmlFor="pickup-location" className="block text-lg font-medium text-white">Pick Up Location</label>
                    <select
                        id="pickup-location"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                    >
                        <option>--Pick Up Location--</option>
                        <option>A: Put Trščenice 6, Split</option>
                        <option>B: Ul. Tomića stine 9, Split</option>
                        <option>C: Split Airport, Cesta Dr. Franje Tuđmana 1270</option>
                    </select>
                </div>

                {/* Time and Date Inputs */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="pickup-time" className="block text-lg font-medium text-white">Pick Up Time</label>
                        <input
                            type="time"
                            id="pickup-time"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                        />
                        <label htmlFor="pickup-date" className="block text-lg font-medium text-white mt-4">Pick Up Date</label>
                        <DatePicker
                            selected={pickupDate}
                            onChange={(date) => setPickupDate(date)}
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
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
                        <label htmlFor="dropoff-time" className="block text-lg font-medium text-white">Drop Off Time</label>
                        <input
                            type="time"
                            id="dropoff-time"
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
                            value={dropoffTime}
                            onChange={(e) => setDropoffTime(e.target.value)}
                        />
                        <label htmlFor="dropoff-date" className="block text-lg font-medium text-white mt-4">Drop Off Date</label>
                        <DatePicker
                            selected={dropoffDate}
                            onChange={(date) => setDropoffDate(date)}
                            className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black"
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
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className={`py-2 px-4 rounded-md ${isContinueDisabled ? 'bg-green-300' : 'bg-green-500 text-white'}`}
                        disabled={isContinueDisabled}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </main>
    );
}