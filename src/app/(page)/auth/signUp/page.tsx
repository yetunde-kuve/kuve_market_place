'use client'

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

// Define types for our form values
interface FormValues {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    activity: string;
    agreeToTerms: boolean;
}

const SignUp = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            activity: '',
            agreeToTerms: false
        }
    });

    const password = watch("password");

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        try {
            // Simulating registration
            setTimeout(() => {
                console.log('Registration attempted with:', data);
                router.push('/dashboard');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Registration failed:', error);
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        // Implement Google Sign-Up logic
        console.log('Sign up with Google clicked');
    };

    return (
        <div className="relative bg-white">
            <Head>
                <title>Kuve - Sign Up</title>
                <meta name="description" content="Sign up for a Kuve account" />
            </Head>

            <div className="topGradient"></div>

            <div className="flex min-h-screen">
                <div className="hidden lg:flex lg:w-1/2 relative p-2">
                    <Image
                        src={"/img/auth-banner.png"}
                        alt="banner"
                        width={709}
                        height={940}
                    />
                </div>

                {/* Right side - Signup Form */}
                <div className="relative w-full lg:w-1/2 flex flex-col px-4 md:px-8 pt-6">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-[14px] font-bold text-blue hover:text-gray-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            <span className="ml-2">GO BACK</span>
                        </button>
                    </div>

                    <div className="flex flex-col justify-center max-w-md mx-auto w-full mt-8">
                        <div className="w-full lg:max-w-md md:max-w-[712px] mx-auto md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-xl md:p-8 lg:bg-transparent lg:shadow-none lg:p-0">
                            <div className="mb-4 text-center">
                                <div className="flex justify-center mb-6">
                                    <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                </div>
                                <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2 md:w-[406px] w-[396px]">Create Account</h2>
                                <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal md:w-[406px] w-[396px] h-[48px]">
                                    Create an account to start buying and selling on Kuve.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block mb-1 text-[16px] font-normal text-black-light">Full Name<span className="text-red-500">*</span></label>
                                    <input
                                        id="fullName"
                                        placeholder="Enter your full name"
                                        className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("fullName", {
                                            required: "Full name is required"
                                        })}
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-1 text-[16px] font-normal text-black-light">Email<span className="text-red-500">*</span></label>
                                    <input
                                        id="email"
                                        placeholder="Enter your email"
                                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block mb-1 text-[16px] font-normal text-black-light">Phone Number<span className="text-red-500">*</span></label>
                                    <input
                                        id="phoneNumber"
                                        placeholder="Enter your phone number"
                                        className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("phoneNumber", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9+\-\s()]*$/,
                                                message: "Invalid phone number format"
                                            }
                                        })}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="activity" className="block mb-1 text-[16px] font-normal text-black-light">What do you want to do?<span className="text-red-500">*</span></label>
                                    <select
                                        id="activity"
                                        className={`w-full p-3 border ${errors.activity ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("activity", {
                                            required: "Please select an option"
                                        })}
                                    >
                                        <option value="" disabled>Select option</option>
                                        <option value="sell">Sell</option>
                                        <option value="buy">Buy</option>
                                    </select>
                                    {errors.activity && (
                                        <p className="mt-1 text-xs text-red-600">{errors.activity.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-1 text-[16px] font-normal text-black-light">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                                    )}
                                </div>

                                {/*<div>*/}
                                {/*    <label htmlFor="confirmPassword" className="block mb-1 text-[16px] font-normal text-black-light">Confirm Password</label>*/}
                                {/*    <div className="relative">*/}
                                {/*        <input*/}
                                {/*            id="confirmPassword"*/}
                                {/*            type={showConfirmPassword ? "text" : "password"}*/}
                                {/*            placeholder="Confirm your password"*/}
                                {/*            className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}*/}
                                {/*            {...register("confirmPassword", {*/}
                                {/*                required: "Please confirm your password",*/}
                                {/*                validate: value => value === password || "Passwords do not match"*/}
                                {/*            })}*/}
                                {/*        />*/}
                                {/*        <button*/}
                                {/*            type="button"*/}
                                {/*            className="absolute inset-y-0 right-0 pr-3 flex items-center"*/}
                                {/*            onClick={() => setShowConfirmPassword(!showConfirmPassword)}*/}
                                {/*        >*/}
                                {/*            {showConfirmPassword ? (*/}
                                {/*                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">*/}
                                {/*                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>*/}
                                {/*                    <line x1="1" y1="1" x2="23" y2="23"></line>*/}
                                {/*                </svg>*/}
                                {/*            ) : (*/}
                                {/*                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">*/}
                                {/*                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>*/}
                                {/*                    <circle cx="12" cy="12" r="3"></circle>*/}
                                {/*                </svg>*/}
                                {/*            )}*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*    {errors.confirmPassword && (*/}
                                {/*        <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>*/}
                                {/*    )}*/}
                                {/*</div>*/}

                                <div className="flex items-center">
                                    <input
                                        id="agreeToTerms"
                                        type="checkbox"
                                        className="h-[20px] w-[20px] text-[#FF9D98] rounded focus:ring-[#FF9D98] checked:bg-[#FF9D98] checked:border-transparent"
                                        {...register("agreeToTerms", {
                                            required: "You must agree to the terms and conditions"
                                        })}
                                    />
                                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                                        I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link>
                                    </label>
                                </div>
                                {errors.agreeToTerms && (
                                    <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-4 bg-blue-light text-white text-[16px] font-normal rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 mt-4"
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                {/*<div className="relative my-4">*/}
                                {/*    <div className="absolute inset-0 flex items-center">*/}
                                {/*        <div className="w-full border-t border-gray-300"></div>*/}
                                {/*    </div>*/}
                                {/*    <div className="relative flex justify-center text-sm">*/}
                                {/*      <span className="px-2 bg-white text-gray-500">*/}
                                {/*        or*/}
                                {/*      </span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <button
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    className="w-full flex items-center justify-center py-3 px-4 border border-[#EDEDED] rounded-md shadow-sm bg-white text-[16px] font-normal text-black-light hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                                        </g>
                                    </svg>
                                    Sign up with Google
                                </button>
                            </form>

                            <p className="text-center mt-5 text-[16px] text-gray-600">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="font-medium text-[#3E3E3E] hover:text-blue-500">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;