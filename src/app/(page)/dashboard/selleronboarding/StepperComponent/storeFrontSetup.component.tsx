"use client";
import { useEffect, useState } from "react";
import { useCached } from "@/context/cached.context";
import ImageVector from "../../../../../../public/svg/imgvector.svg";
import Image from "next/image";
import { HttpUtilNoSecure } from "@/utils/httpNosecure.utils";
import UploadStoreCoverImg from "@/components/storeCoverModal/uploadStoreCoverModal.component";
import StoreProfileImg from "@/components/storeProfilePicture/storeProfilePicture.component";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
export default function StorefrontSetup() {
  const [selectedColor, setSelectedColor] = useState("");
  const {
    onboardingStepper,
    submitHandler,
    setSubmitHandler,
    setOnboardingStepper,
    onboardingModel,
    setOnboardingModel,
  } = useCached();
  const router = useRouter();
  const http = new HttpUtilNoSecure();
  const [allColors, setAllColors] = useState<any>([]);

  const [openCover, setOpenCover] = useState(false);
  const [coverimg, setCoverImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    onboardingModel.coverimg = coverimg;
    onboardingModel.profileImg = profileImg;
    onboardingModel.selectedColor = selectedColor;
    setOnboardingModel(onboardingModel);
    setOnboardingStepper(3);
  };

  const colors = [
    { id: 0, bg: "bg-gray-200", ring: "ring-gray-400" },
    { id: 1, bg: "bg-[#110927]", ring: "ring-black" },
    { id: 2, bg: "bg-pink-400", ring: "ring-pink-500" },
    { id: 3, bg: "bg-purple-500", ring: "ring-purple-600" },
    { id: 4, bg: "bg-indigo-600", ring: "ring-indigo-700" },
    { id: 5, bg: "bg-green-500", ring: "ring-green-600" },
  ];
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      http.get("v1/ServiceProvider/GetAllColors", {}, {}, (result: any, error: any) => {
        if (error) {
          setLoading(false);
          console.error("Error fetching users:", error);
          // Handle the error, e.g., display an error message to the user
        } else {
          setLoading(false);
          setAllColors(result);
          console.log("Users fetched successfully:", result);
          // Process the fetched user data
        }
      });
    };

    fetchData();
  }, []);
  console.log(onboardingModel);
  return (
    <div className="flex flex-col items-center gap-[15px] text-start w-full pt-4 ">
      {/* Main Content */}
      {openCover && (
        <UploadStoreCoverImg
          open={openCover}
          onFinish={(img: string) => {
            console.log(img);
            setCoverImg(img);
          }}
          onClose={() => setOpenCover(false)}
        />
      )}
      {openProfile && (
        <StoreProfileImg
          open={openProfile}
          onFinish={(img: string) => {
            console.log(img);
            setProfileImg(img);
          }}
          onClose={() => setOpenProfile(false)}
        />
      )}

      <div
        style={{
          backgroundImage: coverimg ? `url(${coverimg})` : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="rounded-[20px] flex justify-center items-center relative w-full overflow-hidden bg-[#EFEAEA] md:h-[194px] h-[150px] border border-[#A2A2A2]"
      >
        <div className="absolute z-20 bottom-[10px] left-[10px]">
          <div
            style={{
              backgroundImage: profileImg ? `url(${profileImg})` : "none",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="md:h-[105px] md:w-[105px] relative  bg-[#EFEAEA] overflow-hidden   rounded-full border border-[#A2A2A2] flex justify-center items-center h-[75.5px] w-[75.5px]"
          >
            <div
              onClick={() => setOpenProfile(true)}
              className="h-[39px] w-[39px] z-30 rounded-full flex justify-center items-center bg-[#99999C] text-white text-[16px]"
            >
              <i className="ri-camera-line"></i>
            </div>

            {profileImg.trim() == "" && (
              <div className="absolute flex justify-center bottom-[-20px] z-0">
                <Image src={ImageVector} width={132} height={88} alt="vector image" />
              </div>
            )}
          </div>
        </div>

        <div
          onClick={() => setOpenCover(true)}
          className="h-[39px] cursor-pointer w-[39px] z-30 rounded-full flex justify-center items-center bg-[#99999C] text-white text-[16px]"
        >
          <i className="ri-camera-line"></i>
        </div>

        {coverimg.trim() == "" && (
          <div className="flex justify-center">
            <Image
              src={ImageVector}
              height={404}
              width={582}
              alt="image vector"
              className="absolute md:bottom-[-170px] bottom-[-80px]"
            />
          </div>
        )}
      </div>
      <div className="w-full">
        {/* Styling Section */}
        <div className="my-10">
          <p className="mb-4 text-xs font-medium text-gray-500 uppercase">Styling</p>

          {/* Color Selection */}
          <div className="flex items-center mb-6">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 22C18 22 22.5 17.5 22.5 12C22.5 6.5 18 2 12.5 2C7 2 2.5 6.5 2.5 12C2.5 17.5 7 22 12.5 22Z"
                stroke="#AF52DE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 8V13"
                stroke="#AF52DE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.4946 16H12.5036"
                stroke="#AF52DE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="text-[14px] font-normal text-[#474747] pl-2">Store Colour</span>
            {loading ? (
              <div className="flex items-center gap-2 ml-auto">
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
              </div>
            ) : (
              <div className="flex flex-wrap ml-auto space-x-2">
                {allColors.map((color: any) => (
                  <button
                    key={color.id}
                    style={{
                      backgroundColor: color.colourCode,
                    }}
                    onClick={() => {
                      setSelectedColor(color.id);
                    }}
                    className={`w-8 h-8 rounded-full ${color.colourCode} shadow-md flex items-center justify-center ${
                      selectedColor === color.id ? `ring-2 ${color.ring}` : ""
                    }`}
                  >
                    {/*{selectedColor === color.id && (*/}
                    <svg
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.3784 5.3125C11.3784 4.08813 12.1612 3.04562 13.2534 2.65938V1.5625C13.2534 1.31386 13.3522 1.0754 13.528 0.899586C13.7038 0.723772 13.9423 0.625 14.1909 0.625C14.4396 0.625 14.678 0.723772 14.8538 0.899586C15.0296 1.0754 15.1284 1.31386 15.1284 1.5625V2.65938C15.6774 2.85306 16.1527 3.21226 16.4889 3.68744C16.8252 4.16262 17.0057 4.73039 17.0057 5.3125C17.0057 5.89461 16.8252 6.46238 16.4889 6.93756C16.1527 7.41274 15.6774 7.77194 15.1284 7.96562V16.5625C15.1284 16.8111 15.0296 17.0496 14.8538 17.2254C14.678 17.4012 14.4396 17.5 14.1909 17.5C13.9423 17.5 13.7038 17.4012 13.528 17.2254C13.3522 17.0496 13.2534 16.8111 13.2534 16.5625V7.96562C12.7048 7.77167 12.2299 7.41235 11.8941 6.93717C11.5583 6.46199 11.3781 5.89436 11.3784 5.3125ZM13.2534 5.3125C13.2534 5.56114 13.3522 5.7996 13.528 5.97541C13.7038 6.15123 13.9423 6.25 14.1909 6.25C14.4396 6.25 14.678 6.15123 14.8538 5.97541C15.0296 5.7996 15.1284 5.56114 15.1284 5.3125C15.1284 5.06386 15.0296 4.8254 14.8538 4.64959C14.678 4.47377 14.4396 4.375 14.1909 4.375C13.9423 4.375 13.7038 4.47377 13.528 4.64959C13.3522 4.8254 13.2534 5.06386 13.2534 5.3125ZM5.75342 12.8125C5.75334 12.2603 5.91581 11.7203 6.22056 11.2599C6.52532 10.7994 6.95887 10.4388 7.46717 10.2231L7.62842 10.1603V1.5625C7.62868 1.32355 7.72018 1.09372 7.88421 0.919968C8.04825 0.746216 8.27244 0.641655 8.51097 0.627651C8.74951 0.613647 8.9844 0.691257 9.16763 0.844624C9.35087 0.99799 9.46863 1.21553 9.49685 1.45281L9.50342 1.5625L9.50342 10.1594C10.0381 10.3484 10.5031 10.6945 10.8376 11.1524C11.1721 11.6104 11.3604 12.1587 11.3778 12.7255C11.3953 13.2923 11.241 13.8511 10.9353 14.3287C10.6296 14.8063 10.1867 15.1804 9.66467 15.4019L9.50342 15.4656V16.5625C9.50315 16.8014 9.41166 17.0313 9.24762 17.205C9.08359 17.3788 8.8594 17.4833 8.62086 17.4973C8.38232 17.5114 8.14744 17.4337 7.9642 17.2804C7.78096 17.127 7.6632 16.9095 7.63498 16.6722L7.62842 16.5625V15.4656C7.07983 15.2717 6.60491 14.9123 6.2691 14.4372C5.93328 13.962 5.75311 13.3944 5.75342 12.8125ZM7.62842 12.8125C7.62842 13.0611 7.72719 13.2996 7.90301 13.4754C8.07882 13.6512 8.31728 13.75 8.56592 13.75C8.81456 13.75 9.05301 13.6512 9.22883 13.4754C9.40464 13.2996 9.50342 13.0611 9.50342 12.8125C9.50342 12.5639 9.40464 12.3254 9.22883 12.1496C9.05301 11.9738 8.81456 11.875 8.56592 11.875C8.31728 11.875 8.07882 11.9738 7.90301 12.1496C7.72719 12.3254 7.62842 12.5639 7.62842 12.8125ZM0.128418 5.3125C0.128418 4.08813 0.911231 3.04562 2.00342 2.65938V1.5625C2.00342 1.31386 2.10219 1.0754 2.27801 0.899586C2.45382 0.723772 2.69228 0.625 2.94092 0.625C3.18956 0.625 3.42802 0.723772 3.60383 0.899586C3.77965 1.0754 3.87842 1.31386 3.87842 1.5625V2.65938C4.42736 2.85306 4.9027 3.21226 5.23893 3.68744C5.57516 4.16262 5.75572 4.73039 5.75572 5.3125C5.75572 5.89461 5.57516 6.46238 5.23893 6.93756C4.9027 7.41274 4.42736 7.77194 3.87842 7.96562L3.87842 16.5625C3.87842 16.8111 3.77965 17.0496 3.60383 17.2254C3.42802 17.4012 3.18956 17.5 2.94092 17.5C2.69228 17.5 2.45382 17.4012 2.27801 17.2254C2.10219 17.0496 2.00342 16.8111 2.00342 16.5625L2.00342 7.96562C1.45483 7.77167 0.979909 7.41235 0.644096 6.93717C0.308283 6.46199 0.128113 5.89436 0.128418 5.3125ZM2.00342 5.3125C2.00342 5.56114 2.10219 5.7996 2.27801 5.97541C2.45382 6.15123 2.69228 6.25 2.94092 6.25C3.18956 6.25 3.42802 6.15123 3.60383 5.97541C3.77965 5.7996 3.87842 5.56114 3.87842 5.3125C3.87842 5.06386 3.77965 4.8254 3.60383 4.64959C3.42802 4.47377 3.18956 4.375 2.94092 4.375C2.69228 4.375 2.45382 4.47377 2.27801 4.64959C2.10219 4.8254 2.00342 5.06386 2.00342 5.3125Z"
                        fill="#FFF5F5"
                      />
                    </svg>
                    {/*)}*/}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}

        <div className="gap-[12px] flex flex-col  justify-between  lg:hidden mt-[12px]  md:w-[507px] w-full ">
          <button
            onClick={handleSubmit}
            className="  rounded-[12px] w-full flex justify-center items-center h-[48px]  bg-[#000222] text-white font-[400]"
          >
            {"Continue"}
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
  );
}
