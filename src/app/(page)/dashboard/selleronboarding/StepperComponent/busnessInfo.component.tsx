import { useCached } from "@/context/cached.context";
import OnboardingInput from "../component/input.component";
import { useEffect, useState } from "react";
import { isValidEmail, isValidNigerianPhone } from "@/utils/app.utils";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import OnboardingSelect from "../component/selectInput.component";
import { HttpUtilNoSecure } from "@/utils/httpNosecure.utils";
import { states } from "@/utils/asset.utils";
import { useRouter } from "next/navigation";

export default function BusinessInfomation() {
  const {
    onboardingStepper,
    submitHandler,
    setSubmitHandler,
    setOnboardingStepper,
    onboardingModel,
    setOnboardingModel,
  } = useCached();
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const http = new HttpUtilNoSecure();
  const [businessType, setBusinessType] = useState("");
  const [businessTypes, setBuisnessTypes] = useState<any>([]);
  const [businessLocation, setBusinessLocation] = useState("");
  const [allStates, setAllStates] = useState<any>([]);
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
    if (Object.keys(newErrors).length === 0) {
      onboardingModel.businessName = businessName;
      onboardingModel.phoneNumber = phoneNumber;
      onboardingModel.email = email;
      onboardingModel.businessType = businessType;
      onboardingModel.businessLocation = businessLocation;
      setOnboardingModel(onboardingModel);
      setOnboardingStepper(onboardingStepper + 1);
    }
    // Return true if no errors
  };

  // Register submitHandler when component mounts

  const handleChange = (event: SelectChangeEvent) => {
    setBusinessType(event.target.value as string);
  };
  const fetchData = async () => {
    http.get("v1/ServiceProviderType/GetAllServiceType", {}, {}, (result: any, error: any) => {
      if (error) {
        console.error("Error fetching users:", error);
        // Handle the error, e.g., display an error message to the user
      } else {
        const transformedOptions = result.map((type: any) => ({
          value: type.id,
          label: type.businessTypeName,
        }));
        setBuisnessTypes(transformedOptions);
        console.log("Users fetched successfully:", result);
        // Process the fetched user data
      }
    });
  };
  const fetchCountry = async () => {
    http.get("v1/Utilities/GetAllCountries", {}, {}, (result: any, error: any) => {
      if (error) {
        console.error("Error fetching users:", error);
        // Handle the error, e.g., display an error message to the user
      } else {
        const transformedOptions = result.map((type: any) => ({
          value: type.id,
          label: type.countryName,
        }));
        setAllStates(transformedOptions);

        console.log("Users fetched successfully:", result);
        // Process the fetched user data
      }
    });
  };
  useEffect(() => {
    fetchCountry();
    fetchData();
    // const options = states.map((stateObject) => ({
    //   label: stateObject.state.name,
    //   value: stateObject.state.name,
    // }));
  }, []);
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
        options={businessTypes}
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
        options={allStates}
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
          className="w-full flex-1 rounded-[12px] flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
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
