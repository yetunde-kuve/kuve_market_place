import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import DefaultImage from "../../../../../public/img/productdefaultimg.png";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type PopularProductCardProps = {
  image?: any;
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
    <div className="w-[186.28px] flex flex-col md:gap-[10px] gap-[6px] rounded-[14px] p-4 md:rounded-[24px] md:w-[298px] xl:w-full lg:w-full bg-white">
      <div className="relative">
        <span className="md:w-[24px] z-50 shadow-md bg-white absolute lg:top-[16px] lg:right-[7px] top-[7.85px] right-[5.85px] md:h-[24px] h-[18px] w-[18px] rounded-full flex justify-center items-center">
          <i className="ri-verified-badge-fill text-primary text-[13px] md:text-[17px]"></i>
        </span>
        <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden">
          <Image src={image} alt="product" fill className="object-contain" />
        </div>
      </div>
      <div className="flex gap-[12px] items-center">
        <div className="h-[30px] w-[30px] md:h-[48px] md:w-[48px] rounded-full bg-gray-100 flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden rounded-full">
            <Image src={image} alt="avatar" fill className="object-cover" />
          </div>
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
