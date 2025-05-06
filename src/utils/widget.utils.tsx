import Image from "next/image";
import { MouseEventHandler } from "react";

import { GetIcon } from "./app.utils";
import { filterColor, white } from "./color.utils";

export function AddLine({
  height = "1px",
  color = "black",
  width = "100%",
}: {
  height?: string;
  color?: string;
  width?: string;
}) {
  return (
    <div
      style={{
        height: height,
        backgroundColor: color,
        width: width,
        opacity: 0.1,
      }}
    />
  );
}
export function AddLineWithSpace({
  height = "1px",
  color = "black",
  width = "100%",
}: any) {
  return (
    <div
      style={{
        height: height,
        backgroundColor: color,
        width: width,
        opacity: 0.2,
        marginBottom: "25px",
        marginTop: "25px",
      }}
    />
  );
}

export function YMargin({ height = "25px" }: any) {
  return (
    <div
      style={{
        height: height,
      }}
    />
  );
}

export function XMargin({ width = "25px" }: any) {
  return (
    <div
      style={{
        width: width,
      }}
    />
  );
}

export function ButtonItem(param: {
  title: string;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      type="submit"
      className="w-full bg-white text-blue3 font-bold px-5 py-2 rounded-full shadow-md border-slate-100 
        border-solid border-[1px] mb-5 duration-300 group hover:bg-slate-100 hover:shadow-sm"
      onClick={param.onClick}
    >
      <div className="flex flex-row items-center">
        <h1 className="flex-1 text-start">{param.title}</h1>
        <i
          className="fa fa-chevron-right group-hover:-translate-x-full group-hover:animate-spin"
          aria-hidden="true"
        ></i>
      </div>
    </button>
  );
}

export function SetupWidget({
  paddingTop,
  paddingLeft,
  paddingBottom,
  paddingRight,
}: {
  paddingTop?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  paddingRight?: number;
}) {
  return (
    <div
      className="fixed flex items-center justify-center w-full h-full"
      style={{
        paddingLeft: paddingLeft,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        paddingRight: paddingRight,
      }}
    >
      <LoadingWidget title="Please Wait" />
    </div>
  );
}

export function LoadingWidget(props: { title?: string }) {
  let { title } = props;
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full h-[90px] z-40 flex flex-col items-center justify-center duration-500">
          <div className="z-10 loader-6">
            <div
              id="span_a"
              className="flex flex-col justify-center item-center"
            >
              {/* <Image
                alt=""
                src={Logo}
                className="z-40 animate-bounce w-[40px] rounded-full shadow-md
                ml-[9px]
                border-slate-100 border-2"
                width={40}
                height={40}
              /> */}
            </div>
          </div>
        </div>
        {title && (
          <h1 className="ml-3 text-sm text-center text-slate-500">
            {title ?? ""}
          </h1>
        )}
      </div>
    </>
  );
}

export function EmtpyWidget(props: {
  title: string;
  message?: string;
  icon?: string;
  retryText?: string;
  retryClicked?: Function;
}) {
  let { title, icon, retryText, retryClicked, message } = props;
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full p-5 bg-white rounded-xl">
          <YMargin />
          {
            <div className="rounded-full bg-slate-100 p-[20px] flex items-center justify-center">
              <GetIcon icon={icon ?? "info"} size={40} color="black" />
            </div>
          }
          <YMargin />
          <h1 className="mt-2 text-sm text-center text-black">{title}</h1>
          {message && (
            <h1 className="mt-2 text-[12px] text-black opacity-50 text-center">
              {message}
            </h1>
          )}
          {/* <YMargin /> */}
          {/* {retryClicked != null && <AddLine />} */}
          {retryClicked != null && (
            // <MyButton
            //   title={retryText ?? "Retry"}
            //   onClick={() => {
            //     if (retryClicked != null) retryClicked();
            //   }}
            // />
            <div className="w-full flex flex-col items-center justify-center mt-[10px]">
              <button
                type="submit"
                className="font-semibold underline w-full h-[40px] rounded-lg text-app_color text-[14px] hover:text-app_color1 duration-500"
                onClick={() => {
                  if (retryClicked != null) retryClicked();
                }}
              >
                {retryText ?? "Retry"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function CheckBox({ selected }: { selected: boolean }) {
  return (
    <div className="w-[30px] h-[30px] rounded-full border-solid border-[2px] border-black border-opacity-30 flex items-center justify-center">
      <div
        className="w-[20px] h-[20px] rounded-full duration-500"
        style={{
          backgroundColor: selected
            ? "var(--dark_green0)"
            : "var(--default_white)",
        }}
      ></div>
    </div>
  );
}

export function CheckBox2({
  selected,
  iconColor,
  icon,
}: {
  selected: boolean;
  iconColor: string;
  icon: string;
}) {
  return (
    <div
      className="w-[25px] h-[25px] rounded-full border-solid border-[2px]
     border-black border-opacity-30 flex items-center justify-center"
    >
      <div
        className="w-[20px] h-[20px] rounded-full duration-500"
        style={{
          backgroundColor: selected ? iconColor : "var(--default_white)",
        }}
      >
        {selected && <GetIcon color="white" icon={icon} size={20} />}
      </div>
    </div>
  );
}

export function LoadingBar({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <div
      className={`w-full ${fullscreen ? "h-screen" : "h-full"} items-center justify-center flex`}
    >
      <div className="flex flex-col items-center justify-center gap-1 w-fit h-fit">
        {/* <Image
          alt=""
          src="/img/icon.png"
          className="z-40 animate-bounce"
          width={40}
          height={40}
          priority
          onError={() => <div></div>}
        /> */}
        <i className="circle_loader w-[15px] h-[15px] mb-16"></i>
      </div>
    </div>
  );
}

export function ImageItem({
  title,
  image,
  onClick,
}: {
  title: string;
  image: any;
  onClick: Function;
}) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2">
      <h1 className="">{title}</h1>
      <a
        href={image}
        target="_blank"
        rel="noreferrer"
        className="p-1 bg-slate-100 w-[120px] h-[120px] 
  rounded-lg
overflow-clip flex items-center justify-center cursor-pointer hover:opacity-75"
        onClick={() => {
          onClick();
        }}
      >
        <Image
          className="rounded-lg"
          src={
            image.length == 0
              ? "/img/ic_user.png"
              : image.startsWith("http")
                ? image
                : `data:image/png;base64,${image}`
          }
          alt={``}
          width={image.length == 0 ? 40 : 120}
          height={image.length == 0 ? 40 : 120}
        />
      </a>
    </div>
  );
}

export function CheckWidget({
  title,
  message,
  checked,
  onClick,
  recommended,
  child,
}: {
  title: string;
  message: string;
  checked: boolean;
  onClick: Function;
  recommended?: boolean;
  child?: any;
}) {
  return (
    <div
      className="w-full flex flex-col rounded-md border-[1px] border-opacity-10 
  border-black px-3 py-2 gap-2 cursor-pointer hover:bg-slate-100"
      onClick={() => {
        onClick();
      }}
    >
      <div className="flex flex-row items-center justify-center w-full gap-2">
        <div className="flex flex-col items-start justify-center flex-1 w-full">
          <h1 className="text-sm font-semibold">{title}</h1>
          <p className="text-[12px] opacity-50 mt-1">{message}</p>
          {recommended && (
            <p
              className=" font-normal text-[12px] mt-2
            text-white rounded-md px-2 py-1 bg-blue0 flex items-center justify-center"
            >
              <span
                className="mr-1 duration-500 cursor-pointer material-icons"
                style={{
                  fontSize: 15,
                  color: "white",
                }}
              >
                {"star"}
              </span>
              <span className="font-semibold">Recommended</span>
            </p>
          )}
        </div>
        <span
          className="w-[20px] h-[20px] rounded-full border-[1px] border-slate-300 
        bg-slate-100 items-center justify-center flex duration-500"
        >
          {
            <span
              className="duration-500 cursor-pointer material-icons"
              style={{
                fontSize: 18,
                color: `var(--app_color)`,
                opacity: checked ? 1 : 0,
              }}
            >
              {"check_circle"}
            </span>
          }
        </span>
      </div>
      {child}
    </div>
  );
}

export function FilterWidget({
  icon,
  image,
  title,
  dark = false,
  onClick,
}: {
  icon: string;
  image?: string;
  title: string;
  dark?: boolean;
  onClick: Function;
}) {
  return (
    <button
      className="flex flex-row items-center justify-center gap-2 
  pl-[10px] pr-[5px] py-[5px]
  border-[1px] rounded-[5px] border-black border-opacity-10"
      onClick={() => {
        onClick();
      }}
      style={{
        backgroundColor: dark ? "var(--app_color)" : "white",
      }}
    >
      {!image && (
        <GetIcon size={14} color={dark ? "white" : "app_color"} icon={icon} />
      )}
      {image && (
        <Image
          alt=""
          src={image}
          width={14}
          height={14}
          style={{
            filter: `${filterColor(white)}`,
          }}
        />
      )}
      <h1
        className="maxline1 text-[12px]"
        style={{
          color: `${dark ? "white" : "app_color"}`,
        }}
      >
        {title}
      </h1>
      <GetIcon
        color={dark ? "white" : "app_color"}
        icon="arrow_drop_down"
        size={20}
      />
    </button>
  );
}
