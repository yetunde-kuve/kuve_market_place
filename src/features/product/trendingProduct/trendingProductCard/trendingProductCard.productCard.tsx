import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";

type trendingProductCardProps = {
  image?: any;
  productName?: string;
  price?: string;
};
const  TrendingProductCard: React.FC<trendingProductCardProps> = ({
      image,
      productName, price
  }) => {


  const [loved, setLoved] = useState<Boolean>(false);
  const handleLove = () => {
    setLoved(!loved);
  };
  return (
    <div className="w-[186.28px] flex flex-col md:gap-[10px] gap-[6px] rounded-[14px] px-[14px] py-[10px] md:rounded-[24px] md:w-[286.64px] xl:w-full lg:w-[286.64px] bg-white">
      <div className="relative">
        <span className="lg:w-[34px] lg:h-[34px] md:w-[32.35px] md:h-[32.45px] bg-white absolute lg:top-[7px] lg:right-[7px] top-[3.85px] right-[3.85px]  h-[20.23px] w-[20.23px] rounded-full flex justify-center items-center">
          <button
            className="flex items-center gap-1 w-[14.28px] [14.28px] lg:w-[16px] lg:h-[14px] md:w-[15.27px] md:h-[13.36px] text-gray-600 hover:text-[#FF9D98] transition-colors"
            onClick={handleLove}
            aria-label={loved ? "Unlove" : "Love"}
          >
            {loved ? (
              <FaHeart className="text-[#FF9D98]" />
            ) : (
              <FaRegHeart size={18} />
            )}
          </button>
        </span>
        <Image
          src={image}
          width={270}
          height={180}
          alt="image"
          className="md:w-[266px] rounded-[7px] md:rounded-[12px] md:h-[160px] lg:w-[305px] lg:h-[180px] w-[161px] h-[126px]"
        />
      </div>

        <div>
            <p className="text-[#000000] text-[9.52px] font-[500] md:text-[16px]">
                {productName}
            </p>
        </div>
        <div>
            <p className="text-[#535353] text-[10px] font-[500] md:text-[13px]">
                {price}
            </p>
        </div>

        </div>
    );
};

export default TrendingProductCard;
