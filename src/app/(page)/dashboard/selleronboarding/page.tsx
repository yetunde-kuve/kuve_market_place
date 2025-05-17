"use client";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import AuthBannerBanner2 from "@/components/authBanner/authBanner2.banner";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import Logo from "../../../../../public/img/logo.svg";
import { useCached } from "@/context/cached.context";
import BusinessInfomation from "./StepperComponent/busnessInfo.component";
import BusinessMoreInformation from "./StepperComponent/businesMoreinfo.component";

type StepType = {
  label: string;
  icon: ReactNode;
  component: ReactNode;
  sub: string;
};

// Define the stepContent object with a proper type
const stepContent: Record<number, StepType> = {
  0: {
    label: "Business Information",
    sub: "Tell us a little bit about your business",
    icon: <i className="ri-mail-line"></i>,
    component: <BusinessInfomation />,
  },
  1: {
    label: "We Need More Information",
    sub: "Tell us more about your business",
    icon: <i className="ri-lock-password-line"></i>,
    component: <BusinessMoreInformation />,
  },
  2: {
    label: "Set Up Your Storefront",
    sub: "Tell us more about your business",
    icon: "icon",
    component: "Fourth Component",
  },
  3: {
    label: "Store Operating Time",
    sub: "What days in a week does your store operate?",
    icon: "icon",
    component: "Fivth Component",
  },
};

export default function SellerOnboarding() {
  const {
    onboardingStepper,
    totalSteps,
    setTotalSteps,
    setOnboardingStepper,
    onboardingModel,
    setOnboardingModel,
  } = useCached();

  const { submitHandler } = useCached();

  const handleContinue = () => {
    if (submitHandler && typeof submitHandler === "function") {
      const isValid = submitHandler(); // Run step-specific logic

      if (isValid) {
        if (onboardingStepper + 1 < totalSteps) {
          setOnboardingStepper(onboardingStepper + 1);
        } else {
          alert("🎉 Finished onboarding!");
        }
      }
    }
  };
  useEffect(() => {
    const stepsCount = Object.keys(stepContent).length;
    setTotalSteps(stepsCount);
  });
  return (
    <div className="flex items-center justify-center w-full lg:h-screen lg:overflow-hidden md:px-0 ">
      <div className="topGradient"></div>
      <div className="grid w-full h-full lg:grid-cols-2 grid-1">
        <AuthBannerBanner2 />
        <div className="relative flex flex-col h-screen overflow-y-auto ">
          <div className="flex gap-[40px] lg:gap-[55px] relative flex-col items-center justify-center flex-grow lg:pb-[88px] lg:pt-[88px] md:pb-[60px] md:pt-[60px] pb-[40px] pt-[40px] ">
            <div className="absolute top-0 items-center justify-between hidden w-full px-4 py-3 lg:flex ">
              <>
                <p className="text-[14px] font-[700] text-[#808287]">
                  {onboardingStepper + 1}/{totalSteps}
                </p>

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
              </>
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

            <div className="flex flex-col gap-[12px]  justify-center items-center  md:bg-white lg:bg-transparent md:p-[50px] lg:p-4 md:rounded-[20px] lg:rounded-none md:shadow-md lg:shadow-none">
              <Image src={Logo} width={141} height={31} alt="kuve logo" />
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
                <div></div>
              </div>

              <div className="absolute gap-[12px] justify-between hidden w-full bottom-6 lg:flex px-[5%]">
                <button
                  onClick={() => {
                    setOnboardingStepper(onboardingStepper - 1);
                  }}
                  className="w-[75px] bg-white rounded-[12px] flex justify-center items-center h-[48px] border border-[#212844] text-[#212844] font-[400]"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="w-[75px] flex-1 rounded-[12px] flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
                >
                  {onboardingStepper + 1 < totalSteps ? "Continue" : "Finish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
