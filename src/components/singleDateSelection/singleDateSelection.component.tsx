import { Backdrop } from "@mui/material";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
interface SingleDateSelectionprop {
  open: boolean;
  onSelection: (data: any) => void;
  onClose: () => void;
}
export default function SingleDateSelection({
  open,
  onSelection,
  onClose,
}: SingleDateSelectionprop) {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();
  function handleSelect() {
    onSelection(selected);
  }
  return (
    <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <div className="px-4 md:px-0">
        <div className="p-5 bg-white rounded-xl md:w-[400px] w-full flex flex-col items-center ">
          <p className="text-[14px] font-[400]">Select Date</p>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={
              selected
                ? `Selected: ${selected.toLocaleDateString()}`
                : "Pick a day."
            }
          />
          <div className="flex flex-col w-full gap-2 mt-4">
            <button
              onClick={handleSelect}
              className="w-full bg-[#000222] text-white text-[14px] font-[400] h-[40px] rounded-lg"
            >
              Apply
            </button>
            <button
              onClick={onClose}
              className="w-full border border-[#000222] text-[#000222] text-[14px] font-[400] h-[40px] rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
