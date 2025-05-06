import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// @ts-ignore

import Image from "next/image";
import { YMargin } from "../../utils/widget.utils";
import { delay } from "../../utils/app.utils";
import { useUtils } from "@/context/utils.context";

export default function DateDialog(param: {
  value: any;
  onComplete: Function;
}) {
  const [date, setDate] = useState(param.value ?? new Date());
  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);
  const { showPopup } = useUtils();

  useEffect(() => {
    handleTrigger();
  }, [triggerSet, showUI]);

  async function handleTrigger() {
    if (triggerSet) return;
    setTriggerSet(true);
    await delay(100);
    setShowUI(true);
  }
  async function dismiss(amountValue?: any) {
    setShowUI(false);
    await delay(500);
    param.onComplete(amountValue);
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center w-screen h-screen duration-500">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-30 w-screen h-screen duration-500 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => {
          dismiss();
        }}
        style={{
          opacity: `${showUI ? 0.9 : 0}`,
        }}
      />

      <div
        className="z-40 w-full md:w-1/2 lg:w-1/3 min-w-[350px] sm:min-w-[400px]
                    mx-5 sm:mx-10
                    p-6 sm:p-10
                    flex flex-col 
                    justify-start items-end select-none
                    bg-white rounded-xl shadow-xl duration-500 relative"
        style={{
          marginTop: `${showUI ? "0px" : `1000px`}`,
        }}
      >
        <Image
          alt=""
          src="/img/icon.png"
          className="absolute z-0 w-10 h-10 mb-10 right-2 top-2 opacity-10"
          width={40}
          height={40}
        />

        <button
          type="button"
          className="left-2 top-2 absolute fa-solid fa-close fa-1x rounded-full bg-white
  
  p-2 w-[40px] h-[40px]"
          style={{ color: `red` }}
          onClick={() => {
            dismiss();
          }}
        ></button>

        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl font-bold text-black">Select Date</h1>
          <YMargin />
          <Calendar
            onChange={(date: any) => {
              setDate(date);
              // showPopup(date);
              // console.log(`${date.getTime()}`);
            }}
            value={date}
          />
          <YMargin />
          <button
            type="button"
            className="px-5 py-2 text-lg font-bold text-black duration-300 rounded-lg bg-dark_green0 hover:opacity-80"
            onClick={() => {
              dismiss(date);
            }}
          >
            <p
              className={`text-lg font-bold`}
              style={{
                color: `white`,
              }}
            >
              Proceed
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
