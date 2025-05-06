import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerWidget(param: {
  id?: string;
  hint: string;
  onClick: Function;
  title?: string;
  iconClass?: string;
  type?: string;
  text?: string;
  loading?: boolean;
  noCurve?: boolean;
  value?: Date;
}) {
  let { iconClass, hint, id, title, type, loading, text, noCurve, onClick } =
    param;

  const [startDate, setStartDate] = useState(param.value ?? new Date()) as any;

  const inputId = title ?? id ?? "";
  const inputBoxId = `${inputId}box`;
  iconClass = type == "money" ? "fa-solid fa-naira-sign" : iconClass;

  return (
    <div id={inputBoxId} className="flex flex-col gap-3 w-full">
      {title && (
        <div className="flex flex-row items-center">
          <h1 className="text-md font-semibold text-white items-center justify-center">
            {`${title}`}
          </h1>
        </div>
      )}
      {/* <DatePicker className="bg-red" selected={startDate} onChange={(date) => setStartDate(date)} /> */}

      <DatePicker
        selected={startDate}
        className={`w-full flex flex-row bg-white bg-opacity-20 hover:bg-opacity-40 cursor-pointer
         text-white outline-none
        py-4 duration-300 items-center px-5 justify-center ${
          !noCurve ? "rounded-full" : "rounded-lg"
        }`}
        onChange={(date) => {
          setStartDate(date);
          onClick(date);
        }}
      ></DatePicker>
    </div>
  );
}
