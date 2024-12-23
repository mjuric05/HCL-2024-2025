"use client";

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

    const titleh2ClassName = "text-[#9747FF] text-3xl md:text-4xl font-semibold mt-4 text-center";
    const titleh3ClassName = "text-[#9747FF] text-2xl font-semibold mt-4 text-center";
    const inputClassName = "mt-2 p-2 border-4 border-[#9747FF] rounded-md w-full text-black placeholder-black";
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

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isCreateAccountDisabled =
        !createAccountFields.name ||
        !createAccountFields.surname ||
        !isValidEmail(createAccountFields.email) ||
        !isValidPassword(createAccountFields.password);

    const isLoginDisabled = !isValidEmail(loginFields.email) || !loginFields.password;

    const EyeClosedIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="black"
            className="w-5 h-5"
        >
            <path d="M10 3C6 3 2.73 5.44 1.3 9.1a1 1 0 0 0 0 .8C2.73 13.56 6 16 10 16s7.27-2.44 8.7-6.1a1 1 0 0 0 0-.8C17.27 5.44 14 3 10 3zm5 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
            <path d="M13.59 13.41 6.59 6.41 5.17 7.82l7 7z" />
        </svg>
    );

    const EyeOpenIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="black"
            className="w-5 h-5"
        >
            <path d="M10 3C6 3 2.73 5.44 1.3 9.1a1 1 0 0 0 0 .8C2.73 13.56 6 16 10 16s7.27-2.44 8.7-6.1a1 1 0 0 0 0-.8C17.27 5.44 14 3 10 3zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-10">
            <h2 className={titleh2ClassName}>Join Our Crew</h2>
            <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mt-8 space-y-8 md:space-y-0 md:space-x-8">
                {/* Create Account */}
                <div className={`w-full md:w-1/2 ${frameClassName}`}>
                    <h3 className={titleh3ClassName}>Create Account</h3>
                    <hr className="border-[#9747FF] my-2" style={{ borderWidth: "2px" }} />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className={inputClassName}
                        onChange={handleCreateAccountChange}
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        className={inputClassName}
                        onChange={handleCreateAccountChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={inputClassName}
                        onChange={handleCreateAccountChange}
                    />
                    <div className="flex items-center mt-2">
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
                            className="ml-2 p-1 bg-white rounded-lg flex items-center justify-center"
                        >
                            {showPasswordCreate ? EyeOpenIcon : EyeClosedIcon}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className={`p-2 w-1/2 rounded-md text-white ${isCreateAccountDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                            disabled={isCreateAccountDisabled}
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                {/* Log In */}
                <div className={`w-full md:w-1/2 ${frameClassName}`}>
                    <h3 className={titleh3ClassName}>Log In</h3>
                    <hr className="border-[#9747FF] my-2" style={{ borderWidth: "2px" }} />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={inputClassName}
                        onChange={handleLoginChange}
                    />
                    <div className="flex items-center mt-2">
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
                            className="ml-2 p-1 bg-white rounded-lg flex items-center justify-center"
                        >
                            {showPasswordLogin ? EyeOpenIcon : EyeClosedIcon}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className={`p-2 w-1/2 rounded-md text-white ${isLoginDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                            disabled={isLoginDisabled}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>

            {/* Rules */}
            <div className={`w-full md:w-3/4 mt-8 ${frameClassName}`}>
                <h3 className={titleh3ClassName}>Rules</h3>
                <hr className="border-[#9747FF] my-2" style={{ borderWidth: "2px" }} />
                <ul className="list-disc list-inside text-black dark:text-white">
                    <li>Email has to be in a valid format: example@gmail.com</li>
                    <li>
                        Your password has to be at least 8 characters long, contain at least 1
                        uppercase letter, 1 lowercase letter, 1 number, and 1 special character
                    </li>
                    <li>
                        By creating your account, you accept our{" "}
                        <a
                            href="https://wary-bay-791.notion.site/Easy-Rent-ToS-162708c272668094ad94f550eff684f0?pvs=4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2A00B3] dark:text-[#9747FF]"
                        >
                            Terms of Service (ToS)
                        </a>
                    </li>
                </ul>
            </div>
        </main>
    );
}