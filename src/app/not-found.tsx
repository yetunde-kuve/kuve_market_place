"use client";
import NotfoundImg from "../../public/svg/404.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="md:w-[400px] lg:w-[400px] w-full flex flex-col justify-center items-center ">
        <Image src={NotfoundImg} height={300} width={300} alt="404" />
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <p className="text-[36px] font-[600] text-[#191C1F] text-center">Page not found!</p>
          <p className="text-[16px] tex-[#475156] text-center">
            Oops! Something went wrong. It’s look like the page you requested could not be
            found.{" "}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                router.back();
              }}
              className="px-[24px] flex justify-center items-center gap-[8px] py-[14px] rounded-[16px] bg-primary  text-[14px] font-[700] text-white"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.375 10H3.625"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.25 4.375L3.625 10L9.25 15.625"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Go Back
            </button>
            <button
              onClick={() => {
                router.push("/");
              }}
              className="px-[24px] flex justify-center items-center gap-[8px] py-[14px] rounded-[16px] border border-primary  text-[14px] font-[700] text-primary"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.375 16.25V12.5C12.375 12.3342 12.3092 12.1753 12.1919 12.058C12.0747 11.9408 11.9158 11.875 11.75 11.875H9.25C9.08424 11.875 8.92527 11.9408 8.80806 12.058C8.69085 12.1753 8.625 12.3342 8.625 12.5V16.25C8.625 16.4157 8.55915 16.5747 8.44194 16.6919C8.32473 16.8091 8.16576 16.875 8 16.875H4.25C4.08424 16.875 3.92527 16.8091 3.80806 16.6919C3.69085 16.5747 3.625 16.4157 3.625 16.25V9.02342C3.6264 8.93693 3.64509 8.85159 3.67998 8.77242C3.71486 8.69326 3.76523 8.62188 3.82812 8.56248L10.0781 2.8828C10.1933 2.77739 10.3438 2.71893 10.5 2.71893C10.6562 2.71893 10.8067 2.77739 10.9219 2.8828L17.1719 8.56248C17.2348 8.62188 17.2851 8.69326 17.32 8.77242C17.3549 8.85159 17.3736 8.93693 17.375 9.02342V16.25C17.375 16.4157 17.3092 16.5747 17.1919 16.6919C17.0747 16.8091 16.9158 16.875 16.75 16.875H13C12.8342 16.875 12.6753 16.8091 12.5581 16.6919C12.4408 16.5747 12.375 16.4157 12.375 16.25Z"
                  stroke="#FF9D98"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Go To home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
