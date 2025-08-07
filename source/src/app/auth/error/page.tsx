"use client";

import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 text-6xl mb-4">✗</div>
                <h1 className="text-2xl font-bold text-red-800 mb-2">
                    Verification Failed
                </h1>
                <p className="text-red-700 mb-4">
                    We couldn&apos;t verify your email address. This might be because:
                </p>
                <ul className="text-red-700 text-sm text-left mb-4 space-y-1">
                    <li>• The verification link has expired</li>
                    <li>• The link has already been used</li>
                    <li>• The link is invalid or corrupted</li>
                </ul>
                <div className="space-y-2">
                    <button
                        onClick={() => router.push('/sign_in_and_log_in')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Go to Home Page
                    </button>
                </div>
            </div>
        </main>
    );
}
