import Image from "next/image";
import EmptyImg from "../../../../public/svg/emptyImg.svg";
export default function EmptyWishhListWidget() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <p className="text-[14px] text-[#111928] font-[600]">WISHLIST</p>
        <p className="text-[14px] text-[#6B7280] font-[400]">
          Your wishlist is empty
        </p>
      </div>
      <div>
        <Image src={EmptyImg} height={90} width={90} alt="empty state" />
      </div>
    </div>
  );
}
