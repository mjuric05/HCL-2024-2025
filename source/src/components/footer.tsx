import React from 'react';

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
            <div className="flex flex-col items-center w-full px-4 pt-4">
                {/* Title */}
                <div className='w-full flex justify-start pl-10'>
                    <h1 className="text-4xl font-bold text-left">
                        <span className="text-[#FFFFFF]">Easy</span>
                        <span className="text-[#9747FF]">Rent</span>
                    </h1>
                </div>
                {/* Centering copyright */}
                <div className="w-full flex justify-center items-end -mt-8">
                    <p className="text-lg text-center">
                        © 2024 Brstilo F., Jurić-Pešić M.
                    </p>
                </div>
            </div>
            {/* Empty div that just alligns footer with navigation */}
            <div className='h-7'>
            </div>
        </div>

    );
}