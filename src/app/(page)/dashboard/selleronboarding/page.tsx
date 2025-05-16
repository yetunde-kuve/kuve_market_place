"use client";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import AuthBannerBanner2 from "@/components/authBanner/authBanner2.banner";
import Image from "next/image";
import { ReactNode } from "react";
import Logo from "../../../../../public/img/logo.svg";
import { useCached } from "@/context/cached.context";
import UserType from "./StepperComponent/userType.component";

type StepType = {
  label: string;
  icon: ReactNode;
  component: ReactNode;
  sub: string;
};

// Define the stepContent object with a proper type
const stepContent: Record<number, StepType> = {
  0: {
    label: "What Are You Here For?",
    sub: "What do you want to do on Kuve?",
    icon: <i className="ri-user-3-line"></i>,
    component: <UserType />,
  },
  1: {
    label: "Business Information",
    sub: "Tell us a little bit about your business",
    icon: <i className="ri-mail-line"></i>,
    component: "Second Component",
  },
  2: {
    label: "We Need More Information",
    sub: "Tell us more about your business",
    icon: <i className="ri-lock-password-line"></i>,
    component: "Third Component",
  },
  3: {
    label: "Set Up Your Storefront",
    sub: "Tell us more about your business",
    icon: "icon",
    component: "Fourth Component",
  },
  4: {
    label: "Store Operating Time",
    sub: "What days in a week does your store operate?",
    icon: "icon",
    component: "Fivth Component",
  },
};

export default function SellerOnboarding() {
  const { onboardingStepper, setOnboardingStepper, onboardingModel, setOnboardingModel } =
    useCached();
  const totalSteps = Object.keys(stepContent).length;
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden md:px-0 px-[16px]">
      <div className="topGradient"></div>
      <div className="grid w-full h-full lg:grid-cols-2 grid-1">
        <AuthBannerBanner2 />
        <div className="flex gap-[40px] lg:gap-[55px] relative flex-col items-center justify-center h-full m-3 overflow-auto  ">
          <div className="absolute top-0 items-center justify-between hidden w-full px-4 py-3 lg:flex ">
            {onboardingStepper > 0 && (
              <>
                <p className="text-[14px] font-[700] text-[#808287]">
                  {onboardingStepper + 1}/{totalSteps}
                </p>

                {onboardingStepper > 1 && (
                  <button
                    onClick={() => {
                      if (onboardingStepper + 1 < totalSteps) {
                        setOnboardingStepper(onboardingStepper + 1);
                      } else {
                        alert("Last stepper");
                      }
                    }}
                    className="text-[14px] font-[700] text-[#212844]"
                  >
                    Skip
                  </button>
                )}
              </>
            )}
          </div>
          <div className="absolute top-[32px] flex items-center justify-between w-full lg:hidden px-3 ">
            {onboardingStepper > 0 && (
              <button
                onClick={() => {
                  setOnboardingStepper(onboardingStepper - 1);
                }}
                className="text-[14px] font-[700] flex gap-[14px] items-center text-[#212844]"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.875 10.5H3.125"
                    stroke="#212844"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.75 4.875L3.125 10.5L8.75 16.125"
                    stroke="#212844"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Go Back
              </button>
            )}
            {onboardingStepper > 0 && (
              <>
                <p className="text-[14px] font-[700] text-[#808287]">
                  {onboardingStepper + 1}/{totalSteps}
                </p>
              </>
            )}
          </div>
          <Image src={Logo} width={141} height={31} alt="kuve logo" />
          <div className="flex flex-col gap-[12px]  justify-center items-center">
            <p className="lg:text-[48px]  text-[#121212] md:text-[40px] text-[32px] font-[500] lg:w-[70%] text-center leading-[0.93]">
              {" "}
              {stepContent[onboardingStepper].label}
            </p>
            <p className="text-[16px] text-center text-[#3D3D3D]">
              {" "}
              {stepContent[onboardingStepper].sub}
            </p>
            <div className="lg:w-[500px] md:w-[507px] w-full">
              {stepContent[onboardingStepper].component}
              <div>
                {onboardingStepper > 0 && (
                  <div className="gap-[12px] flex flex-col  justify-between  lg:hidden mt-[12px]  md:w-[507px] w-full ">
                    <button
                      onClick={() => {
                        if (onboardingStepper + 1 < totalSteps) {
                          setOnboardingStepper(onboardingStepper + 1);
                        } else {
                          alert("Last stepper");
                        }
                      }}
                      className="  rounded-[12px] w-full flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
                    >
                      {onboardingStepper + 1 < totalSteps ? "Continue" : "Finish"}
                    </button>
                    <button
                      onClick={() => {
                        if (onboardingStepper + 1 < totalSteps) {
                          setOnboardingStepper(onboardingStepper + 1);
                        } else {
                          alert("Last stepper");
                        }
                      }}
                      className="w-full  text-[16px] font-[500] text-black"
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            </div>

            {onboardingStepper > 0 && (
              <div className="absolute gap-[12px] justify-between hidden w-full bottom-6 lg:flex px-[5%]">
                <button
                  onClick={() => {
                    setOnboardingStepper(onboardingStepper - 1);
                  }}
                  className="w-[75px] rounded-[12px] flex justify-center items-center h-[48px] border border-[#212844] text-[#212844] font-[400]"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (onboardingStepper + 1 < totalSteps) {
                      setOnboardingStepper(onboardingStepper + 1);
                    } else {
                      alert("Last stepper");
                    }
                  }}
                  className="w-[75px] flex-1 rounded-[12px] flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
                >
                  {onboardingStepper + 1 < totalSteps ? "Continue" : "Finish"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
