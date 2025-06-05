import Image from "next/image";
import BannerImg from "../../../../../../public/svg/buyer-banner-img.svg";
export default function BuyerDashboardHomeBanner() {
  return (
    <div className="w-full bg-[#000222] rounded-[28px] px-[21px] py-[21px] flex gap-[141px] overflow-hidden relative ">
      <div className="flex-1">
        <p className="text-3xl font-medium text-white">Become A Seller</p>
        <p className="text-white text-[14px] font-[400] mt-2">
          Become a seller and start selling and earning on Kuve!
        </p>
        <button className="px-[36px] py-[15px] bg-primary rounded-[12px] mt-4 text-white text-[14px] font-[500]">
          GET STARTED
        </button>
      </div>
      <div className="overflow-hidden relativer">
        <Image
          src={BannerImg}
          alt="banner image "
          width={335}
          height={219}
          className="absolute right-10 top-[-16px]"
        />
      </div>
    </div>
  );
}
