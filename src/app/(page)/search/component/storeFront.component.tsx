import Image from "next/image";

interface SearchStoreFrontprop {
  img: string;
  name: string;
  address: string;
  isVerified: boolean;
}
export default function SearchStoreFront({ img, name, address, isVerified }: SearchStoreFrontprop) {
  return (
    <div className="w-full rounded-[24px] p-4 flex items-center gap-[12px] bg-white">
      <div className="relative h-[56px] w-[56px] flex justify-center items-center">
        {isVerified && (
          <div className="h-[24px] top-[-3px] right-[-3px] absolute z-40 bg-white w-[24px] rounded-full border border-primary flex justify-center items-center text-primary text-[17px]">
            <i className="ri-verified-badge-fill"></i>
          </div>
        )}
        <div className="relative h-[56px] w-[56px] rounded-full overflow-hidden">
          <Image src={img} fill alt="storeFront" objectFit="cover" priority={true} />
        </div>
      </div>

      <div>
        <p className="text-[16px] font-[700]  text-#060619]">{name}</p>
        <p className="text-[14px] font-[400] text-[#44445F]">{address}</p>
      </div>
    </div>
  );
}
