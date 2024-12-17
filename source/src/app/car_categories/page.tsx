"use client";

import ScrollToTopOnLoad from '../../components/ScrollToTopOnLoad';

export default function CarCategoriesPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <ScrollToTopOnLoad />
            <h1 className="text-6xl font-extrabold tracking-tight">Car Categories</h1>
        </main>
    );
}