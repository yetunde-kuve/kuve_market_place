import { ReactNode } from "react";

type sliderButtonprops = {
  onClick: () => void;
  icon: ReactNode;
};
export default function SliderButton({ onClick, icon }: sliderButtonprops) {
  return (
    <button
      onClick={onClick}
      className="lg:h-[86px]  text-[#008ECC] flex justify-center items-center lg:w-[86px] bg-complementry-shade2 lg:border-[8px] md:border-[5.5px] border-[3.62px]  rounded-full md:w-[66px] md:h-[66px]  w-[30px] h-[30px]"
    >
      {icon}
    </button>
  );
}
