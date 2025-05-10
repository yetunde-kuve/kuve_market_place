import Image from "next/image";
import CountdownTimer from "./component/countDown.component";
import Button from "@/components/widgets/Button.widget";

export default function FutureProduct() {
  return (
    <div className="relative bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#000222_0%,#292B47_100%)] md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
      <p className="text-white font-[600] text-[11px] absolute top-4 right-4">
        Featured Post
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
        <div className="flex flex-col gap-4">
          <p className="text-[11px] text-primary font-[400]">
            Bluetooth Speaker
          </p>
          <p className="text-[16px] font-[600] text-white">$300</p>
          <h2 className="text-[20px]  md:text-[34px] text-white lg:text-[48px] font-[700]">
            Enhance Your Music Experience
          </h2>
          <div>
            <CountdownTimer />
          </div>
          <div className="w-[127px]">
            <Button size="medium" color="pink">
              Buy Now
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={"/img/jbl.png"}
            className="lg:h-[330px] lg:w-[568px]  md:w-[330px] md:h-[195px] w-full h-auto"
            alt="product"
            width={568}
            height={330}
          />
        </div>
      </div>
    </div>
  );
}
