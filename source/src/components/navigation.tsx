"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

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
        title: "Sign Up / Log In",
        path: "/sign_in_and_log_in",
    },
];

function processPage(page: Page, index: number, pathname: string, closeMenu: () => void, user: any, handleLogout: () => void) {
    // Special handling for user welcome message
    if (page.title.startsWith("Welcome,")) {
        return (
            <li key={index} className="relative group">
                <span className="block px-3 py-2 rounded transition duration-300 text-[#9747FF] font-semibold cursor-pointer">
                    {page.title}
                </span>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white shadow-lg rounded border z-50">
                    <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded w-full text-left"
                    >
                        Logout
                    </button>
                </div>
            </li>
        );
    }

    return (
        <li key={index}>
            <Link
                href={page.path}
                className={`
                    block px-3 py-2 rounded transition duration-300 hover:bg-[#f1f1f1] hover:text-[#9747FF]  
                    ${page.title === "Sign Up / Log In" ? "bg-[#9747FF] text-white hover:bg-[#ae73fa]" : ""}
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
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, signOut, loading } = useAuth();

    const closeMenu = () => setIsMenuOpen(false);

    // Create dynamic pages based on auth status
    const getPages = (): Page[] => {
        const basePages: Page[] = [
            { title: "Home", path: "/" },
            { title: "Booking", path: "/booking" },
            { title: "Cars", path: "/car_categories" },
            { title: "Insurance", path: "/insurance_options" },
        ];

        if (user) {
            return [
                ...basePages,
                { title: `Welcome, ${user.email}`, path: "/profile" as `/${string}` },
            ];
        } else {
            return [
                ...basePages,
                { title: "Sign Up / Log In", path: "/sign_in_and_log_in" },
            ];
        }
    };

    const handleLogout = async () => {
        await signOut();
        closeMenu();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div ref={menuRef} className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/75 dark:bg-black/25">
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
                        className="focus:outline-none mt-4"
                    >
                        <div className="relative w-6 h-6">
                            <span
                                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'} dark:bg-white bg-black`}
                            ></span>
                            <span
                                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'top-3'} dark:bg-white bg-black`}
                            ></span>
                            <span
                                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4.5'} dark:bg-white bg-black`}
                            ></span>
                        </div>
                    </button>
                </div>
                <ul className="hidden md:flex justify-end space-x-4 pr-8">
                    {getPages().map((page, index) => processPage(page, index, pathname, closeMenu, user, handleLogout))}
                </ul>
            </div>
            {isMenuOpen && (
                <div className="md:hidden transition-all duration-300 ease-in-out transform">
                    <ul className="flex flex-col items-center space-y-4 mt-4">
                        {getPages().map((page, index) => processPage(page, index, pathname, closeMenu, user, handleLogout))}
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