import { useEffect, useState } from "react";
import ClickText from "./ClickText.widget";
import { formatTranDate, formatTranDateFull } from "../../utils/app.utils";
import DateDialog from "./DateDialog.widget";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerWidget1({
  onPicked,
  hint,
  title,
  value,
}: {
  onPicked?: Function;
  hint?: string;
  title?: string;
  value?: Date;
} = {}) {
  // const [startDate, setStartDate] = useState(value) as any;
  const [selectionMode, setSelectionMode] = useState(false);
  const [date, setDate] = useState(value);

  return (
    <>
      <ClickText
        title={title}
        hint={hint ?? ""}
        noCurve
        onClick={() => {
          setSelectionMode(true);
        }}
        value={date == null ? "" : `${formatTranDateFull(date!.getTime())}`}
      />
      {selectionMode && (
        <DateDialog //08059047887
          value={value}
          onComplete={(date: any) => {
            setSelectionMode(false);
            if (date == null) return;
            setDate(new Date(date));
            onPicked!(date);
          }}
        />
      )}
    </>
  );
}
