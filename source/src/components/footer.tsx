import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <div className="w-full mt-20 h-100">
            <div
                style={{
                    background: 'linear-gradient(to right, #2A00B3, #9747FF)',
                    height: '4px',
                    width: '100%',
                }}
            />
            {/* Title and Copyright Section */}
            <div className="flex flex-row items-center justify-between w-full px-4 pt-4">
                {/* Title */}
                <div className='w-1/2 flex justify-start pl-4 md:pl-10'>
                    <Link href="/">
                        <h1 className="text-4xl font-bold text-left">
                            <span className="text-theme-easy">Easy</span>
                            <span className="text-[#9747FF]">Rent</span>
                        </h1>
                    </Link>
                </div>
                {/* Centering copyright */}
                <div className="w-1/2 flex justify-end items-end pr-4 md:pr-10">
                    <p className="text-lg text-right">
                        © Brstilo, Jurić-Pešić
                    </p>
                </div>
            </div>
            {/* Transparent div made for padding */}
            <div className='h-7' />
        </div>
    );
}