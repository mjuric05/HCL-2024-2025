"use client";

import ScrollToTopOnLoad from '../../components/ScrollToTopOnLoad';

export default function BookingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <ScrollToTopOnLoad />
            <h1 className="text-6xl font-extrabold tracking-tight">Booking</h1>
        </main>
    );
}