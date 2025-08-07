"use client"

import { useState, useEffect } from "react"

type Car = {
    id: string
    title: string
    description: string
    price: number
    thumbnail_url: string
    size: string
    available: boolean
}

export default function CarCategoriesVansPage() {
    const [cars, setCars] = useState<Car[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await fetch("/api/cars")
                if (!response.ok) {
                    throw new Error("Failed to fetch car data")
                }
                const fetchedCars: Car[] = await response.json()
                // Filter for vans (looking for "Transporter" or "Van" in title, or large vehicles that are vans)
                const vans = fetchedCars.filter(car => 
                    car.title.toLowerCase().includes('transporter') || 
                    car.title.toLowerCase().includes('van') ||
                    (car.size === 'large' && car.title.toLowerCase().includes('t6'))
                )
                setCars(vans)
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching cars:", error);
                setError("Failed to load cars. Please try again later.")
                setIsLoading(false)
            }
        }
        fetchCars()
    }, [])

    if (isLoading) {
        return <div className="text-center mt-40">Loading Vans...</div>
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            <h1 className="text-3xl md:text-4xl font-semibold mt-4 text-center text-[#9747FF]">Vans</h1>
            <div className="w-full max-w-screen-lg mx-auto mt-8">
                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <div key={car.id} className="p-4 border-2 border-[#9747FF] rounded-md">
                                <h3 className="text-xl font-semibold border-b-2 border-[#9747FF] pb-2 text-center text-black dark:text-white">
                                    {car.title}
                                </h3>
                                <div className="flex flex-col items-center mt-4">
                                    {car.thumbnail_url && (
                                        <img
                                            src={car.thumbnail_url}
                                            alt={car.title}
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                    )}
                                    <div className="mt-4 text-center">
                                        <div className="text-sm text-black dark:text-white">{car.description}</div>
                                        <p className="text-lg font-bold text-black dark:text-white mt-2">
                                            ${car.price}/day
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        No vans available at the moment.
                    </div>
                )}
            </div>
        </main>
    );
}