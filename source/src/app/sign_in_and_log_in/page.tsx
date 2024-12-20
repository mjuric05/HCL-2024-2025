"use client";

// filepath: /C:/Users/MijoJurić-Pešić/Desktop/HCL-2024-2025/source/src/app/sign_in_and_log_in/page.tsx

import React, { useState } from "react";

export default function SignInAndLogInPage() {
    const [showPasswordCreate, setShowPasswordCreate] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [createAccountFields, setCreateAccountFields] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });
    const [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    });

    const titleh2ClassName = "text-[#9747FF] text-4xl font-semibold -mt-4 text-center";
    const titleh3ClassName = "text-[#9747FF] text-2xl font-semibold mt-4 text-center";
    const inputClassName = "mt-2 p-2 border border-[#9747FF] rounded-md w-full text-black";
    const frameClassName = "border-2 border-[#9747FF] rounded-md p-4";

    const handleCreateAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCreateAccountFields((prevFields) => ({
            ...prevFields,
            [name]: value
        }));
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFields((prevFields) => ({
            ...prevFields,
            [name]: value
        }));
    };
    /*
        interface CreateAccountFields {
            name: string;
            surname: string;
            email: string;
            password: string;
        }
    
        interface LoginFields {
            email: string;
            password: string;
        }
    */
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isCreateAccountDisabled = !createAccountFields.name || !createAccountFields.surname || !isValidEmail(createAccountFields.email) || !isValidPassword(createAccountFields.password);
    const isLoginDisabled = !isValidEmail(loginFields.email) || !loginFields.password;

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className={titleh2ClassName}>Join Our Crew</h2>
            <div className="flex justify-between w-3/4 mt-8 space-x-8">
                <div className={`w-1/2 pr-4 ${frameClassName}`}>
                    <h3 className={titleh3ClassName}>Create Account</h3>
                    <hr className="border-[#9747FF] my-2" style={{ borderWidth: '2px' }} />
                    <input type="text" name="name" placeholder="Name" className={inputClassName} onChange={handleCreateAccountChange} />
                    <input type="text" name="surname" placeholder="Surname" className={inputClassName} onChange={handleCreateAccountChange} />
                    <input type="email" name="email" placeholder="Email" className={inputClassName} onChange={handleCreateAccountChange} />
                    <div className="relative">
                        <input
                            type={showPasswordCreate ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={inputClassName}
                            onChange={handleCreateAccountChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordCreate(!showPasswordCreate)}
                            className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 flex items-center"
                        >
                            {showPasswordCreate ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className={`p-2 w-1/2 rounded-md text-white ${isCreateAccountDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                            disabled={isCreateAccountDisabled}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
                <div className={`w-1/2 pl-4 ${frameClassName}`}>
                    <h3 className={titleh3ClassName}>Log In</h3>
                    <hr className="border-[#9747FF] my-2" style={{ borderWidth: '2px' }} />
                    <input type="email" name="email" placeholder="Email" className={inputClassName} onChange={handleLoginChange} />
                    <div className="relative">
                        <input
                            type={showPasswordLogin ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={inputClassName}
                            onChange={handleLoginChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                            className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 flex items-center"
                        >
                            {showPasswordLogin ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className={`p-2 w-1/2 rounded-md text-white ${isLoginDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                            disabled={isLoginDisabled}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
            <div className={`w-3/4 mt-8 ${frameClassName}`}>
                <h3 className={titleh3ClassName}>Rules</h3>
                <hr className="border-[#9747FF] my-2" style={{ borderWidth: '2px' }} />
                <ul className="list-disc list-inside text-white">
                    <li>Email has to be in a valid format: example@gmail.com</li>
                    <li>Your password has to be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character</li>
                    <li>By creating your account, you accept our <a href="https://wary-bay-791.notion.site/Easy-Rent-ToS-162708c272668094ad94f550eff684f0?pvs=4" target="_blank" rel="noopener noreferrer" className="text-[#9747FF]">Terms of Service (ToS)</a></li>
                </ul>
            </div>
        </main>
    );
}