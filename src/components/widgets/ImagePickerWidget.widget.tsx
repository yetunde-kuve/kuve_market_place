import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { arrayBufferToBase64Image, printOut } from "../../utils/app.utils";
import Image from "next/image";
import { useUtils } from "@/context/utils.context";

export default function ImagePickerWidget(param: {
  onImagePicked?: Function;
  defImage?: string;
  title?: string;
  noClick?: boolean;
}) {
  let { title, noClick, onImagePicked, defImage } = param;

  const [image, setImage] = useState(defImage ?? "");
  const { showPopup } = useUtils();
  // const [
  //   openFileSelector,
  //   { filesContent, loading, plainFiles, clear, errors },
  // ] = useFilePicker({
  //   accept: "**/*",
  //   multiple: false,
  //   maxFileSize: 4,
  //   // onFilesSelected: ({ plainFiles, filesContent, errors }) => {
  //   //   // this callback is always called, even if there are errors
  //   //   printOut(`selected: ${JSON.stringify(filesContent)}`);
  //   // },
  // });
  // const [
  //   openFileSelector,
  //   { filesContent, loading, plainFiles, clear, errors },
  // ] = useFilePicker({
  //   accept: "image/*",
  //   multiple: false,
  //   maxFileSize: 2,
  //   onFilesSelected: ({ plainFiles, filesContent, errors }) => {
  //     // this callback is always called, even if there are errors
  //     printOut(`selected: ${JSON.stringify(filesContent)}`);
  //   },
  // });

  // useEffect(() => {
  //   if (plainFiles.length != 0) {
  //     if (plainFiles[0].length != 0) {
  //       printOut("Saw file...");

  //       handleImage();
  //     }
  //   }
  // }, [plainFiles]);

  async function handleImage() {
    // let file = plainFiles[0];
    // let buffer = await file.arrayBuffer();
    // let image64 = arrayBufferToBase64Image(window, buffer);
    // setImage(image64);
    // onImagePicked!(image64);
  }

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
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
      <h1 className="leading-none">{title}</h1>
      {noClick && (
        <p className="text-[12px] opacity-40 leading-none">{`Max 2mb`}</p>
      )}
      <div className="relative w-[120px] h-[120px] rounded-full ">
        <div
          // href={image}
          // target="_blank"
          // rel="noreferrer"
          className={`p-1 bg-slate-100 w-[120px] h-[120px]
rounded-lg
overflow-clip flex items-center justify-center cursor-pointer hover:opacity-75`}
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
            width={image.length == 0 ? 25 : 120}
            height={image.length == 0 ? 25 : 120}
          />
        </div>
        {onImagePicked && (
          <i
            className="fa-solid fa-camera absolute right-2 bottom-2 bg-dark_green0 p-3 shadow-lg rounded-lg cursor-pointer hover:bg-dark_green2 duration-300"
            style={{ color: "white" }}
            // onClick={() => {
            //   if (onImagePicked == null) return;
            //   openFileSelector();
            // }}
          ></i>
        )}
      </div>
    </div>
  );
}
