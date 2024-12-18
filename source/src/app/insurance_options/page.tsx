"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function InsurancePage() {
    const navigationRouter = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const titleh2ClassName = "text-[#9747FF] text-4xl font-semibold -mt-4 text-center";
    const hiddenCheckboxClass = "peer hidden";
    const checkboxContainerClass =
        "w-5 h-5 border-2 border-red-500 peer-checked:border-[#9747FF] peer-checked:bg-[#9747FF] rounded";

    const handleChoosePlan = () => {
        navigationRouter.push('/booking');
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className={titleh2ClassName}>Choose The Insurance That Suits You Best</h2>
            <div className="w-10/12 mt-10">
                <div className="flex w-full space-x-4">
                    {/* Basic Insurance */}
                    <div className="flex-1 p-4 border-2 border-[#9747FF] rounded-md text-center">
                        <h2 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2">Basic Insurance</h2>
                        <p className="text-xl font-medium mt-2">From 50€</p>
                        <ul className="text-left mt-4 text-lg">
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Collision Damage Waiver (CDW)</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Liability Insurance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Theft Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Roadside Assistance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Windshield and Tire Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Zero Deductible</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Key Loss Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Luggage Coverage</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Trip Interruption Insurance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Personal Accident Insurance</span>
                                </label>
                            </li>
                        </ul>
                    </div>

                    {/* Medium Insurance */}
                    <div className="flex-1 p-4 border-2 border-[#9747FF] rounded-md text-center">
                        <h2 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2">Medium Insurance</h2>
                        <p className="text-xl font-medium mt-2">From 70€</p>
                        <ul className="text-left mt-4 text-lg">
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Collision Damage Waiver (CDW)</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Theft Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Liability Insurance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Roadside Assistance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Windshield and Tire Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Zero Deductible</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Key Loss Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Luggage Coverage</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Trip Interruption Insurance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} border-[#ffcccc]`}></span>
                                    <span>Personal Accident Insurance (optional add-on)</span>
                                </label>
                            </li>
                        </ul>
                    </div>

                    {/* Full Insurance */}
                    <div className="flex-1 p-4 border-2 border-[#9747FF] rounded-md text-center">
                        <h2 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2">Full Insurance</h2>
                        <p className="text-xl font-medium mt-2">From 100€</p>
                        <ul className="text-left mt-4 text-lg">
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Collision Damage Waiver (CDW)</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Theft Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Personal Accident Insurance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Liability Insurance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Roadside Assistance</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Zero Deductible</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Windshield and Tire Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Key Loss Protection</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Luggage Coverage</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly className={hiddenCheckboxClass} />
                                    <span className={`${checkboxContainerClass} checked:bg-[#9747FF] checked:border-[#9747FF] border-[#ffcccc]`}></span>
                                    <span>Trip Interruption Insurance</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={handleChoosePlan} className="bg-[#9747FF] hover:bg-[#7a33cc] text-white py-3 px-6 rounded-md text-xl font-semibold">
                        Choose Your Plan
                    </button>
                </div>
            </div>
        </main>
    );
}