import Image from "next/image";
import { formatNaira } from "@/utils/app.utils";
interface CartProductHoverCardprop {
  img: string;
  title?: string;
  quantity?: number;
  price?: number;
}
export default function CartProductHoverCard({
  img,
  title,
  quantity,
  price,
}: CartProductHoverCardprop) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative h-[80px] w-[80px] flex-shrink-0 border border-[#E4E7E9] rounded-md overflow-hidden">
        <Image
          src={img}
          alt="Canon EOS 1500D"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 80px"
        />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-[#828294] text-[14px] font-[400] leading-tight">
          {title}
        </p>
        <p className="text-[#5F6C72] text-[14px] font-[400]">
          {quantity}X{" "}
          <span className="text-[#000222] font-[600]">
            {formatNaira(Number(price))}
          </span>
        </p>
      </div>
    </div>
  );
}
