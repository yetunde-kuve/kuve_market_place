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
      <div className="relative z-10 flex flex-col justify-end p-12">
        <div className="absolute top-12 left-12">
          <div>
            <p className="text-[15.56px] font-normal">AI POWERED MARKETPLACE</p>
            <Image
              src="/img/Line 6.png"
              alt="line"
              objectFit="cover"
              width={145.83}
              height={0.57}
            />
          </div>
        </div>
        <h1 className="text-6xl font-normal mb-6">
          Get
          <br />
          Everything
          <br />
          you want!
        </h1>
        <p className="text-[15.56px]">
          You can get everything you want if you work
          <br /> hard, trust the process, and stick to the plan.
        </p>
      </div>
    </div>
  );
};

export default AuthBannerBanner;
