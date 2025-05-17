import { useCached } from "@/context/cached.context";
import OnboardingInput from "../component/input.component";
import { useEffect, useState } from "react";
import { isValidEmail, isValidNigerianPhone } from "@/utils/app.utils";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import OnboardingSelect from "../component/selectInput.component";

export default function BusinessInfomation() {
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
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [businessType, setBusinessType] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!businessName.trim()) {
      newErrors.businessName = "Please enter a business name.";
    }
    if (!isValidNigerianPhone(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid Nigerian phone number.";
    }
    if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!businessType.trim()) {
      newErrors.businessType = "Please select a business type.";
    }
    if (!businessLocation.trim()) {
      newErrors.businessLocation = "Please select a business location.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Register submitHandler when component mounts
  useEffect(() => {
    setSubmitHandler(() => handleSubmit);
  }, [businessName]);

  const handleChange = (event: SelectChangeEvent) => {
    setBusinessType(event.target.value as string);
  };

  return (
    <div className="  flex flex-col gap-[15px] text-start w-full ">
      <OnboardingInput
        label="Business name"
        name="businessName"
        value={businessName}
        onChange={(e) => {
          setBusinessName(e.target.value);
          setErrors((prev) => ({ ...prev, businessName: "" }));
        }}
        placeholder="Enter your business name"
        error={errors.businessName}
        required
      />
      <OnboardingInput
        label="Phone Number "
        name="phoneNumber"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          setErrors((prev) => ({ ...prev, phoneNumber: "" }));
        }}
        placeholder="Enter your business number"
        error={errors.phoneNumber}
        required
        type="number"
      />
      <OnboardingInput
        label="Business Email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        placeholder="Enter your business email"
        error={errors.email}
        required
      />
      <OnboardingSelect
        label="What kind of business do you run?"
        name="businessType"
        value={businessType}
        onChange={(e) => {
          setBusinessType(e.target.value);
          setErrors((prev) => ({ ...prev, businessType: "" }));
        }}
        required
        placeholder="Select option"
        error={errors.businessType}
        options={[
          { label: "Ten", value: 10 },
          { label: "Twenty", value: 20 },
          { label: "Thirty", value: 30 },
        ]}
      />
      <OnboardingSelect
        label="Where is your business located? "
        name="businessLocation"
        value={businessLocation}
        onChange={(e) => {
          setBusinessLocation(e.target.value);
          setErrors((prev) => ({ ...prev, businessLocation: "" }));
        }}
        required
        placeholder="Select option"
        error={errors.businessLocation}
        options={[
          { label: "Ten", value: 10 },
          { label: "Twenty", value: 20 },
          { label: "Thirty", value: 30 },
        ]}
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
