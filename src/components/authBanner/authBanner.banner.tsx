import React from "react";
import Image from "next/image";

const AuthBannerBanner = () => {
  return (
      <div className="hidden lg:flex lg:w-full relative w-[709px] text-white m-3">
        <div className="absolute inset-0">
          <Image
              src="/img/banner-bg.png"
              alt="Shopping carts background"
              layout="fill"
              objectFit="cover"
              className="rounded-[35px]"
          />
        </div>

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30 rounded-[35px]"></div>

        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Top section with AI POWERED MARKETPLACE */}
          <div className="pt-12 pl-12">
            <div className="flex items-center gap-4">
              <p className="text-[15.56px] font-normal tracking-[0.1em]">
                AI POWERED MARKETPLACE
              </p>
              <div className="w-[145px] h-[1px] bg-white"></div>
            </div>
          </div>

          {/* Bottom section with main content */}
          <div className="flex-1 flex flex-col justify-end pb-12 pl-12">
            <h1 className="text-[64px] leading-[72px] font-light mb-6">
              Get
              <br />
              Everything
              <br />
              you want!
            </h1>
            <p className="text-[15.56px] leading-[24px] font-normal opacity-90">
              You can get everything you want if you work
              <br />
              hard, trust the process, and stick to the plan.
            </p>
          </div>
        </div>
      </div>
  );
};

export default AuthBannerBanner;