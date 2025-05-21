"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import { Suspense } from "react";
import { HttpUtil } from "@/utils/http.utils";
import { useUtils } from "@/context/utils.context";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import FullPageLoader from "@/components/loadingComponent/loader.component";
import SucessfullDialog from "@/components/diaolog/successDialog.component";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useToast } from "@/context/toast.context";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

// Define types for our form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  activity: string;
  agreeToTerms: boolean;
}
export interface UserInterest {
  name: string;
  id: string;
}

// Loading fallback for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-32">
    <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
);

// Client Component that uses useSearchParams
const SignUpForm = () => {
  const { useSearchParams } = require("next/navigation");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showActivityField, setShowActivityField] = useState<boolean>(true);
  const activityParam = searchParams.get("activity");
  const { apiCaller } = useUtils();
  const [status, setStatus] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [interests, setInterests] = useState<UserInterest[]>([]);
  let baseUrl = process.env.NEXT_PUBLIC_BASED_URL;
  const APIKey = process.env.NEXT_PUBLIC_API_KEY;
  // Initialize react-hook-form
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      activity: activityParam || "",
      agreeToTerms: false,
    },
  });

  // Handle URL parameters on component mount
  useEffect(() => {
    // If activity param exists, set the form value and hide the selection
    if (activityParam) {
      setValue("activity", activityParam);
      setShowActivityField(false);
    }
  }, [activityParam, setValue]);

  useEffect(() => {
    // Function to fetch user interests
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${baseUrl}v1/Authorization/UserInterest`);
        setInterests(response.data);
        console.log(interests);
      } catch (error) {
        console.error("Failed to fetch interests:", error);
      }
    };
    fetchInterests();
  }, []);

  const CustomIcon = () => (
    <i
      className="ri-arrow-down-s-line"
      style={{
        fontSize: 20,
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "#6b7280", // matches typical icon color
      }}
    />
  );

  const options = [
    { label: "Sell", value: "S" },
    { label: "Buy", value: "B" },
  ];

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setIsLoading(true);
    const response = await (apiCaller() as HttpUtil).performApiCall(
      "v1/Authorization/StartRegistraton",
      (res: any, error: any, smessage: any) => {
        if (error) {
          setLoading(false);
          toast.error(error);
          return;
        }
        if (res) {
          setLoading(false);
          toast.success(smessage);
          setTimeout(() => {
            router.push(`/auth/verify/?type=${activityParam}`);
          }, 2000);
        }
      },
      {
        data: {
          email: data.email,
          firstName: data.firstName,
          phoneNumber: data.phoneNumber,
          lastName: data.lastName,
          password: data.password,
          dateOfBirth: "2025-05-19",
          gender: "M",
          residentialCountryId: 1,
          userPurpose: data.activity,
        },
        getMethod: false,
        silently: true,
      }
    );
    localStorage.setItem("userDetails", JSON.stringify(response));
  };

  // const handleGoogleSignUp = () => {
  //   // Implement Google Sign-Up logic
  //   console.log("Sign up with Google clicked");
  // };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleGoogleSignIn(tokenResponse?.access_token);
      console.log(tokenResponse.access_token);
    },
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
      <FullPageLoader open={loading} />
      {/* {openMessage && (
        <SucessfullDialog
          status={status}
          open={openMessage}
          message={message}
          onClose={() => {
            setOpenMessage(false);
          }}
        />
      )} */}
      <div>
        <label htmlFor="firstName" className="block mb-1 text-[16px] font-normal text-black-light">
          First Name<span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          placeholder="Enter your first name"
          className={`w-full p-3 border ${errors.firstName ? "border-red-500" : "border-gray-50"} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
          {...register("firstName", {
            required: "First name is required",
          })}
        />
        {errors.firstName && (
          <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-1 text-[16px] font-normal text-black-light">
          Last Name<span className="text-red-500">*</span>
        </label>
        <input
          id="lastName"
          placeholder="Enter your last name"
          className={`w-full p-3 border ${errors.lastName ? "border-red-500" : "border-gray-50"} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
          {...register("lastName", {
            required: "Last name is required",
          })}
        />
        {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 text-[16px] font-normal text-black-light">
          Email<span className="text-red-500">*</span>
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
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block mb-1 text-[16px] font-normal text-black-light"
        >
          Phone Number<span className="text-red-500">*</span>
        </label>
        <input
          id="phoneNumber"
          placeholder="Enter your phone number"
          className={`w-full p-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-50"} bg-[#F5F7FA] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-light`}
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9+\-\s()]*$/,
              message: "Invalid phone number format",
            },
          })}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>
      {showActivityField && (
        <div>
          <label htmlFor="activity" className="block mb-1 text-[16px] font-normal text-black-light">
            What do you want to do?<span className="text-red-500">*</span>
          </label>
          <Controller
            name="activity"
            control={control}
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.activity}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#F5F7FA",
                    padding: "14px 0",
                    fontSize: "14px",
                    height: "48px",
                    "& fieldset": {
                      borderColor: errors.activity ? "red" : "#F5F7FA",
                    },
                    // other styling
                  },
                  // additional styling
                }}
              >
                <Select
                  {...field}
                  displayEmpty
                  placeholder="Select option"
                  inputProps={{ "aria-label": "What do you want to do?" }}
                  IconComponent={CustomIcon}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <p className="text-[#6B6B6B]">Select option</p>;
                    }
                    const selectedOption = interests.find(
                      (opt) => String(opt.id) === String(selected)
                    );
                    return <p>{selectedOption?.name ?? ""}</p>;
                  }}
                >
                  <MenuItem value="" disabled>
                    Select option
                  </MenuItem>
                  {interests.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.activity && (
                  <FormHelperText error>{errors.activity.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </div>
      )}

      <div>
        <label htmlFor="password" className="block mb-1 text-[16px] font-normal text-black-light">
          Password<span className="text-red-500">*</span>
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
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) => {
                const firstName = watch("firstName").toLowerCase();
                const lastName = watch("lastName").toLowerCase();
                const email = watch("email").toLowerCase();
                const nameInEmail = email.split("@")[0].toLowerCase();

                // Check for capital letter
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one capital letter";
                }

                // Check for number
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                // Check for special character
                if (!/[!@#$%&*]/.test(value)) {
                  return "Password must contain at least one special character (! @ # $ % & *)";
                }

                // Check for name in password
                if (firstName && value.toLowerCase().includes(firstName.toLowerCase())) {
                  return "Password cannot contain your name";
                }

                if (lastName && value.toLowerCase().includes(lastName.toLowerCase())) {
                  return "Password cannot contain your name";
                }

                // Check for email in password
                if (
                  email &&
                  (value.toLowerCase().includes(email.toLowerCase()) ||
                    (nameInEmail && value.toLowerCase().includes(nameInEmail)))
                ) {
                  return "Password cannot contain your email address";
                }

                // Check for repeating characters (3 or more of the same character in a row)
                if (/(.)\1{2,}/.test(value)) {
                  return "Password cannot contain repeating characters";
                }

                return true;
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
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
      </div>
      <Controller
        name="agreeToTerms"
        control={control}
        rules={{ required: "You must accept the terms and conditions" }}
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
              label={
                <span className="block text-[14px] text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                    Terms and Conditions
                  </Link>
                </span>
              }
            />
            {errors.agreeToTerms && (
              <FormHelperText error>{errors.agreeToTerms.message}</FormHelperText>
            )}
          </Box>
        )}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-blue-light text-white text-[16px] font-normal rounded-[12px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 mt-4"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
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
        Sign up with Google
      </button>

      <p className="text-center my-5 text-[16px] font-normal text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-[#3E3E3E] hover:text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
};

// Main component
const SignUp = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full bg-white lg:h-screen lg:overflow-hidden md:px-0">
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

          <div className="flex flex-col justify-center max-w-md mx-auto w-full md:mt-12 lg:mt-8 mt-8 md:mb-20 lg:mb-0 lg:max-w-md md:max-w-[912px]">
            <div className="mx-3 mt-16 lg:mx-2 md:mx-24 md:mt-8 md:bg-white md:shadow-lg md:rounded-xl md:p-8 lg:bg-transparent lg:shadow-none lg:p-0">
              <div className="mb-4 text-center">
                <div className="flex justify-center mb-6">
                  <Image src="/img/logo.svg" alt="Kuve Logo" width={141.97} height={31} />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-[32px] lg:text-[48px] md:text-[40px] font-medium text-black-light mb-2">
                    Create Account
                  </h2>
                  <p className="text-[#3D3D3D] text-[14px] md:text-[16px] font-normal h-[48px]">
                    Create an account to start buying and selling on Kuve.
                  </p>
                </div>
              </div>

              <Suspense fallback={<LoadingFallback />}>
                <SignUpForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
