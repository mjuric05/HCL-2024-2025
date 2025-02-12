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
    const [displayLogin, setDisplayLogin] = useState(true);
    const [validateInputs, setValidateInputs] = useState({
        email: true,
        password: true,
        firstName: true,
        lastName: true
    });

    const titleh3ClassName = "text-[#9747FF] text-2xl font-semibold mt-4 text-center";
    const inputClassName = "mt-2 p-2 border-4 rounded-md w-full text-black placeholder-black";
    const frameClassName = "border-2 border-[#9747FF] rounded-md p-4";
    const borderNormal = "border-[#9747FF]";
    const borderError = "border-red-500"; // check if color is ok

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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
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
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            <div className="flex flex-col md:flex-row justify-center w-full md:w-3/4 max-w-lg mt-8 space-y-8 md:space-y-0 md:space-x-8 mx-auto">
                {displayLogin ? ( // Display Login or Create Account
                    // Log In
                    <div className={`w-full ${frameClassName}`}>
                        <h3 className={titleh3ClassName}>Log In</h3>
                        <hr className="border-[#9747FF] my-2" style={{ borderWidth: "2px" }} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`${inputClassName} ${validateInputs.email ? borderNormal : borderError}`}
                            onChange={(e) => {
                                handleLoginChange(e);
                                setValidateInputs((prev) => ({
                                    ...prev,
                                    email: isValidEmail(e.target.value)
                                }));
                            }}
                        />
                        {!validateInputs.email && (
                            <p className="text-red-500 text-sm">Email address needs to be of a valid format: user@domain.com</p>
                        )}
                        <div className="flex items-center mt-2">
                            <input
                                type={showPasswordLogin ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className={`${inputClassName} ${borderNormal}`}
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
                        <div className="flex justify-center mt-4">
                            <span className="text-black dark:text-white"></span>
                            {"Don't have an account? "}
                            <button
                                type="button"
                                className="text-[#2A00B3] dark:text-[#9747FF] ml-1"
                                onClick={() => setDisplayLogin(false)}
                            >
                                Create account
                            </button>
                        </div>
                    </div>
                ) : (
                    // Create Account
                    <div>
                        <div className={`w-full ${frameClassName}`}>
                            <h3 className={titleh3ClassName}>Create Account</h3>
                            <hr className="border-[#9747FF] my-2" style={{ borderWidth: "2px" }} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className={`${inputClassName} ${validateInputs.firstName ? borderNormal : borderError}`}
                                onChange={(e) => {
                                    handleCreateAccountChange(e);
                                    setValidateInputs((prev) => ({
                                        ...prev,
                                        firstName: e.target.value.trim() !== ""
                                    }));
                                }}
                            />
                            {!validateInputs.firstName && (
                                <p className="text-red-500 text-sm">Name cannot be empty</p>
                            )}
                            <input
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                className={`${inputClassName} ${validateInputs.lastName ? borderNormal : borderError}`}
                                onChange={(e) => {
                                    handleCreateAccountChange(e);
                                    setValidateInputs((prev) => ({
                                        ...prev,
                                        lastName: e.target.value.trim() !== ""
                                    }));
                                }}
                            />
                            {!validateInputs.lastName && (
                                <p className="text-red-500 text-sm">Surname cannot be empty</p>
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={`${inputClassName} ${validateInputs.email ? borderNormal : borderError}`}
                                onChange={(e) => {
                                    handleCreateAccountChange(e);
                                    setValidateInputs((prev) => ({
                                        ...prev,
                                        email: isValidEmail(e.target.value)
                                    }));
                                }}
                            />
                            {!validateInputs.email && (
                                <p className="text-red-500 text-sm">Email address needs to be of a valid format: user@domain.com</p>
                            )}
                            <div className="flex items-center mt-2">
                                <input
                                    type={showPasswordCreate ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className={`${inputClassName} ${validateInputs.password ? borderNormal : borderError}`}
                                    onChange={(e) => {
                                        handleCreateAccountChange(e);
                                        setValidateInputs((prev) => ({
                                            ...prev,
                                            password: isValidPassword(e.target.value)
                                        }));
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordCreate(!showPasswordCreate)}
                                    className="ml-2 p-1 bg-white rounded-lg flex items-center justify-center"
                                >
                                    {showPasswordCreate ? EyeOpenIcon : EyeClosedIcon}
                                </button>
                            </div>
                            {!validateInputs.password && (
                                <p className="text-red-500 text-sm">Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.</p>
                            )}
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
                            <div className="flex justify-center mt-4">
                                <span className="text-black dark:text-white"></span>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="text-[#2A00B3] dark:text-[#9747FF] ml-1"
                                    onClick={() => setDisplayLogin(true)}
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                        <div className={`w-full mt-8 ${frameClassName}`}>
                            By creating your account, you accept our{" "}
                            <a
                                href="https://wary-bay-791.notion.site/Easy-Rent-ToS-162708c272668094ad94f550eff684f0?pvs=4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2A00B3] dark:text-[#9747FF]"
                            >
                                Terms of Service (ToS)
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}