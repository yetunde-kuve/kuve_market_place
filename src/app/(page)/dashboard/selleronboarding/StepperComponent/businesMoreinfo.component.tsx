"use client";
import { useEffect, useState } from "react";
import OnboardingInput from "../component/input.component";
import { useCached } from "@/context/cached.context";
import OnboardingSelect from "../component/selectInput.component";

export default function BusinessMoreInformation() {
  const [businessAddress, setBusinessAddres] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [teamSize, setTeamSize] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
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

  const handleSubmit = () => {
    return true;
  };
  useEffect(() => {
    setSubmitHandler(() => handleSubmit);
  }, [businessAddress]);
  return (
    <div className="  flex flex-col gap-[15px]  w-full md:px-0 px-6 ">
      <OnboardingInput
        label="Business Address"
        name="businessName"
        value={businessAddress}
        optional={true}
        onChange={(e) => {
          setBusinessAddres(e.target.value);
        }}
        placeholder="Enter your business address"
        error={""}
      />
      <OnboardingSelect
        label="How big is your team? "
        name="teamsize"
        value={teamSize}
        onChange={(e) => {
          setTeamSize(e.target.value);
        }}
        optional={true}
        placeholder="Select option"
        error={""}
        options={[
          { label: "Ten", value: 10 },
          { label: "Twenty", value: 20 },
          { label: "Thirty", value: 30 },
        ]}
      />
      <OnboardingInput
        label="Business Website"
        name="businessName"
        value={businessWebsite}
        optional={true}
        onChange={(e) => {
          setBusinessWebsite(e.target.value);
        }}
        placeholder="Enter your business website"
        error={""}
      />
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
              alert("Last stepper");
            }
          }}
          className="w-full  text-[16px] font-[500] text-black"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
