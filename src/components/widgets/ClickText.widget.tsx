import { useEffect, useState } from "react";

export default function ClickText(param: {
  id?: string;
  hint: string;
  onClick: Function;
  title?: string;
  iconClass?: string;
  type?: string;
  // text?: string;
  value?: string;
  loading?: boolean;
  noCurve?: boolean;
}) {
  let {
    iconClass,
    hint,
    id,
    title,
    type,
    loading,
    // text,
    noCurve,
    onClick,
    value,
  } = param;

  noCurve = noCurve ?? true;
  const inputId = title ?? id ?? "";
  const inputBoxId = `${inputId}box`;
  iconClass = type == "money" ? "fa-solid fa-naira-sign" : iconClass;

  return (
    <div id={inputBoxId} className="flex flex-col gap-3 w-full">
      {title && (
        <div className="flex flex-row items-center">
          <h1 className="text-[14px] text-black items-center justify-center">
            {`${title}`}
          </h1>
        </div>
      )}
      <div
        className={`w-full flex flex-row ${
          value == null ? "bg-white" : "bg-white"
        } ${
          value == null ? "bg-opacity-100" : "bg-opacity-100"
        } hover:bg-opacity-40 cursor-pointer
      h-[50px] duration-300 items-center px-5 justify-center ${
        !noCurve ? "rounded-full" : "rounded-lg"
      } border-solid border-opacity-10 border-black border-[1px] 
      shadow-sm hover:shadow-none duration-500`}
        onClick={() => {
          onClick();
        }}
      >
        {iconClass && (
          <i
            className={iconClass}
            aria-hidden="true"
            style={{
              color: `var(--dark_green0)`,
            }}
          ></i>
        )}
        {iconClass && <i className="mr-4"></i>}
        {!value && (
          <p className={`w-full flex-1 text-slate-400 duration-500`}>{hint}</p>
        )}
        {/* {text && (
          <p className={`w-full flex-1 text-black duration-500`}>{text}</p>
        )} */}
        {value && (
          <p className={`w-full flex-1 text-black duration-500`}>{value}</p>
        )}

        {value && (
          <i
            className={`fa-solid fa-circle-check fa-xl`}
            aria-hidden="true"
            style={{
              color: `white`,
            }}
          ></i>
        )}
        {loading && <i className="circle_loader ml-3"></i>}
      </div>
    </div>
  );
}
