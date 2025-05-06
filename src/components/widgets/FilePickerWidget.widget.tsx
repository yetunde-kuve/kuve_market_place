import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { printOut } from "../../utils/app.utils";
import { useUtils } from "@/context/utils.context";

export default function FilePickerWidget(param: {
  hint: string;
  onFilePicked: Function;
  title?: string;
  iconClass?: string;
  thumbTitle?: string;
  fileMetaData?: any;
  noCurve?: boolean;
}) {
  let {
    iconClass,
    hint,
    // id,
    title,
    fileMetaData,
    thumbTitle,
    noCurve,
    onFilePicked,
  } = param;

  const { showPopup } = useUtils();
  const [fileMeta, setFileMeta] = useState(fileMetaData ?? {}) as any;
  // const [
  //   openFileSelector,
  //   { plainFiles, errors },
  // ] = useFilePicker({
  //   accept: "**/*",
  //   multiple: false,
  //   maxFileSize: 4,
  //   // onFilesSelected: ({ plainFiles, filesContent, errors }) => {
  //   //   // this callback is always called, even if there are errors
  //   //   printOut(`selected: ${JSON.stringify(filesContent)}`);
  //   // },
  // });

  // useEffect(() => {
  //   if (plainFiles.length != 0) {
  //     if (plainFiles[0].length != 0) {
  //       printOut("Saw file...");

  //       onFilePicked(plainFiles[0]);
  //     }
  //   }
  // }, [plainFiles]);

  // useEffect(() => {
  //   if (errors.length != 0) {
  //     if (`${JSON.stringify(errors[0])}`.includes("large")) {
  //       showPopup("The file is too large");
  //     } else {
  //       showPopup(`${JSON.stringify(errors[0])}`);
  //     }
  //   }
  // }, [errors]);

  function filePicked() {
    // return errors.length == 0 && plainFiles.length != 0;
  }

  return (
    <div className="flex flex-col w-full gap-3">
      {title && (
        <div className="flex flex-row items-center">
          <h1 className="items-center justify-center font-semibold text-black text-md">
            {`${title}`}
          </h1>
          <span className="ml-2 text-sm">Max 4 mb</span>
        </div>
      )}
      <div
        className={`w-full flex flex-row bg-white hover:bg-opacity-40 cursor-pointer
      py-2 duration-300 items-center px-2 justify-center ${
        !noCurve ? "rounded-full" : "rounded-lg"
      } border-solid border-opacity-10 border-black border-[1px] gap-3`}
        // onClick={() => {
        //   openFileSelector();
        // }}
      >
        <h1 className="rounded-sm shadow-sm px-2 py-1 bg-slate-100 border-solid border-[1px] border-slate-100">
          {thumbTitle ?? "Select File"}
        </h1>
        <h1
          className="flex-1"
          // style={{
          //   opacity: `${filePicked() ? 1 : 0.3}`,
          // }}
        >
          {/* {filePicked()
            ? `${(plainFiles[0] as any).path}`
            : fileMeta["fileName"] ?? hint} */}
        </h1>
      </div>
    </div>
  );
}
