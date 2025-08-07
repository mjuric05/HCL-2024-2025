"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmedPage() {
    const router = useRouter();

    useEffect(() => {
        // Auto redirect after 3 seconds
        const timer = setTimeout(() => {
            router.push('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">
                    Email Confirmed!
                </h1>
                <p className="text-green-700 mb-4">
                    Your account has been successfully verified. You can now log in and start using our services.
                </p>
                <p className="text-sm text-green-600 mb-4">
                    Redirecting to home page in 3 seconds...
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    Go to Home Page
                </button>
            </div>
        </main>
    );
}
