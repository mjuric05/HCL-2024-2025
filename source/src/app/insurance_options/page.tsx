"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';

export default function InsurancePage() {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const plans = [
        {
            title: "Basic Insurance",
            price: "50",
            items: [
                "Collision Damage Waiver (CDW)",
                "Liability Insurance",
                "Theft Protection",
                "Roadside Assistance",
                "Windshield and Tire Protection",
                "Zero Deductible",
                "Key Loss Protection",
                "Luggage Coverage",
                "Trip Interruption Insurance",
                "Personal Accident Insurance",
            ],
            checkedItems: ["Collision Damage Waiver (CDW)", "Liability Insurance"],
        },
        {
            title: "Medium Insurance",
            price: "70",
            items: [
                "Collision Damage Waiver (CDW)",
                "Theft Protection",
                "Liability Insurance",
                "Roadside Assistance",
                "Windshield and Tire Protection",
                "Zero Deductible",
                "Key Loss Protection",
                "Luggage Coverage",
                "Trip Interruption Insurance",
                "Personal Accident Insurance",
            ],
            checkedItems: [
                "Collision Damage Waiver (CDW)",
                "Theft Protection",
                "Liability Insurance",
                "Roadside Assistance",
                "Windshield and Tire Protection",
            ],
        },
        {
            title: "Full Insurance",
            price: "100",
            items: [
                "Collision Damage Waiver (CDW)",
                "Theft Protection",
                "Personal Accident Insurance",
                "Liability Insurance",
                "Roadside Assistance",
                "Zero Deductible",
                "Windshield and Tire Protection",
                "Key Loss Protection",
                "Luggage Coverage",
                "Trip Interruption Insurance",
            ],
            checkedItems: [
                "Collision Damage Waiver (CDW)",
                "Theft Protection",
                "Personal Accident Insurance",
                "Liability Insurance",
                "Roadside Assistance",
                "Zero Deductible",
                "Windshield and Tire Protection",
                "Key Loss Protection",
                "Luggage Coverage",
                "Trip Interruption Insurance",
            ],
        },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-center text-[#9747FF]">
                Insurance Options
            </h2>
            <div className="flex flex-col items-center w-full max-w-md mt-6 mb-4">
                <div className="w-full md:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search insurance..."
                        className="border-2 border-[#9747FF] rounded-md p-2 w-full text-black bg-[#f0f0f0] placeholder-black focus:outline-none"
                    />
                </div>
                {searchTerm && plans.every(plan => !plan.checkedItems.some(item =>
                    item.toLowerCase().includes(searchTerm.toLowerCase())
                )) && (
                        <p className="text-lg text-[#9747FF] font-medium mt-4 text-center">
                            At The Moment, We do Not Offer That, It Will Be Available Soon :)
                        </p>
                    )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-75%">
                {plans.map((plan) => {
                    const isHighlighted = searchTerm ? plan.checkedItems.some(item =>
                        item.toLowerCase().includes(searchTerm.toLowerCase())
                    ) : false;

                    return (
                        <div
                            key={plan.title}
                            className={`p-4 ${searchTerm ? (isHighlighted ? 'border-4' : 'border-2 opacity-30') : 'border-2'} border-[#9747FF] rounded-md text-center transition-all duration-300`}
                        >
                            <h2 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2">
                                {plan.title}
                            </h2>
                            <p className="text-xl font-medium mt-2">From {plan.price}€</p>
                            <ul className="text-left mt-4 text-lg space-y-2">
                                {plan.items.map((item) => (
                                    <li key={item}>
                                        <label className="flex items-center space-x-2">
                                            <span
                                                className={`w-4 h-4 inline-block rounded-full ${plan.checkedItems.includes(item) ? 'bg-[#009900]' : 'border-2 border-red-500'}`}
                                            ></span>
                                            <span className={`text-black dark:text-white ${plan.checkedItems.includes(item) ? 'font-bold' : ''}`}>
                                                {item}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 mb-4">
                <Link href="/booking">
                    <button className="px-8 py-3 bg-[#9747FF] text-white rounded-md text-lg font-semibold">
                        Choose Your Plan
                    </button>
                </Link>
            </div>
        </main>
    );
}