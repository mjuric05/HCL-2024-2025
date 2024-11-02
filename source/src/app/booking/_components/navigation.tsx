"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
    title: string;
    path: `/${string}`;
};

const pages: Page[] = [
    {
        title: "Car Booking",
        path: "/booking/car_booking",
    },
    {
        title: "Insurance Policy",
        path: "/booking/insurance_policy",
    },
    {
        title: "Fuel Policy",
        path: "/booking/fuel_policy",
    },
];
function processPage(page: Page, index: number, pathname: string) {
    return (
        <li key={index}>
            <Link
                href={page.path}
                className={
                    pathname === page.path ? "font-extrabold text-slate-600" : ""
                }
            >
                {page.title}
            </Link>
        </li>
    );
}
export function Navigation() {
    const pathname = usePathname();
    return (
        <ul className="flex justify-center space-x-4 mt-8">
            {pages.map((page, index) => processPage(page, index, pathname))}
        </ul>
    );
}