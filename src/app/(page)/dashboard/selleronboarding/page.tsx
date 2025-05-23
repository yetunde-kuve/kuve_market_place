"use client";
import AuthBannerBanner from "@/components/authBanner/authBanner.banner";
import AuthBannerBanner2 from "@/components/authBanner/authBanner2.banner";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import Logo from "../../../../../public/img/logo.svg";
import { useCached } from "@/context/cached.context";
import BusinessInfomation from "./StepperComponent/busnessInfo.component";
import BusinessMoreInformation from "./StepperComponent/businesMoreinfo.component";
import StorefrontSetup from "@/app/(page)/dashboard/selleronboarding/StepperComponent/storeFrontSetup.component";
import StoreOperatingTime from "@/app/(page)/dashboard/selleronboarding/StepperComponent/storeOperatingTime.component";
import { useRouter } from "next/navigation";
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
    label: "Set Up Your Storefront ",
    sub: "Tell us more about your business",
    icon: "icon",
    component: <StorefrontSetup />,
  },
  3: {
    label: "Store Operating Time",
    sub: "What days in a week does your store operate?",
    icon: "icon",
    component: <StoreOperatingTime />,
  },
};

export default function SellerOnboarding() {
  const {
    onboardingStepper,

    setTotalSteps,
    setOnboardingStepper,
    onboardingModel,
    setOnboardingModel,
  } = useCached();
  const router = useRouter();

  useEffect(() => {
    setOnboardingStepper(0);
  }, []);
  useEffect(() => {
    console.log("onboardingStepper:", onboardingStepper);
    console.log("stepContent:", stepContent);
    console.log("stepContent[stepper]:", stepContent[onboardingStepper]);
  }, [onboardingStepper]);
  const stepsCount = Object.keys(stepContent).length;
  return (
    <div className="flex items-center justify-center w-full bg-white lg:h-screen lg:overflow-hidden md:px-0 ">
      <div className="topGradient"></div>
      <div className="grid w-full h-full lg:grid-cols-2 grid-1">
        <AuthBannerBanner2 />
        <div className="relative flex flex-col h-screen overflow-y-auto ">
          <div className="flex gap-[40px] lg:gap-[55px] relative flex-col items-center justify-center flex-grow lg:pb-[60px] lg:pt-[60px] md:pb-[60px] md:pt-[60px] pb-[40px] pt-[40px] ">
            <div className="absolute top-0 items-center justify-between hidden w-full px-4 py-3 lg:flex ">
              <>
                <p className="text-[14px] font-[700] text-[#808287]">
                  {onboardingStepper + 1}/{stepsCount}
                </p>

                <button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className="text-[16px] font-[500] text-[#212844]"
                >
                  SKIP
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
                    {onboardingStepper + 1}/{stepsCount}
                  </p>
                </>
              )}
            </div>

            <div className="flex md:px-0 px-4 flex-col gap-[12px]  justify-center items-center lg:mt-0 mt-[40px]  md:bg-white lg:bg-transparent md:p-[50px] lg:p-4 md:rounded-[20px] lg:rounded-none w-full md:shadow-md lg:shadow-none">
              <Image src={Logo} width={141} height={31} alt="kuve logo" />
              <p className="lg:text-[48px]  text-[#121212] md:text-[40px] text-[32px] font-[500] lg:w-[406px] lg:pt-10 text-center leading-[0.93]">
                {" "}
                {stepContent[onboardingStepper]?.label}
              </p>
              <p className="text-[16px] text-center text-[#3D3D3D]">
                {" "}
                {stepContent[onboardingStepper]?.sub}
              </p>
              <div className="lg:w-[500px] md:w-[507px] w-full">
                {stepContent[onboardingStepper]?.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
