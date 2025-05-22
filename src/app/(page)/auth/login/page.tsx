"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import { Box, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import FullPageLoader from "@/components/loadingComponent/loader.component";
import { HttpUtil } from "@/utils/http.utils";
import { useToast } from "@/context/toast.context";
import { useUtils } from "@/context/utils.context";
import { useGoogleLogin } from "@react-oauth/google";
import { saveToLocal } from "@/utils/app.utils";

// Define types for our form values
interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { apiCaller } = useUtils();

  // Initialize react-hook-form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleGoogleSignIn(tokenResponse?.access_token);
      // console.log(tokenResponse.access_token);
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setIsLoading(true);
    const response = await (apiCaller() as HttpUtil).performApiCall(
      "v1/Authorization/login",
      (res: any, error: any, smessage: any) => {
        if (error) {
          setIsLoading(false);
          setLoading(false);
          toast.error(error);
          return;
        }
        if (res) {
          let token = res.Token;

          saveToLocal("token", token);
          setIsLoading(false);
          setLoading(false);
          toast.success(smessage);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      },
      {
        data: {
          Password: data.password,
          EmailAddress: data.email,
          LoginChannel: "Website",
        },
        getMethod: false,
        silently: true,
      }
    );
    console.log(response);
  };

  const handleGoogleSignIn = async (token: string) => {
    setLoading(true);
    setIsLoading(true);
    const response = await (apiCaller() as HttpUtil).performApiCall(
      "v1/Authorization/GoogleSignin",
      (res: any, error: any, smessage: any) => {
        if (error) {
          setIsLoading(false);
          setLoading(false);
          toast.error(error);
          return;
        }
        if (res) {
          let token = res.token;

          saveToLocal("token", token);
          setIsLoading(false);
          setLoading(false);
          toast.success(smessage);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      },
      {
        data: {
          AccessToken: token,
          PlatformType: 2,
        },
        getMethod: false,
        silently: true,
      }
    );
    console.log(response);
  };

  return (
    <div className="flex items-center justify-center w-full bg-white lg:h-screen lg:overflow-hidden md:px-0">
      <FullPageLoader open={loading} />
      <div className="topGradient"></div>
      <div className="grid w-full h-full lg:grid-cols-2 grid-1">
        <AuthBannerBanner />
        {/* Right side - Login Form */}
        <div className="relative flex flex-col h-screen overflow-y-auto lg:pb-[60px] lg:pt-[24px] md:pb-[60px] md:pt-[60px] pb-[40px] pt-[40px]">
          <div className="pl-3 md:pl-8 lg:pl-10">
            <button
              onClick={() => router.back()}
              className="flex items-center text-[14px] font-bold text-blue hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="ml-2">GO BACK</span>
            </button>
          </div>

          <div className="flex flex-col justify-center max-w-md mx-auto w-full mt-8 md:mb-20 lg:mb-0 lg:max-w-md md:max-w-[912px]">
            <div className="mx-3 lg:mx-4 md:mx-24 md:mt-8 mt-16 md:bg-white md:shadow-lg md:rounded-[20px] md:p-8 lg:bg-transparent lg:shadow-none lg:p-0">
              <div className="mb-4 text-center">
                <div className="flex justify-center mb-6">
                  <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal h-[48px]">
                    Enter your email and password to access your account.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-[16px] font-normal text-black-light"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email"
                    className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-50"} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-[16px] font-normal text-black-light"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-50"} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
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

                <div className="flex items-center justify-between">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              sx={{
                                color: "#FF9D98",
                                "&.Mui-checked": {
                                  color: "#FF9D98",
                                },
                              }}
                            />
                          }
                          label={<span className="block text-sm text-gray-700">Remember me</span>}
                        />
                      </Box>
                    )}
                  />
                  <div>
                    <Link
                      href="/auth/forgotPassword"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-light text-white text-[16px] font-normal rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>

                {/*<div className="relative my-4">*/}
                {/*    <div className="absolute inset-0 flex items-center">*/}
                {/*        <div className="w-full border-t border-gray-300"></div>*/}
                {/*    </div>*/}
                {/*    <div className="relative flex justify-center text-sm">*/}
                {/*      <span className="px-2 text-gray-500 bg-white">*/}
                {/*        or*/}
                {/*      </span>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <button
                  type="button"
                  onClick={() => loginWithGoogle()}
                  className="w-full flex items-center justify-center py-3 px-4 border border-[#EDEDED] rounded-[12px] shadow-sm bg-white text-[16px] font-normal text-black-light hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Sign in with Google
                </button>
              </form>

              <p className="text-center mt-8 text-[16px] font-normal text-gray-600">
                {`Don't have an account?`}{" "}
                <Link
                  href="/auth/signUp"
                  className="font-medium text-[#3E3E3E] hover:text-blue-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
