"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Page = {
    title: string;
    path: `/${string}`;
};

const pages: Page[] = [
    { title: "Home", path: "/" },
    {
        title: "Booking",
        path: "/booking",
    },
    {
        title: "Cars",
        path: "/car_categories",
    },
    {
        title: "Insurance",
        path: "/insurance_options",
    },
    {
        title: "Sign In / Log In",
        path: "/sign_in_and_log_in",
    },
];

function processPage(page: Page, index: number, pathname: string, closeMenu: () => void) {
    return (
        <li key={index}>
            <Link
                href={page.path}
                className={`
                    block px-3 py-2 rounded transition duration-300 hover:bg-[#f1f1f1] hover:text-[#9747FF]  
                    ${page.title === "Sign In / Log In" ? "bg-[#9747FF] text-white hover:bg-[#ae73fa]" : ""}
                    ${page.path === "/" ? (pathname === page.path ? "font-extrabold" : "") : (pathname.startsWith(page.path) ? "font-extrabold" : "")}
                `}
                onClick={closeMenu}
            >
                {page.title}
            </Link>
        </li>
    );
}

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div>
            <div className="flex justify-between items-center w-full px-4 pt-4">
                <Link href="/">
                    <h1 className="text-4xl font-bold pl-4 md:pl-8 cursor-pointer">
                        <span className="text-theme-easy">Easy</span>
                        <span className="text-[#9747FF]">Rent</span>
                    </h1>
                </Link>
                <div className="md:hidden pr-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none mt-4"
                    >
                        <div className="relative w-6 h-6">
                            <span
                                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'
                                    }`}
                            ></span>
                            <span
                                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'top-3'
                                    }`}
                            ></span>
                            <span
                                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4.5'
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>
                <ul className="hidden md:flex justify-end space-x-4 pr-8">
                    {pages.map((page, index) => processPage(page, index, pathname, closeMenu))}
                </ul>
            </div>
            {isMenuOpen && (
                <div className="md:hidden transition-all duration-300 ease-in-out transform">
                    <ul className="flex flex-col items-center space-y-4 mt-4">
                        {pages.map((page, index) => processPage(page, index, pathname, closeMenu))}
                    </ul>
                </div>
            )}
            <div className="w-full mt-5">
                <div
                    style={{
                        background: 'linear-gradient(to right, #2A00B3, #9747FF)',  // Gradient from left to right
                        height: '4px',  // The thickness of the line
                        width: '100%',   // Full width
                    }}
                />
            </div>
        </div>
    );
}