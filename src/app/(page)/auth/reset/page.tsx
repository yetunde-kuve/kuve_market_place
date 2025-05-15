'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import Image from 'next/image';
import {useForm} from "react-hook-form";
import Head from "next/head";


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
                console.log('Password Updated', data);
                router.push('/dashboard');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Registration failed:', error);
            setIsLoading(false);
        }
    };


    return (
        <div className="relative bg-white">
            <Head>
                <title>Kuve - Verify</title>
                <meta name="description" content="Verify Password" />
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

                    <div className="flex flex-col justify-center max-w-md mx-auto w-full lg:mt-32 mt-40">
                        <div className="w-full lg:max-w-md md:max-w-[712px] mx-auto md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-xl md:p-8 lg:bg-transparent lg:shadow-none lg:p-0">
                            <div className="mb-4 text-center">
                                <div className="flex justify-center mb-6">
                                    <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                                </div>
                                <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2 md:w-[406px] w-[396px]">Reset Password</h2>
                                <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal md:w-[406px] w-[396px] h-[48px]">
                                    Enter your new password
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-1 text-[16px] font-normal text-black-light">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-50'} bg-[#F5F7FA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                                    className="w-full py-3 px-4 bg-blue-light text-white text-[16px] font-normal rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 mt-4"
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