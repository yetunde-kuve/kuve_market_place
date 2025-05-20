'use client'

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";

interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        try {
            // const response = await signIn(data.email, data.password);
            // if (response.success) router.push('/dashboard');

            // Simulating authentication
            setTimeout(() => {
                console.log('Password:', data);
                router.push('/auth/reset');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full lg:h-screen lg:overflow-hidden md:px-0 bg-white">
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

                    <div className="flex flex-col justify-center max-w-md mx-auto w-full md:mb-20 lg:mb-0 lg:max-w-md md:max-w-[912px] lg:mt-32 mt-40">
                        <div className="mx-3 lg:mx-4 md:mx-24 md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-[20px] lg:px-0 md:py-12 md:px-8 lg:bg-transparent lg:shadow-none lg:p-0">
                            <div className="mb-4 text-center">
                                <div className="flex justify-center mb-6">
                                    <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2 lg:w-[406px] w-[396px]">Forgot Password</h2>
                                    <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal lg:w-[406px] w-[396px] h-[48px]">
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
                </div>
            </div>
        </div>
    );
};

export default Page;