"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InsurancePage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const titleh2ClassName = "text-[#9747FF] text-4xl font-semibold -mt-4 text-center";
    const titleh3ClassName = "text-[#9747FF] text-2xl font-semibold mt-4";
    const hiddenCheckboxClass = "peer hidden";
    const checkboxContainerClass =
        "w-5 h-5 border-2 border-red-500 peer-checked:border-[#9747FF] peer-checked:bg-[#9747FF] rounded";

    const highlightText = (text: string, term: string) => {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, "gi");
        return text.split(regex).map((part, idx) =>
            part.toLowerCase() === term.toLowerCase() ? (
                <span key={idx} className="bg-yellow-300">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const handleChoosePlan = () => {
        router.push("/booking");
    };

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

    const filteredPlans = plans.filter((plan) => {
        if (!searchTerm) return true;
        return plan.checkedItems.some((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const renderPlanCard = (plan: typeof plans[number]) => (
        <div
            key={plan.title}
            className="flex-1 p-4 border-2 border-[#9747FF] rounded-md text-center hover:transform hover:translate-y-[-5px] hover:shadow-lg transition duration-300"
        >
            <h2 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2">
                {plan.title}
            </h2>
            <p className="text-xl font-medium mt-2">From {plan.price}€</p>
            <ul className="text-left mt-4 text-lg">
                {plan.items.map((item) => {
                    const isChecked = plan.checkedItems.includes(item);
                    return (
                        <li key={item}>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={isChecked}
                                    className={hiddenCheckboxClass}
                                />
                                <span
                                    className={`${checkboxContainerClass} ${isChecked
                                        ? "checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]"
                                        : "border-[#ffcccc]"
                                        }`}
                                ></span>
                                <span>{highlightText(item, searchTerm)}</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className={titleh2ClassName}>Choose The Insurance That Suits You Best</h2>
            <h3 className={titleh3ClassName}>You Have Something You MUST Have? Look It Up</h3>
            <div className="mt-6 mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search insurance..."
                    className="border-2 border-[#9747FF] rounded-md p-2 w-72 text-black bg-[#f0f0f0] focus:outline-none focus:ring-2 focus:ring-[#9747FF] shadow-lg transition duration-300 ease-in-out transform hover:scale-105 placeholder-black"
                />
            </div>
            <div className="w-10/12 mt-4">
                {filteredPlans.length === 0 ? (
                    <div className="text-center text-white bg-[#222] p-6 rounded-md">
                        <h3 className="text-2xl mb-2">Oops...</h3>
                        <p>
                            Your request is not covered by our insurance, but it will be available soon :(
                        </p>
                    </div>
                ) : (
                    <div className="flex w-full space-x-4">
                        {filteredPlans.map(renderPlanCard)}
                    </div>
                )}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleChoosePlan}
                        className="bg-[#9747FF] hover:bg-[#7a33cc] text-white py-3 px-6 rounded-md text-xl font-semibold"
                    >
                        Choose Your Plan
                    </button>
                </div>
            </div>
        </main>
    );
}