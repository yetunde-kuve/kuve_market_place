"use client";
import { YMargin } from "../../../utils/widget.utils";
import { useEffect, useState } from "react";
import { GetIcon, delay } from "../../../utils/app.utils";
// @ts-ignore
import { useUtils } from "../../../context/utils.context";
import Image from "next/image";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function MessageDialog(param: MessageParam) {
  const { setShowMessageDialog } = useUtils();
  const {
    message,
    title,
    iconClass,
    icon,
    onPositiveClicked,
    autoDismiss,
    type,
    onNegativeClicked,
    positiveClickText,
    negativeClickText,
    cancellable,
  } = param.messageParam;

  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);

  useEffect(() => {
    handleTrigger();
  });

  async function handleTrigger() {
    if (triggerSet) return;
    setTriggerSet(true);
    await delay(100);
    setShowUI(true);
  }
  async function dismiss() {
    setShowUI(false);
    await delay(500);
    setShowMessageDialog(null);
  }

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center w-full h-screen duration-500">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-30 w-full h-screen duration-500 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => {
            if (cancellable) dismiss();
          }}
          style={{
            opacity: `${showUI ? 0.9 : 0}`,
          }}
        />

        <div
          className="z-40 w-full md:w-1/2 lg:w-1/3 min-w-[350px] sm:min-w-[400px]
                    mx-5 sm:mx-10
                    px-3 sm:px-6 pt-10 pb-3
                    flex flex-col 
                    justify-start items-end
                    
                    bg-white rounded-md shadow-xl duration-500 relative overflow-clip"
          style={{
            marginTop: `${showUI ? "0px" : `1000px`}`,
          }}
        >
          {/* <Image
            alt=""
            src="/img/icon.png"
            className="absolute z-0 w-10 h-10 mb-10 right-2 top-2 opacity-10"
            width={40}
            height={40}
          /> */}

          <div className="flex flex-col items-center justify-center w-full h-full">
            {icon && (
              <div
                className="flex items-center justify-center mb-6 rounded-full bg-app_color"
                style={{
                  width: 68,
                  height: 68,
                }}
              >
                <GetIcon color="white" size={25} icon={icon} />
              </div>
            )}
            {iconClass && (
              <div
                className="flex items-center justify-center mb-6 rounded-full bg-app_color"
                style={{
                  width: 68,
                  height: 68,
                }}
              >
                <i
                  className={`${iconClass} fa-xl`}
                  aria-hidden="true"
                  style={{
                    color: `white`,
                  }}
                ></i>
              </div>
            )}

            {type == 1 && (
              <Image
                alt=""
                src="/img/success.gif"
                className="z-10 mb-5"
                width={68}
                height={68}
              />
            )}
            {type == 2 && (
              <MdOutlineErrorOutline className="w-20 h-20 text-red-500 text-9xl animate-bounce" />
            )}

            {title && (
              <h1 className="z-10 mb-2 font-semibold text-center text-black text-mg">
                {title}
              </h1>
            )}
            <h1 className="z-10 text-[14px] text-black text-center mx-5">{`${message}`}</h1>

            <YMargin height={20} />
            <div className="flex flex-row flex-wrap items-center justify-center w-full gap-3">
              <button
                type="submit"
                className="w-full px-5 z-10 bg-app_color min-w-[100px] h-[40px] rounded-md text-white text-md hover:bg-app_color1 duration-500"
                onClick={() => {
                  if (autoDismiss) dismiss();
                  if (onPositiveClicked) onPositiveClicked();
                }}
              >
                {positiveClickText}
              </button>

              {negativeClickText && (
                <button
                  type="submit"
                  className="z-10 border-solid w-1/3 h-[30px] 
                  rounded-full text-red-600 text-sm 
        hover:bg-red-100 hover:border-red-400 duration-500 opacity-50"
                  onClick={() => {
                    if (autoDismiss) dismiss();
                    if (onNegativeClicked != null) {
                      onNegativeClicked();
                    }
                  }}
                >
                  {negativeClickText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface MessageParam {
  messageParam: MessageItem;
}

export class MessageItem {
  message;
  title;
  icon;
  type;
  cancellable;
  positiveClickText;
  negativeClickText;
  onPositiveClicked;
  onNegativeClicked;
  autoDismiss;
  iconClass;

  constructor({
    message,
    onPositiveClicked,
    cancellable,
    autoDismiss = true,
    positiveClickText = "Ok",
    negativeClickText = "Cancel",
    type = 0, //normal 0, success 1, failed 2
    title,
    icon,
    iconClass,
    onNegativeClicked,
  }: {
    message?: string;
    onPositiveClicked?: Function;
    cancellable?: boolean;
    autoDismiss?: boolean;
    positiveClickText?: string;
    negativeClickText?: string | null;
    type?: number;
    title?: string;
    icon?: string;
    iconClass?: string;
    onNegativeClicked?: Function;
  }) {
    this.message = message;
    this.cancellable = cancellable;
    this.autoDismiss = autoDismiss;
    this.positiveClickText = positiveClickText;
    this.onPositiveClicked = onPositiveClicked;
    this.onNegativeClicked = onNegativeClicked;
    this.negativeClickText = negativeClickText;
    // this.icon = icon
    this.title = title;
    this.icon = icon;
    this.iconClass = iconClass;
    this.type = type;
  }
}
