"use client";
import { Backdrop, Divider } from "@mui/material";
import CoverNotAccepted from "../../../public/svg/covernotaccepted.svg";
import CoverAccepted from "../../../public/svg/coverAcceptedLogo.svg";
import Image from "next/image";
import { useState, useRef } from "react";
import { styled, Slider } from "@mui/material"; // Import styled and Slider

const CustomSlider = styled(Slider)(({ theme }) => ({
  height: 8, // Increase the height of the track and rail
  "& .MuiSlider-rail": {
    backgroundColor: "#0002221A",
    opacity: 1,
    height: "inherit", // Inherit height from the root
  },
  "& .MuiSlider-track": {
    backgroundColor: "#FF9D98",
    height: "inherit",
    border: "none", // Inherit height from the root
  },
  "& .MuiSlider-thumb": {
    backgroundColor: "#FF9D98",
    color: "#FF9D98",
    "&:focus-visible": {
      outline: "none",
      boxShadow: "none",
    },
    "&:hover": {
      // Remove hover effect if it has a border
      boxShadow: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#FF9D98",
    color: theme.palette.common.white,
    "& *": {
      background: "transparent",
      color: theme.palette.common.white,
    },
  },
}));

interface StoreProfileImgprop {
  open: boolean;
  onFinish: (img: string) => void;
  onClose: () => void;
}

export default function StoreProfileImg({
  open,
  onFinish,
  onClose,
}: StoreProfileImgprop) {
  const [sliderValue, setSliderValue] = useState(1); // Zoom level (1 = 100%)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      onFinish(selectedImage);
      onClose(); // Close the backdrop after upload
    }
  };

  const displayedPercentage = Math.round((sliderValue - 1) * 100) + "%"; // Adjust percentage calculation

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={onClose} // Close on backdrop click
    >
      <div
        className="md:w-[419px] flex flex-col gap-[16px] w-full md:mx-0 mx-4 bg-white rounded-[20px] md:px-[36px] md:py-[30px] px-[18px] py-[20px]"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop close on modal content click
      >
        <p className="md:text-[24px] text-[18px] text-[#000222] font-[500] text-center">
          Upload Brand’s Logo
        </p>
        <div className="md:mx-[-36px] mx-[-18px]">
          <Divider />
        </div>

        <div className="grid grid-cols-2 gap-[7px]">
          <div className="flex flex-col text-center">
            <div className="relative flex justify-center ">
              <Image
                src={CoverNotAccepted}
                fill
                alt="CoverNotAccepted"
                className="w-full h-auto"
              />
              <i className="ri-close-large-line text-red-700 text-[73px]"></i>
            </div>
            <p className="text-[9px] font-[400] text-[#44445F]">
              Don’t upload your photograph or similar photos.{" "}
            </p>
          </div>
          <div className="flex flex-col text-center">
            <div className="relative flex justify-center ">
              <Image
                src={CoverAccepted}
                fill
                alt="CoverNotAccepted"
                className="w-full h-auto"
              />
              <i className="ri-close-large-line text-red-700 text-[73px]"></i>
            </div>
            <p className="text-[9px] font-[400] text-[#44445F]">
              Upload clean visuals that clearly portrays your business
            </p>
          </div>
        </div>
        <div className="md:mx-[-36px] mx-[-18px]">
          <Divider />
        </div>
        <div className="flex justify-center ">
          <div
            onClick={!selectedImage ? handleBrowseClick : undefined}
            className="w-[142px] relative md:h-[180px] h-[142px] md:w-[180px] rounded-full border  flex justify-center items-center  cursor-pointer"
            style={{
              backgroundImage: selectedImage
                ? `url(${selectedImage})`
                : undefined,
              backgroundSize: `${sliderValue * 100}%`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {selectedImage == null && (
              <i className="ri-landscape-fill text-slate-400 text-[100px]"></i>
            )}
            <div className="h-[28px] w-[28px] shadow-md rounded-full bg-white flex justify-center items-center absolute right-[8px] bottom-4">
              <i className="ri-camera-line text-primary text-[17px]"></i>
            </div>
          </div>
        </div>
        <div className="md:mx-[-36px] mx-[-18px]">
          <Divider />
        </div>
        <div className="flex gap-[12px] items-center w-full">
          <button
            onClick={onClose}
            className="border w-full h-[39px] border-[#000222] rounded-[8px] text-[14px] text-[#000222]"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadClick}
            className="border w-full h-[39px] bg-[#000222] rounded-[8px] text-[14px] text-white"
          >
            Upload
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </Backdrop>
  );
}
