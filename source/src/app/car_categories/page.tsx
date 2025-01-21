"use client"

import { useState, useEffect, useMemo } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Document } from "@contentful/rich-text-types"

type Thumbnail = {
    fields: {
        file: {
            url: string
            size: string
        }
    }
}

type Car = {
    fields: {
        title: string
        description: Document
        price: number
        thumbnail?: Thumbnail
        size: string
    }
}

export default function CarCategoriesPage() {
    const [cars, setCars] = useState<Car[]>([])
    const [displayedCars, setDisplayedCars] = useState<Car[]>([])
    const [priceSort, setPriceSort] = useState<"original" | "lowHigh" | "highLow">("original")
    const [sizeSort, setSizeSort] = useState<"original" | "smallLarge" | "largeSmall">("original")
    const [searchQuery, setSearchQuery] = useState<string>("")
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
                setCars(fetchedCars)
                setDisplayedCars(fetchedCars) 
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching cars:", error);
                setError("Failed to load cars. Please try again later.")
                setIsLoading(false)
            }
        }
        fetchCars()
    }, [])

    const sizeOrder = { small: 1, medium: 2, large: 3 }

    const sortedCars = useMemo(() => {
        let sorted = [...cars]

        if (sizeSort !== "original") {
            sorted.sort((a, b) =>
                sizeSort === "smallLarge"
                    ? sizeOrder[a.fields.size as keyof typeof sizeOrder] - sizeOrder[b.fields.size as keyof typeof sizeOrder]
                    : sizeOrder[b.fields.size as keyof typeof sizeOrder] - sizeOrder[a.fields.size as keyof typeof sizeOrder],
            )
        }

        if (priceSort !== "original") {
            sorted.sort((a, b) =>
                priceSort === "lowHigh" ? a.fields.price - b.fields.price : b.fields.price - a.fields.price,
            )
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase()
            sorted = sorted.filter((car) => car.fields.title.toLowerCase().includes(lowerCaseQuery))
        }

        return sorted
    }, [cars, priceSort, sizeSort, searchQuery]) 

    useEffect(() => {
        setDisplayedCars(sortedCars)
    }, [sortedCars])

    const handleSizeSortChange = (value: "original" | "smallLarge" | "largeSmall") => {
        setSizeSort(value)
        setPriceSort("original") 
    }

    const handlePriceSortChange = (value: "original" | "lowHigh" | "highLow") => {
        setPriceSort(value)
        setSizeSort("original") 
    }

    const renderCarCard = (car: Car) => (
        <div key={car.fields.title} className="p-4 border-2 border-[#9747FF] rounded-md mb-4">
            <h3 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2 text-center text-black dark:text-white">
                {car.fields.title}
            </h3>
            <div className="flex flex-col items-center mt-4">
                {car.fields.thumbnail?.fields?.file?.url && (
                    <img
                        src={car.fields.thumbnail.fields.file.url || "/placeholder.svg"}
                        alt={car.fields.title}
                        className="w-full h-64 object-cover rounded-md"
                    />
                )}
                <div className="mt-4 text-center">
                    <div className="text-lg text-black dark:text-white">{documentToReactComponents(car.fields.description)}</div>
                    <p className="text-lg text-black dark:text-white mt-2">
                        Size: {car.fields.size.charAt(0).toUpperCase() + car.fields.size.slice(1)}
                    </p>
                    <p className="text-lg font-bold text-black dark:text-white mt-2">Price: ${car.fields.price}</p>
                </div>
            </div>
        </div>
    )

    if (isLoading) {
        return <div className="text-center mt-40">Loading Cars, Hang On Tight...</div>
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-center text-[#9747FF]">Available Cars</h2>
            <div className="w-full max-w-screen-lg mx-auto mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                    <select
                        className="p-2 border border-[#9747FF] rounded-md text-black"
                        value={sizeSort}
                        onChange={(e) => handleSizeSortChange(e.target.value as "original" | "smallLarge" | "largeSmall")}
                    >
                        <option value="original">-- Sort by Size --</option>
                        <option value="smallLarge">Size: Small to Large</option>
                        <option value="largeSmall">Size: Large to Small</option>
                    </select>
                    <select
                        className="p-2 border border-[#9747FF] rounded-md text-black"
                        value={priceSort}
                        onChange={(e) => handlePriceSortChange(e.target.value as "original" | "lowHigh" | "highLow")}
                    >
                        <option value="original">-- Sort by Price --</option>
                        <option value="lowHigh">Price: Low to High</option>
                        <option value="highLow">Price: High to Low</option>
                    </select>
                    <input
                        type="text"
                        className="p-2 border border-[#9747FF] rounded-md text-black"
                        placeholder="Search by Title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {displayedCars.length > 0 ? (
                        displayedCars.map(renderCarCard)
                    ) : (
                        <div className="text-center col-span-full text-lg font-semibold text-red-500">
                            Currently, that car is not available. :(
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
