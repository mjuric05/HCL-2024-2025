"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function SignInAndLogInPage() {
    const [showPasswordCreate, setShowPasswordCreate] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [createAccountFields, setCreateAccountFields] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    });
    const [displayLogin, setDisplayLogin] = useState(true);
    const [validateInputs, setValidateInputs] = useState({
        email: true,
        password: true,
        confirmPassword: true,
        firstName: true,
        lastName: true,
        resendEmail: true
    });
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [resendEmail, setResendEmail] = useState("");

    const { signIn, signUp, resendConfirmation } = useAuth();
    const router = useRouter();

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
        return password.length >= 8;
    };

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "", color: "" };
        
        let score = 0;
        const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
        };
        
        // Base score for length
        if (checks.length) score += 2;
        // Additional points for longer passwords
        if (password.length >= 10) score += 1;
        if (password.length >= 12) score += 1;
        
        if (checks.lowercase) score += 1;
        if (checks.uppercase) score += 1;
        if (checks.numbers) score += 1;
        if (checks.special) score += 1;
        
        if (score <= 2) return { strength: 1, label: "Weak", color: "bg-red-500" };
        if (score <= 4) return { strength: 2, label: "Medium", color: "bg-yellow-500" };
        return { strength: 3, label: "Strong", color: "bg-green-500" };
    }

    const passwordsMatch = () => {
        return createAccountFields.password === createAccountFields.confirmPassword;
    };

    const isCreateAccountDisabled =
        !createAccountFields.name ||
        !createAccountFields.surname ||
        !isValidEmail(createAccountFields.email) ||
        !isValidPassword(createAccountFields.password) ||
        !passwordsMatch();

    const isLoginDisabled = !isValidEmail(loginFields.email) || !loginFields.password;

    // Handle Enter key press for login
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoginDisabled && !loading) {
            handleLogin();
        }
    };

    // Authentication handlers
    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage("");
        
        const { error } = await signIn(loginFields.email, loginFields.password);
        
        if (error) {
            setErrorMessage(error.message);
        } else {
            router.push('/')
        }
        
        setLoading(false);
    };

    const handleCreateAccount = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        
        const { error } = await signUp(
            createAccountFields.email, 
            createAccountFields.password,
            {
                first_name: createAccountFields.name,
                last_name: createAccountFields.surname
            }
        );
        
        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccessMessage("Account created successfully! Please check your email and click the confirmation link to verify your account.");
            // Clear the form fields after successful account creation
            setCreateAccountFields({
                name: "",
                surname: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        }
        
        setLoading(false);
    };

    const handleResendConfirmation = async () => {
        if (!resendEmail || !isValidEmail(resendEmail)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }

        setResendLoading(true);
        setErrorMessage("");
        
        const { error } = await resendConfirmation(resendEmail);
        
        if (error) {
            setErrorMessage(error.message);
        } else {
            setResendEmail("");
        }
        
        setResendLoading(false);
    };

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
            {/* Error and Success Messages */}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-lg w-full">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-lg w-full">
                    {successMessage}
                </div>
            )}            
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
                            onKeyPress={handleKeyPress}
                        />
                        {!validateInputs.email && (
                            <p className="text-red-500 text-sm">Email address needs to be of a valid format: user@domain.com</p>
                        )}
                        <div className="relative mt-2">
                            <input
                                type={showPasswordLogin ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className={`${inputClassName} ${borderNormal} pr-12`}
                                onChange={handleLoginChange}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                type="button"
                                onMouseDown={() => setShowPasswordLogin(true)}
                                onMouseUp={() => setShowPasswordLogin(false)}
                                onMouseLeave={() => setShowPasswordLogin(false)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 flex items-center justify-center"
                                style={{ top: 'calc(50% + 1px)' }}
                            >
                                {showPasswordLogin ? EyeOpenIcon : EyeClosedIcon}
                            </button>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className={`p-2 w-1/2 rounded-md text-white ${isLoginDisabled || loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                    }`}
                                disabled={isLoginDisabled || loading}
                                onClick={handleLogin}
                            >
                                {loading ? "Logging in..." : "Log In"}
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
                            <div className="relative mt-2">
                                <input
                                    type={showPasswordCreate ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className={`${inputClassName} ${validateInputs.password ? borderNormal : borderError} pr-12`}
                                    onChange={(e) => {
                                        handleCreateAccountChange(e);
                                        setValidateInputs((prev) => ({
                                            ...prev,
                                            password: isValidPassword(e.target.value),
                                            confirmPassword: createAccountFields.confirmPassword === e.target.value
                                        }));
                                    }}
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPasswordCreate(true)}
                                    onMouseUp={() => setShowPasswordCreate(false)}
                                    onMouseLeave={() => setShowPasswordCreate(false)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 flex items-center justify-center"
                                    style={{ top: 'calc(50% + 1px)' }}
                                >
                                    {showPasswordCreate ? EyeOpenIcon : EyeClosedIcon}
                                </button>
                            </div>
                            {!validateInputs.password && (
                                <p className="text-red-500 text-sm">Password must be at least 8 characters long.</p>
                            )}
                            {createAccountFields.password && (
                                <div className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(createAccountFields.password).color}`}
                                                style={{ width: `${(getPasswordStrength(createAccountFields.password).strength / 3) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-sm font-medium ${getPasswordStrength(createAccountFields.password).strength === 1 ? 'text-red-500' : getPasswordStrength(createAccountFields.password).strength === 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                                            {getPasswordStrength(createAccountFields.password).label}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <input
                                type={showPasswordCreate ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={`${inputClassName} ${validateInputs.confirmPassword ? borderNormal : borderError}`}
                                onChange={(e) => {
                                    handleCreateAccountChange(e);
                                    setValidateInputs((prev) => ({
                                        ...prev,
                                        confirmPassword: createAccountFields.password === e.target.value
                                    }));
                                }}
                            />
                            {!validateInputs.confirmPassword && createAccountFields.confirmPassword && (
                                <p className="text-red-500 text-sm">Passwords do not match.</p>
                            )}
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className={`p-2 w-1/2 rounded-md text-white ${isCreateAccountDisabled || loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                        }`}
                                    disabled={isCreateAccountDisabled || loading}
                                    onClick={handleCreateAccount}
                                >
                                    {loading ? "Creating..." : "Create Account"}
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
            
            {/* Resend Confirmation Section */}
            <div className={`w-full md:w-3/4 max-w-lg mt-8 ${frameClassName}`}>
                <h3 className={titleh3ClassName}>Resend Email Confirmation</h3>
                <hr className="border-[#9747FF] my-2" style={{ borderWidth: "2px" }} />
                <p className="text-sm text-white mb-4 text-center">
                    Didn&apos;t receive a confirmation email? Enter your email address to resend it.
                </p>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={resendEmail}
                    className={`${inputClassName} ${validateInputs.resendEmail ? borderNormal : borderError}`}
                    onChange={(e) => {
                        setResendEmail(e.target.value);
                        setValidateInputs({ ...validateInputs, resendEmail: isValidEmail(e.target.value) });
                    }}
                />
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className={`p-2 w-1/2 rounded-md text-white ${
                            !resendEmail || !isValidEmail(resendEmail) || resendLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={!resendEmail || !isValidEmail(resendEmail) || resendLoading}
                        onClick={handleResendConfirmation}
                    >
                        {resendLoading ? "Sending..." : "Resend Confirmation"}
                    </button>
                </div>
            </div>
        </main>
    );
}