'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import Image from 'next/image';
import {useForm} from "react-hook-form";
import Head from "next/head";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";


interface FormValues {
    password: string;
    confirmPassword: string;
}

const Page = () => {
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
            password: '',
            confirmPassword: '',
        }
    });

    const password = watch("password");

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        try {
            // Simulating registration
            setTimeout(() => {
                console.log('Email confirmed', data);
                router.push('/buyerDashboard');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Verification failed:', error);
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center w-full lg:h-screen lg:overflow-hidden md:px-0 bg-white">
            <div className="topGradient"></div>
            <div className="grid w-full h-full lg:grid-cols-2 grid-1">
                <AuthBannerBanner />
                {/* Right side - Signup Form */}
                <div className="relative flex flex-col h-screen overflow-y-auto lg:pb-[60px] lg:pt-[24px] md:pb-[60px] md:pt-[60px] pb-[40px] pt-[40px]">
                    <div className="absolute pl-3 md:pl-8 lg:pl-10">
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

                    <div className="flex flex-col justify-center max-w-md mx-auto w-full md:mb-20 lg:mb-0 lg:max-w-md md:max-w-[912px] lg:mt-32 mt-40">
                        <div className="mx-3 lg:mx-4 md:mx-24 md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-[20px] lg:px-0 md:py-12 md:px-8 lg:bg-transparent lg:shadow-none lg:p-0">
                            <div className="mb-4 text-center">
                                <div className="flex justify-center mb-6">
                                    <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2">Reset Password</h2>
                                    <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal h-[48px]">
                                        Enter your new password
                                    </p>
                                </div>

                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="password" className="block mb-1 text-[16px] font-normal text-black-light">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
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

                                <div className="py-6">
                                    <label htmlFor="confirmPassword" className="block mb-1 text-[16px] font-normal text-black-light">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate: value => value === password || "Passwords do not match"
                                            })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
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
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-[12px] px-4 bg-blue-light text-white text-[16px] font-normal rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 mt-4"
                                >
                                    {isLoading ? 'Resending...' : 'Reset Password'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;