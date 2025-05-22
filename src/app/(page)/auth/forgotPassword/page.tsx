'use client'

import React, {Suspense, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import {HttpUtil} from "@/utils/http.utils";
import {useToast} from "@/context/toast.context";
import {useUtils} from "@/context/utils.context";
import FullPageLoader from "@/components/loadingComponent/loader.component";

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
}

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingV, setIsLoadingV] = useState<boolean>(false);
    const [isLoadingR, setIsLoadingR] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { apiCaller } = useUtils();
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


    const {
        setValue,
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            otp: '',
            password: '',
            confirmPassword: '',
        }
    });

    const password = watch("password");


    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setIsLoading(true);
        const response = await (apiCaller() as HttpUtil).performApiCall(
            "v1/Authorization/InitiateForgtPassword",
            (res: any, error: any, smessage: any) => {
                if (error) {
                    setLoading(false);
                    toast.error(error);
                    setIsLoading(false);
                    return;
                }
                if (res) {
                    setLoading(false);
                    toast.success(smessage);
                    setIsLoading(false);
                    setStep(2);
                }
            },
            {
                data: {
                    Email: data.email,

                },
                getMethod: false,
                silently: true,
            }
        );
        console.log(response);
        console.log(data);
    };

    const onSubmitVerify = async (data: FormValues) => {
        setLoading(true);
        setIsLoadingV(true);
        setLoading(false);
        setStep(3)
    };

    const onSubmitReset = async (data: FormValues) => {
        setLoading(true);
        setIsLoadingR(true);
        const response = await (apiCaller() as HttpUtil).performApiCall(
            "v1/Authorization/CompleteForgtPassword",
            (res: any, error: any, smessage: any) => {
                if (error) {
                    setLoading(false);
                    toast.error(error);
                    setIsLoadingR(false);
                    return;
                }
                if (res) {
                    setLoading(false);
                    toast.success(smessage);
                    setIsLoadingR(false);
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 1000);
                }
            },
            {
                data: {
                    OTP: data.otp,
                    Password: data.password,
                    ConfirmPassword: data.confirmPassword,

                },
                getMethod: false,
                silently: true,
            }
        );
        console.log(response);
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && resendDisabled) {
            setResendDisabled(false);
        }
    }, [countdown, resendDisabled]);

    // Handle OTP input changes
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Only allow numbers and limit to 6 digits
        const formattedValue = value.replace(/[^\d]/g, '').substring(0, 6);
        setValue('otp', formattedValue);
    };

    const handleResendOtp = async () => {
        setResendDisabled(true);
        setCountdown(30); // Disable resend for 30 seconds

        try {
            // Implement your resend OTP logic here
            // For example:
            // await resendOtp(email);

            // Simulating resend
            console.log('Resend OTP to:', email);
        } catch (error) {
            console.error('Failed to resend OTP:', error);
            setResendDisabled(false);
            setCountdown(0);
        }
    };

    return (
        <div className="flex items-center justify-center w-full lg:h-screen lg:overflow-hidden md:px-0 bg-white">
            <FullPageLoader open={loading} />
            <div className="topGradient"></div>
            <div className="grid w-full h-full lg:grid-cols-2 grid-1">
                <AuthBannerBanner />
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
                    {
                        step === 1 && (
                    <div className="flex flex-col justify-center max-w-md mx-auto w-full md:mb-20 lg:mb-0 lg:max-w-md md:max-w-[912px] lg:mt-32 mt-40">
                        <div className="mx-3 lg:mx-4 md:mx-24 md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-[20px] lg:px-0 md:py-12 md:px-8 lg:bg-transparent lg:shadow-none lg:p-0">
                            <div className="mb-4 text-center">
                                <div className="flex justify-center mb-6">
                                    <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2">Forgot Password</h2>
                                    <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal h-[48px]">
                                        Enter the email linked to your account.
                                    </p>
                                </div>

                            </div>


                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block mb-1 text-[16px] font-normal text-black-light">Email</label>
                                            <input
                                                id="email"
                                                placeholder="Enter your email"
                                                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
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

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full py-3 px-4 bg-blue-light text-white text-[16px] font-normal rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                                            >
                                                {isLoading ? 'Sending...' : 'Send Code'}
                                            </button>
                                        </div>
                                    </form>

                            <p className="text-center mt-12 text-[14px] font-normal text-[#3D3D3D]">
                                You may contact <span className="font-medium text-[#3D3D3D]">Customer Service</span> for help restoring access to your account.
                            </p>
                        </div>
                        </div>

                        )
                    }
                    {
                        step === 2 && (
                            <div className="flex flex-col justify-center  max-w-md mx-auto w-full md:mb-20 lg:mb-0 lg:max-w-md md:max-w-[912px] lg:mt-32 mt-44">
                                <div className="mx-3 lg:mx-4 md:mx-24 md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-[20px] lg:px-0 md:py-12 md:px-8 lg:bg-transparent lg:shadow-none lg:p-0">

                                    <div className="mb-4 text-center">
                                        <div className="flex justify-center mb-6">
                                            <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2">Verify Email</h2>
                                            <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal h-[48px]">
                                                Enter OTP sent to your email to verify<br/>
                                                your account.
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitVerify)} className="pt-6">
                                        <FullPageLoader open={loading} />
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label htmlFor="otp" className="block text-[16px] font-normal text-black-light">
                                                    Verification Code
                                                </label>
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleResendOtp}
                                                        disabled={resendDisabled}
                                                        className={`text-sm font-medium ${resendDisabled ? 'text-gray-400' : 'text-orange-500 hover:text-orange-600'}`}
                                                    >
                                                        {resendDisabled ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                                                    </button>
                                                </div>
                                            </div>

                                            <input
                                                id="otp"
                                                type="text"
                                                placeholder="Enter 6 digit code"
                                                className={`w-full p-3 tracking-widest border ${errors.otp ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
                                                {...register("otp", {
                                                    required: "OTP is required",
                                                    pattern: {
                                                        value: /^[0-9]{6}$/,
                                                        message: "OTP must be 6 digits"
                                                    }
                                                })}
                                                onChange={handleOtpChange}
                                            />
                                            {errors.otp && (
                                                <p className="mt-1 text-xs text-red-600">{errors.otp.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isLoadingV || !watch('otp')}
                                                className="w-full mt-8 py-3 px-4 bg-blue-light text-white font-medium rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            >
                                                {isLoadingV ? 'Verifying...' : 'Verify'}
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        )
                    }
                    {
                        step === 3 && (
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

                                    <form onSubmit={handleSubmit(onSubmitReset)} className="space-y-4">
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
                                            disabled={isLoadingR}
                                            className="w-full py-[12px] px-4 bg-blue-light text-white text-[16px] font-normal rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 mt-4"
                                        >
                                            {isLoadingR ? 'Resending...' : 'Reset Password'}
                                        </button>

                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Page;