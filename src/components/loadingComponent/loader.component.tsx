import { Backdrop } from "@mui/material";
import LOGOK from "../../../public/svg/logoK.svg";
import Image from "next/image";
interface FullPageLoaderprops {
  open: boolean;
}
export default function FullPageLoader({ open }: FullPageLoaderprops) {
  return (
    <>
      <Backdrop
        open={open}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <span className=" animate-bounce h-[48px] w-[48px] rounded-full bg-white flex justify-center items-center">
          <Image
            src={LOGOK}
            height={30}
            width={30}
            alt="logo"
            className="animate-pulse loader "
          />
        </span>
      </Backdrop>
    </>
  );
}
