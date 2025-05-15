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
                console.log('Login attempted with:', data);
                router.push('/dashboard');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="relative bg-white">
            <Head>
                <title>Kuve - Forgot Password</title>
                <meta name="description" content="Sign in to your Kuve account" />
            </Head>

            <div className="topGradient"></div>

            <div className="flex min-h-screen">
                <AuthBannerBanner />

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

                    <div className="flex flex-col justify-center max-w-md mx-auto w-full lg:mt-32 mt-40">
                        <div className="w-full lg:max-w-md md:max-w-[712px] mx-auto md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-xl md:p-8 lg:bg-transparent lg:shadow-none lg:p-0">
                            <div className="mb-4 text-center">
                                <div className="flex justify-center mb-6">
                                    <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                </div>
                                <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2 lg:w-[406px] w-[396px]">Forgot Password</h2>
                                <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal lg:w-[406px] w-[396px] h-[48px]">
                                    Enter the email linked to your account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-1 text-[16px] font-normal text-black-light">Email</label>
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

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3 px-4 bg-blue-light text-white text-[16px] font-normal rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
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