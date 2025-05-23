'use client'

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import {HttpUtil} from "@/utils/http.utils";
import {useToast} from "@/context/toast.context";
import FullPageLoader from "@/components/loadingComponent/loader.component";
import {useUtils} from "@/context/utils.context";

interface FormValues {
    otp: string;
}

interface UserDetails {
    OTP?: string,
    UniqueId?: string,
    UserId?: string,
    Email?: string,
}
// Client Components that use useSearchParams
const VerifyForm = () => {
    // Move the code that uses useSearchParams into this component
    const { useSearchParams } = require('next/navigation');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const searchParams = useSearchParams();
    const toast = useToast();
    const { apiCaller } = useUtils();
    const name = searchParams.get('type');
    const [user, setUser] = useState<UserDetails | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        defaultValues: {
            otp: ''
        }
    });

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
    // Fetch user data from localStorage on client side
    useEffect(() => {
        const storedUser = localStorage.getItem('userDetails');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed?.Details) {
                    setUser(parsed.Details); // Set user to just the inner Details object
                }
            } catch (e) {
                console.error('Error parsing userDetails from localStorage:', e);
            }
        }
    }, []);

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setIsLoading(true);
        const response = await (apiCaller() as HttpUtil).performApiCall(
            "v1/Authorization/VerifyUser",
            (res: any, error: any, smessage: any) => {
                if (error) {
                    setLoading(false);
                    setIsLoading(false);
                    toast.error(error);
                    return;
                }
                if (res) {
                    setLoading(false);
                    setIsLoading(false);
                    toast.success(smessage);
                    setTimeout(() => {
                        if (name === 'sell'){
                            router.push('/dashboard/selleronboarding');
                        }else {
                            router.push('/auth/login');
                        }
                    }, 1000);
                }
            },
            {
                data: {
                    OTP: data.otp || user?.OTP,
                    UniqueId: user?.UniqueId,
                    UserId: user?.UserId

                },
                getMethod: false,
                silently: true,
            }
        );
    };

    const handleResendOtp = async () => {
        setResendDisabled(true);
        setCountdown(30); // Disable resend for 30 seconds
        setLoading(true);
        const response = await (apiCaller() as HttpUtil).performApiCall(
            "v1/Authorization/ResendOTPForRegistration",
            (res: any, error: any, smessage: any) => {
                if (error) {
                    setLoading(false);
                    setIsLoading(false);
                    toast.error(error);
                    return;
                }
                if (res) {
                    setLoading(false);
                    setIsLoading(false);
                    toast.success(smessage);
                }
            },
            {
                data: {
                    Email: user?.Email,

                },
                getMethod: false,
                silently: true,
            }
        );
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
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
                    disabled={isLoading || !watch('otp')}
                    className="w-full mt-8 py-3 px-4 bg-blue-light text-white font-medium rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </div>
        </form>
    );
};

// Loading fallback for Suspense
const LoadingFallback = () => (
    <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>
);

// Main component
const Verify = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center w-full lg:h-screen lg:overflow-hidden md:px-0 bg-white">
            <div className="topGradient"></div>
            <div className="grid w-full h-full lg:grid-cols-2 grid-1">
                <AuthBannerBanner/>
                {/* Right side - Login Form */}
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

                            <Suspense fallback={<LoadingFallback />}>
                                <VerifyForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verify;