import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { FaApple, FaShoppingCart } from "react-icons/fa";
import Watch from "../../../../../public/svg/watch.svg";

export default function SearchProductBanner() {
  return (
    <div className="max-w-sm mx-auto w-full bg-[#FFF5F5] p-4   flex flex-col items-center text-center space-y-4">
      <Image
        src={Watch}
        alt="Apple Watch Series 7"
        width={200}
        height={200}
        className="rounded-md"
      />

      <div>
        <h3 className="flex items-center justify-center gap-1 text-xl font-bold text-black">
          <FaApple /> WATCH
        </h3>
        <p className="text-sm tracking-wide font-[600] uppercase text-primary">Series 7</p>
      </div>

      <p className="text-[24px] font-[600] text-[#191C1F]">
        Heavy on Features. <br /> Light on Price.
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        Only for:
        <div className="px-3 text-[#191C1F] py-1 font-semibold text-black bg-yellow-300 rounded">
          $299 USD
        </div>
      </div>

      <button className="w-full bg-[#0C0C22] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all">
        <FaShoppingCart size={16} />
        ADD TO CART
      </button>

      <button className="w-full border border-[#FF8F8F] text-[#FF8F8F] py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#ff8f8f]/10 transition-all">
        VIEW DETAILS <BsArrowRight size={16} />
      </button>
    </div>
  );
}
