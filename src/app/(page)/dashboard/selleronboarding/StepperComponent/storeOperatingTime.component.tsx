"use client";
import { useEffect, useState } from "react";
import { useCached } from "@/context/cached.context";
import { HttpUtilNoSecure } from "@/utils/httpNosecure.utils";
import FullPageLoader from "@/components/loadingComponent/loader.component";
import { useToast } from "@/context/toast.context";
import { useRouter } from "next/navigation";

interface ActiveDaysState {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

interface ToggleProps {
  isActive: boolean;
  onClick: () => void;
}

export default function StoreOperatingTime(): JSX.Element {
  const [activeDays, setActiveDays] = useState<ActiveDaysState>({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const handleToggle = (day: keyof ActiveDaysState): void => {
    setActiveDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const Toggle: React.FC<ToggleProps> = ({ isActive, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          isActive ? "bg-pink-400" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            isActive ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    );
  };

  const {
    onboardingStepper,
    submitHandler,
    setSubmitHandler,
    setOnboardingStepper,
    onboardingModel,
    setOnboardingModel,
    totalSteps,
    setTotalSteps,
  } = useCached();
  const http = new HttpUtilNoSecure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    http.post(
      "v1/ServiceProvider/CreateProvider",
      {
        isVerified: false,
        businessName: onboardingModel["businessName"],
        businessPhoneNumber: onboardingModel["phoneNumber"],
        businessEmail: onboardingModel["email"],
        businessTypeId: onboardingModel["businessType"],
        businessLocationId: onboardingModel["businessLocation"],
        buinessAddress: onboardingModel["businessAddress"],
        teamSize: onboardingModel["teamSize"],
        businessWebsite: onboardingModel["businessWebsite"],

        profileImage: onboardingModel["profileImg"],
        backdropImage: onboardingModel["coverimg"],
        storeColorId: onboardingModel["selectedColor"],
      },
      {},
      (result: any, error: any) => {
        if (error) {
          setLoading(false);
          console.error("Error fetching users:", error);
          toast.error(error);
          // Handle the error, e.g., display an error message to the user
        } else {
          toast.success(result.message);
          setLoading(false);
          console.log("Users fetched successfully:", result);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
          // Process the fetched user data
        }
      }
    );
  };

  console.log(onboardingModel);
  return (
    <div className="flex flex-col items-center mt-8">
      <FullPageLoader open={loading} />
      {/* Main Content */}
      <div className="w-full max-w-md ">
        {/* Days Selection */}
        <div className="mb-12 space-y-5">
          {(Object.keys(activeDays) as Array<keyof ActiveDaysState>).map((day) => (
            <div key={day} className="flex items-center justify-between">
              <span className="font-medium text-gray-800 capitalize">{day}</span>
              <Toggle isActive={activeDays[day]} onClick={() => handleToggle(day)} />
            </div>
          ))}
        </div>

        {/* Footer Buttons*/}

        <div className="gap-[12px] flex flex-col  justify-between  lg:hidden mt-[12px]  md:w-[507px] w-full ">
          <button
            onClick={handleSubmit}
            className="  rounded-[12px] w-full flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
          >
            {onboardingStepper + 1 < totalSteps ? "Continue" : "Finish"}
          </button>
          <button
            onClick={() => {
              if (onboardingStepper + 1 < totalSteps) {
                setOnboardingStepper(onboardingStepper + 1);
              } else {
              }
            }}
            className="w-full  text-[16px] font-[500] text-black"
          >
            Skip
          </button>
        </div>
        <div className=" gap-[12px] justify-between hidden w-full bottom-6 lg:flex  ">
          <button
            onClick={() => {
              setOnboardingStepper(onboardingStepper - 1);
            }}
            className="w-[75px] bg-white rounded-[12px] flex justify-center items-center h-[48px] border border-[#212844] text-[#212844] font-[400]"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="w-full flex-1 rounded-[12px] flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
          >
            {"Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
