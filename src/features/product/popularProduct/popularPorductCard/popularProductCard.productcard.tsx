import Image from "next/image";
type popularPorductCardprops = {
  image?: string;
  title?: string;
  location?: string;
};
export default function PopularProductCard({
  image = "img/productDefaultimg.png",
  title = "Product One",
  location = " Ikoyi, Lagos",
}) {
  return (
    <div className="w-[186.28px] h-[168.25px] flex flex-col md:gap-[10px] gap-[6px] rounded-[14px] p-4 md:rounded-[24px] md:w-[298px] md:h-[250px] bg-white">
      <div className="relative">
        <span className="md:w-[24px] bg-white absolute lg:top-[7px] lg:right-[7px] top-[3.85px] right-[3.85px] md:h-[24px]  h-[18px] w-[18px] rounded-full flex justify-center items-center">
          <i className="ri-verified-badge-fill text-primary text-[13px] md:text-[17px]"></i>
        </span>
        <img
          src={image}
          width={266}
          height={160}
          alt="image"
          className="md:w-[266px] rounded-[7px] md:rounded-[12px] md:h-[160px] lg:w-[266px] lg:h-[160px] w-[154px] h-[100px]"
        />
      </div>
      <div className="flex gap-[12px] items-center">
        <div className="h-[30px] w-[30px] md:h-[48px] md:w-[48px] overflow-hidden flex justify-center items-center rounded-full">
          <img src={image} alt="image" className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="text-text  text-[12px] font-[700] md:text-[24px]">
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
