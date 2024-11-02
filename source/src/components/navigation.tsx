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
    );
}

export function Navigation() {
    const pathname = usePathname();
    return (
        <ul className="flex justify-end space-x-4 mt-8">
            {pages.map((page, index) => processPage(page, index, pathname))}
        </ul>
    );
}