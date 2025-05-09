import Link from "next/link";
import SocialMedialFooterIcon from "./component/socialMediaIcon.component";

export default function Footer() {
  return (
    <div className="bg-black-primary w-full lg:px-[88px] lg:py-[140px] md:px-[30px] md:py-[60px]  px-4 py-[39px] flex flex-col lg:gap-[70px]  md:gap-[33px] gap-[21px]">
      <div className="grid md:grid-cols-4 grid-cols-1 lg:gap-[90px]  md:gap-[20px] gap-[30px] w-full">
        <div className="flex flex-col gap-[25px] m w-full md:order-1 order-4">
          <img
            src="/img/logo-light.svg"
            alt="logo-light"
            className="w-[127px] h-[27px]"
          />
          <p className="text-[14px] font-[400] text-white">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex items-center gap-3">
            <SocialMedialFooterIcon
              icon={<i className="ri-twitter-fill"></i>}
            />

            <SocialMedialFooterIcon
              icon={<i className="ri-facebook-fill"></i>}
            />
            <SocialMedialFooterIcon
              icon={<i className="ri-instagram-line"></i>}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-full md:order-2 order-1">
          <p className="text-[16px] font-[700] text-white">Company</p>
          <div className="flex flex-col gap-4 text-white">
            <Link href={"/"} className="text-[16px] font-[400]">
              About{" "}
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Features{" "}
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Works{" "}
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Career{" "}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-full  md:order-3 order-2">
          <p className="text-[16px] font-[700] text-white">Help</p>
          <div className="flex flex-col gap-4 text-white">
            <Link href={"/"} className="text-[16px] font-[400]">
              Customer Support
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Delivery Details
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Terms & Conditions
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-full  md:order-4 order-3">
          <p className="text-[16px] font-[700] text-white">FAQ</p>
          <div className="flex flex-col gap-4 text-white">
            <Link href={"/"} className="text-[16px] font-[400]">
              Account
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Manage Deliveries
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Orders
            </Link>
            <Link href={"/"} className="text-[16px] font-[400]">
              Payments
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:items-center md:justify-between md:flex-row mb-[30px] md:mb-0">
        <p className="text-[14px] text-white font-[400]">
          Kuve © 2025, All Rights Reserved
        </p>
        <img src="/img/payoptions.svg" />
      </div>
    </div>
  );
}
