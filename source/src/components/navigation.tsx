"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
        title: "Car Categories",
        path: "/car_categories",
    },
    {
        title: "Insurance Options",
        path: "/insurance_options",
    },
    {
        title: "Vehlice Availability",
        path: "/vehlice_availability",
    },
    {
        title: "Sign In / Log In",
        path: "/sign_in_and_log_in",
    },
];

function processPage(page: Page, index: number, pathname: string) {
    return (
        <div>
            <li key={index}>
                <Link
                    href={page.path}
                    className={
                        page.path === "/"
                            ? pathname === page.path
                                ? "font-extrabold"
                                : ""
                            : pathname.startsWith(page.path)
                                ? "font-extrabold"
                                : ""
                    }
                >
                    {page.title}
                </Link>
            </li>
        </div>
    );
}

export function Navigation() {
    const pathname = usePathname();
    return (
        <div>
            <div className="flex justify-between items-center w-full px-4 pt-4">
                <h1 className="text-6xl font-bold pl-8">
                    <span className="text-[#2A00B3]">Easy</span>
                    <span className="text-[#9747FF]">Rent</span>
                </h1>
                <ul className="flex justify-end space-x-4 pr-8">
                    {pages.map((page, index) => processPage(page, index, pathname))}
                </ul>
            </div>
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