"use client";
import { Backdrop, Divider } from "@mui/material";
import CoverNotAccepted from "../../../public/svg/covernotaccepted.svg";
import CoverAccepted from "../../../public/svg/coveraccepted.svg";
import Image from "next/image";
import { useState, useRef, useEffect } from "react"; // Import useEffect for potential future preview consistency
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

interface UploadStoreCoverImgprop {
  open: boolean;
  onFinish: (img: string) => void;
  onClose: () => void;
}

export default function UploadStoreCoverImg({
  open,
  onFinish,
  onClose,
}: UploadStoreCoverImgprop) {
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
        setSliderValue(1); // Reset zoom to 1 when a new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = () => {
    if (selectedImage && previewRef.current) {
      const preview = previewRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      img.onload = () => {
        const zoom = sliderValue; // Current zoom level from the slider
        const previewWidth = preview.offsetWidth; // Width of the preview container
        const previewHeight = preview.offsetHeight; // Height of the preview container
        const imgWidth = img.width; // Original width of the selected image
        const imgHeight = img.height; // Original height of the selected image

        // Set canvas dimensions to match the preview container's dimensions
        canvas.width = previewWidth;
        canvas.height = previewHeight;

        // Calculate aspect ratios
        const imgAspectRatio = imgWidth / imgHeight;
        const previewAspectRatio = previewWidth / previewHeight;

        let sWidth, sHeight, sx, sy; // Source rectangle parameters (from original image)

        // Determine the source rectangle dimensions based on zoom and aspect ratios.
        // This ensures the cropped area maintains the preview's aspect ratio
        // and then scales according to the zoom.
        if (imgAspectRatio > previewAspectRatio) {
          // If the image is wider relative to its height than the preview area.
          // Fit by height, then calculate source width to match preview aspect ratio.
          sHeight = imgHeight / zoom;
          sWidth = sHeight * previewAspectRatio;
          // If sWidth exceeds imgWidth after this, it means zoom is too low
          // or image is not wide enough. Adjust sWidth to imgWidth and recalculate sHeight.
          if (sWidth > imgWidth) {
            sWidth = imgWidth;
            sHeight = sWidth / previewAspectRatio;
          }
        } else {
          // If the image is taller relative to its width than the preview area, or same aspect ratio.
          // Fit by width, then calculate source height to match preview aspect ratio.
          sWidth = imgWidth / zoom;
          sHeight = sWidth / previewAspectRatio;
          // If sHeight exceeds imgHeight after this, it means zoom is too low
          // or image is not tall enough. Adjust sHeight to imgHeight and recalculate sWidth.
          if (sHeight > imgHeight) {
            sHeight = imgHeight;
            sWidth = sHeight * previewAspectRatio;
          }
        }

        // Calculate source X and Y coordinates to center the cropped area within the original image.
        sx = (imgWidth - sWidth) / 2;
        sy = (imgHeight - sHeight) / 2;

        // Clamp sx and sy to ensure they are not negative and do not go out of bounds.
        // This makes the cropping robust against edge cases.
        sx = Math.max(0, sx);
        sy = Math.max(0, sy);
        sx = Math.min(sx, imgWidth - sWidth);
        sy = Math.min(sy, imgHeight - sHeight);

        // Draw the image onto the canvas:
        // img: The image to draw
        // sx, sy, sWidth, sHeight: Source rectangle (portion of the image to crop from the original image)
        // 0, 0, previewWidth, previewHeight: Destination rectangle (where to draw on the canvas, filling it)
        ctx?.drawImage(
          img,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          previewWidth,
          previewHeight
        );

        const croppedBase64 = canvas.toDataURL("image/jpeg"); // Get the cropped image as a JPEG Data URL
        onFinish(croppedBase64); // Pass the cropped image to the parent component
        onClose(); // Close the backdrop after upload
      };
      img.src = selectedImage; // Set the image source to trigger the onload event
    } else {
      // Handle case where no image is selected without using alert()
      console.log("Please select an image first.");
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
          Upload Store Banner
        </p>
        <div className="md:mx-[-36px] mx-[-18px]">
          <Divider />
        </div>

        <div className="grid grid-cols-2 gap-[7px]">
          <div className="flex flex-col text-center">
            <div className="flex justify-center ">
              <Image
                src={CoverNotAccepted}
                width={160}
                height={69}
                alt="CoverNotAccepted"
                className="w-full h-auto"
              />
              {/* <i className="ri-close-large-line text-red-700 text-[73px]"></i> */}
            </div>
            <p className="text-[9px] font-[400] text-[#44445F]">
              Don’t upload your photograph or similar photos.{" "}
            </p>
          </div>
          <div className="flex flex-col text-center">
            <div className="flex justify-center ">
              <Image
                src={CoverAccepted}
                width={160}
                height={69}
                alt="CoverNotAccepted"
                className="w-full h-auto"
              />
              {/* <i className="ri-close-large-line text-red-700 text-[73px]"></i> */}
            </div>
            <p className="text-[9px] font-[400] text-[#44445F]">
              Upload clean visuals that clearly portrays your business
            </p>
          </div>
        </div>
        <div>
          <div
            ref={previewRef}
            onClick={!selectedImage ? handleBrowseClick : undefined}
            className="w-full md:h-[200.55px] h-[148.13px] rounded-[20px] border border-slate-300 flex justify-center items-center overflow-hidden cursor-pointer"
            style={{
              backgroundImage: selectedImage
                ? `url(${selectedImage})`
                : undefined,
              backgroundSize: `${sliderValue * 100}%`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {!selectedImage && (
              <p className="text-gray-500">Click to browse image</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[12px] font-[500] text-[#060619]">
              {displayedPercentage}
            </p>
            <CustomSlider // Using your CustomSlider here!
              aria-label="Zoom"
              min={1}
              max={2}
              step={0.05}
              defaultValue={1} // Keep defaultValue, but sliderValue state is the source of truth
              value={sliderValue} // Control the slider with state
              onChange={handleSliderChange}
            />
            <p className="text-[9px] font-[500] text-[#060619]">100%</p>
          </div>
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
