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

function processPage(page: Page, index: number, pathname: string, closeMenu: () => void, user: any, handleLogout: () => void, isMobile: boolean = false) {
    // Special handling for Profile when user is logged in
    if (page.title === "Profile" && user) {
        // On mobile, don't show the dropdown - Profile will be handled in the mobile menu
        if (isMobile) {
            return null;
        }
        
        return (
            <li key={index} className="relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9747FF] group-hover:bg-white border-2 border-[#9747FF] transition duration-300 focus:outline-none">
                    {/* User Icon */}
                    <svg 
                        className="w-6 h-6 text-white group-hover:text-[#9747FF] transition duration-300" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {/* Invisible bridge for smooth hover transition */}
                <div className="absolute right-0 top-full w-full h-1 hidden group-hover:block"></div>
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white shadow-lg rounded border z-50 min-w-[150px]">
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t"
                        onClick={closeMenu}
                    >
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-b w-full text-left"
                    >
                        Log out
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
                    ${page.title === "Log in" ? "bg-[#9747FF] text-white hover:bg-[#ae73fa]" : ""}
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
                { title: "Profile", path: "/profile" as `/${string}` },
            ];
        } else {
            return [
                ...basePages,
                { title: "Log in", path: "/sign_in_and_log_in" },
            ];
        }
    };

    // Create mobile-specific pages that includes Profile and Logout as separate items
    const getMobilePages = (): (Page | { title: string; action: "logout" })[] => {
        const basePages: Page[] = [
            { title: "Home", path: "/" },
            { title: "Booking", path: "/booking" },
            { title: "Cars", path: "/car_categories" },
            { title: "Insurance", path: "/insurance_options" },
        ];

        if (user) {
            return [
                ...basePages,
                { title: "Profile", path: "/profile" as `/${string}` },
                { title: "Log out", action: "logout" as const },
            ];
        } else {
            return [
                ...basePages,
                { title: "Log in", path: "/sign_in_and_log_in" },
            ];
        }
    };

    const processMobilePage = (item: Page | { title: string; action: "logout" }, index: number) => {
        // Handle logout action
        if ('action' in item && item.action === 'logout') {
            return (
                <li key={index}>
                    <button
                        onClick={handleLogout}
                        className="block px-3 py-2 rounded transition duration-300 hover:bg-[#f1f1f1] hover:text-[#9747FF] text-red-600"
                    >
                        {item.title}
                    </button>
                </li>
            );
        }

        // Handle regular page
        const page = item as Page;
        return (
            <li key={index}>
                <Link
                    href={page.path}
                    className={`
                        block px-3 py-2 rounded transition duration-300 hover:bg-[#f1f1f1] hover:text-[#9747FF]  
                        ${page.title === "Log in" ? "bg-[#9747FF] text-white hover:bg-[#ae73fa]" : ""}
                        ${page.path === "/" ? (pathname === page.path ? "font-extrabold" : "") : (pathname.startsWith(page.path) ? "font-extrabold" : "")}
                    `}
                    onClick={closeMenu}
                >
                    {page.title}
                </Link>
            </li>
        );
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
                    {getPages().map((page, index) => processPage(page, index, pathname, closeMenu, user, handleLogout, false))}
                </ul>
            </div>
            {isMenuOpen && (
                <div className="md:hidden transition-all duration-300 ease-in-out transform">
                    <ul className="flex flex-col items-center space-y-4 mt-4">
                        {getMobilePages().map((item, index) => processMobilePage(item, index))}
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