"use client";
import { useEffect, useState } from "react";
import OnboardingInput from "../component/input.component";
import { useCached } from "@/context/cached.context";
import OnboardingSelect from "../component/selectInput.component";
import { useRouter } from "next/navigation";
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
  } = useCached();
  const router = useRouter();
  console.log(onboardingModel);
  const handleSubmit = () => {
    onboardingModel.businessAddress = businessAddress;
    onboardingModel.teamSize = teamSize;
    onboardingModel.businessWebsite = businessWebsite;
    setOnboardingModel(onboardingModel);
    setOnboardingStepper(2);
  };

  return (
    <div className="  flex flex-col gap-[15px]  w-full   ">
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
          { label: "1-20", value: "1-20" },
          { label: "21-50", value: "21-50" },
          { label: "51-100", value: "51-100" },
          { label: "101-200", value: "101-200" },
          { label: "201-500", value: "201-500" },
          { label: "501-1000", value: "501-1000" },
          { label: "1001-2000", value: "1001-2000" },
          { label: "2001-5000", value: "2001-5000" },
          { label: "> 5000", value: "> 5000" },
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
      <div className=" gap-[12px] justify-between hidden w-full bottom-6 lg:flex ">
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
          className="w-[75px] flex-1 rounded-[12px] flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
        >
          {onboardingStepper + 1 < 3 ? "Continue" : "Finish"}
        </button>
      </div>
      <div className="gap-[12px] flex flex-col  justify-between  lg:hidden mt-[12px]  md:w-[507px] w-full ">
        <button
          onClick={handleSubmit}
          className="  rounded-[12px] w-full flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
        >
          {onboardingStepper + 1 < 3 ? "Continue" : "Finish"}
        </button>
        <button
          onClick={() => {
            router.push("/dashboard");
          }}
          className="w-full  text-[16px] font-[500] text-black"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
