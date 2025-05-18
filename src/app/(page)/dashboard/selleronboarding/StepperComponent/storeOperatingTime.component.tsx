'use client'
import {useEffect, useState} from 'react';
import {useCached} from "@/context/cached.context";

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
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const handleToggle = (day: keyof ActiveDaysState): void => {
        setActiveDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    const Toggle: React.FC<ToggleProps> = ({ isActive, onClick }) => {
        return (
            <button
                onClick={onClick}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    isActive ? 'bg-pink-400' : 'bg-gray-300'
                }`}
            >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isActive ? 'translate-x-6' : 'translate-x-1'
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

    const handleSubmit = () => {
        return true;
    };

    useEffect(() => {
        setSubmitHandler(() => handleSubmit);
    }, []);

    return (
        <div className="flex flex-col items-center mt-8">
            {/* Main Content */}
            <div className="w-full max-w-md px-4">
                {/* Days Selection */}
                <div className="space-y-5 mb-12">
                    {(Object.keys(activeDays) as Array<keyof ActiveDaysState>).map((day) => (
                        <div key={day} className="flex items-center justify-between">
                            <span className="text-gray-800 font-medium capitalize">
                              {day}
                            </span>
                            <Toggle
                                isActive={activeDays[day]}
                                onClick={() => handleToggle(day)}
                            />
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
                                alert("Last stepper");
                            }
                        }}
                        className="w-full  text-[16px] font-[500] text-black"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
}