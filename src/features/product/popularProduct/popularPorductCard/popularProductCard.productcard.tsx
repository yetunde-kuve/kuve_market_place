import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import DefaultImage from "../../../../../public/img/productdefaultimg.png";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type PopularProductCardProps = {
  image?: string;
  title?: string;
  location?: string;
};

export default function PopularProductCard({
  image,
  title = "Product One",
  location = "Ikoyi, Lagos",
}: PopularProductCardProps) {
  const isValidImage = typeof image === "string" && image.trim() !== "";

  return (
    <div className="w-[186.28px] flex flex-col md:gap-[10px] gap-[6px] rounded-[14px] p-4 md:rounded-[24px] md:w-[298px] lg:w-full bg-white">
      <div className="relative">
        <span className="md:w-[24px] bg-white absolute lg:top-[7px] lg:right-[7px] top-[3.85px] right-[3.85px] md:h-[24px] h-[18px] w-[18px] rounded-full flex justify-center items-center">
          <i className="ri-verified-badge-fill text-primary text-[13px] md:text-[17px]"></i>
        </span>
        <Image
          src={isValidImage ? image! : DefaultImage}
          width={266}
          height={160}
          alt="product"
          className="md:w-[266px] rounded-[7px] md:rounded-[12px] md:h-[160px] lg:w-full lg:h-[160px] w-[154px] h-[100px] object-cover"
        />
      </div>
      <div className="flex gap-[12px] items-center">
        <div className="h-[30px] w-[30px] md:h-[48px] md:w-[48px] overflow-hidden flex justify-center items-center rounded-full">
          <Image
            src={isValidImage ? image! : DefaultImage}
            alt="avatar"
            height={48}
            width={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p
            className={`${bricolage.className} text-text text-[12px] font-[700] md:text-[20px]`}
          >
            {title}
          </p>
          <p className="text-[7.36px] text-text-secondary font-[400] md:text-[12px]">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
