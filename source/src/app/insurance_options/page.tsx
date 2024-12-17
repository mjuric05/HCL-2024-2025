"use client";

import { useEffect } from 'react';

export default function InsurancePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h1 className="text-6xl font-extrabold tracking-tight">Insurance Options</h1>
        </main>
    );
}