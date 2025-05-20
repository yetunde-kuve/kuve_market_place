import { Backdrop, Slide } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

interface SucessfullDialogprop {
  open: boolean;
  message?: string;
  onClose?: () => void;
  status?: boolean;
}

export default function SucessfullDialog({
  open,
  message,
  onClose,
  status,
}: SucessfullDialogprop) {
  const containerRef = useRef(null);

  return (
    <Backdrop
      open={open}
      sx={{
        backgroundColor: "transparent", // remove the dark overlay
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Slide
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
        container={containerRef.current}
      >
        <div
          ref={containerRef}
          className="bg-white rounded-xl p-4 flex flex-col gap-2 items-center md:w-[400px] w-full md:mx-0 mx-4 shadow-xl"
        >
          <div className="flex justify-end w-full">
            <i
              onClick={() => {
                onClose?.();
              }}
              className="cursor-pointer ri-close-line text-slate-600"
            ></i>
          </div>
          {status ? (
            <i className="ri-checkbox-circle-fill text-green-600 text-[54px]"></i>
          ) : (
            <i className="ri-close-circle-fill text-red-700 text-[54px]"></i>
          )}
          {message && (
            <p className="text-[14px] text-slate-600 text-center">{message}</p>
          )}
        </div>
      </Slide>
    </Backdrop>
  );
}
