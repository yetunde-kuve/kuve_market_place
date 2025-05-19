import React, { useState } from 'react';
import {FaHeart, FaRegHeart} from "react-icons/fa";
import Image from "next/image";
import DefaultImage from "../../../../../public/img/productdefaultimg.png";

type trendingProductCardProps = {
    image?: string;
    productName?: string;
};
const  TrendingProductCard: React.FC<trendingProductCardProps> = ({
      image,
      productName
  }) => {

    const isValidImage = typeof image === "string" && image.trim() !== "";


    const [loved, setLoved] = useState<Boolean>(false);
    const handleLove = () => {
        setLoved(!loved);
    }
    return (
        <div className="w-[178.85px] h-[168.37px] flex flex-col md:gap-[16px] gap-[9.52px] rounded-[14px] pt-[15px] px-[15px] md:rounded-[24px] lg:w-[300px] lg:h-[250px] md:w-[286.64px] md:h-[246.91px] bg-white">
            <div className="relative">
                <span className="lg:w-[34px] lg:h-[34px] md:w-[32.35px] md:h-[32.45px] bg-white absolute lg:top-[7px] lg:right-[7px] top-[3.85px] right-[3.85px]  h-[20.23px] w-[20.23px] rounded-full flex justify-center items-center">
                  <button
                      className="flex items-center gap-1 w-[14.28px] [14.28px] lg:w-[16px] lg:h-[14px] md:w-[15.27px] md:h-[13.36px] text-gray-600 hover:text-red-600 transition-colors"
                      onClick={handleLove}
                      aria-label={loved ? "Unlove" : "Love"}
                  >
                    {loved ? (
                        <FaHeart className="text-red-600" />
                    ) : (
                        <FaRegHeart size={18} />
                    )}
                  </button>
                </span>
                <Image
                    src={isValidImage ? image! : DefaultImage}
                    width={270}
                    height={180}
                    alt="image"
                    className="md:w-[266px] rounded-[7px] md:rounded-[12px] md:h-[160px] lg:w-[270px] lg:h-[180px] w-[161px] h-[126px]"
                />
            </div>

            <div>
                <p className="text-[#000000]  text-[12px] font-[500] md:text-[16px]">
                    {productName}
                </p>
            </div>

        </div>
    );
};

export default TrendingProductCard