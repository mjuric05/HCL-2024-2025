"use client";

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getProps } from '@/components/carFetcher';
import { Document } from "@contentful/rich-text-types";

type Thumbnail = {
    fields: {
        file: {
            url: string;
        };
    };
};

type Car = {
    fields: {
        title: string;
        description: Document;
        price: number;
        thumbnail?: Thumbnail;
    };
};


async function dataFetch() {
    try {
        const result = await getProps();
        const cars: Car[] = result.props.cars.map((entry) => ({
            fields: {
                title: String(entry.fields.title),
                description: entry.fields.description as Document,
                price: Number(entry.fields.price),
                thumbnail: entry.fields.thumbnail as Thumbnail | undefined,
            },
        }));
        console.log("Cars are fetched:", cars);
        return result.props.cars;
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }

}


export default function BookingPage() {
    const [carType, setCarType] = useState('--Car Type--');
    const [carBrand, setCarBrand] = useState('--Car Brand--');
    const [insurance, setInsurance] = useState('--Insurance--');
    const [pickupLocation, setPickupLocation] = useState('--Pick Up Location--');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [dropoffDate, setDropoffDate] = useState<Date | null>(null);

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


    // //fetch cars from dataFetch function
    const cars = dataFetch().finally(() => {
        console.log("Cars are fetched, finally:", cars);
    }
    );

    console.log("Cars are fetched, again:", cars);

    // fetch cars from dataFetch function when promise is resolved




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

    const progress = calculateProgress();
    const isContinueDisabled = progress < 100;

    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-10">
            <h2 className="text-[#9747FF] text-3xl md:text-4xl font-semibold mt-4 text-center">Book Your Car</h2>
            <div className="w-full max-w-2xl space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-4 mt-10 -mb-5">
                    <div
                        className="h-4 rounded-full transition-all duration-500 bg-[#2A00B3] dark:bg-[#D3BFFF]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-center mt-2">
                    <span className="text-black dark:text-white">{progress.toFixed(0)}%</span>
                </div>
                {/* Car Type Selection */}
                <div>
                    <label htmlFor="car-type" className="block text-lg font-medium text-black dark:text-white">Car Type</label>
                    <select
                        id="car-type"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
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
                    <label htmlFor="car-brand" className="block text-lg font-medium text-black dark:text-white">Car Brand</label>
                    <select
                        id="car-brand"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
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
                    <label htmlFor="insurance" className="block text-lg font-medium text-black dark:text-white">Insurance</label>
                    <select
                        id="insurance"
                        className="mt-1 block w-full p-2 border border-[#9747FF] rounded-md text-black dark:text-black"
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
                    <label htmlFor="pickup-location" className="block text-lg font-medium text-black dark:text-white">Pick Up Location</label>
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
                        className={`py-3 px-6 rounded-md ${isContinueDisabled ? 'bg-green-300' : 'bg-green-500 text-white'}`}
                        disabled={isContinueDisabled}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </main>
    );
}