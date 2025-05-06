import { GetIcon } from "../../utils/app.utils";
import { YMargin } from "../../utils/widget.utils";

export default function InfoBox({
  title,
  message,
  positiveText,
  positiveClick,
  negativeText,
  negativeClick,
  icon,
}: {
  icon?: string;
  title: string;
  message: string;
  positiveText?: string;
  positiveClick?: Function;
  negativeText?: string;
  negativeClick?: Function;
}) {
  return (
    <div
      className="w-full border-[1px] border-black border-opacity-10
      p-[10px]
     rounded-[5px] flex flex-col"
    >
      <div className="flex flex-row gap-2 items-center justify-start">
        <GetIcon color="app_color" icon={icon ?? "info"} size={18} />
        <h1 className="font-semibold text-[16px]">{title}</h1>
      </div>
      <YMargin height={10} />
      <h1 className="text-[14px] opacity-80">{message}</h1>
      <YMargin height={15} />
      <div className="flex flex-row gap-2">
        {positiveText && (
          <button
            type="button"
            className="px-[20px] py-[5px] 
bg-app_color text-white
rounded-[5px] font-semibold text-[14px]"
            onClick={() => {
              positiveClick!();
            }}
          >
            {positiveText}
          </button>
        )}
        {negativeText && (
          <button
            type="button"
            className="px-[20px] py-[5px] 
bg-white border-[1px] border-slate-100 
rounded-[5px] text-[14px] text-black"
            onClick={() => {
              negativeClick!();
            }}
          >
            {negativeText}
          </button>
        )}
      </div>
    </div>
  );
}
