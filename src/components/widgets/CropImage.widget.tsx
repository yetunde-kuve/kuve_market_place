import { useEffect, useRef, useState } from "react";

// @ts-ignore
import { useUtils } from "@/context/UtilsContext";
import Image from "next/image";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import { CropPreview } from "./CropPreview.widget";
import { useDebounceEffect } from "./useDebounceEffects";
import { delay } from "../../utils/app.utils";
import { YMargin } from "../../utils/widget.utils";

export default function CropImage({ file, onComplete }: any) {
  const [imgSrc, setImgSrc] = useState<any>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [PreImage, setPreImage] = useState<any>(null);
  const [aspect, setAspect] = useState<number | undefined>(1);

  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);

  useEffect(() => {
    handleTrigger();

    if (imgSrc == null) {
      const reader = new FileReader();
      reader.addEventListener("loadend", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  });

  useDebounceEffect(
    async () => {
      // console.log("checking 1");
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        // console.log("checking");
        CropPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
        CropPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  async function handleTrigger() {
    if (triggerSet) return;
    setTriggerSet(true);
    await delay(100);
    setShowUI(true);
  }
  async function dismiss(res: any) {
    setShowUI(false);
    await delay(500);
    onComplete(res, imgRef, previewCanvasRef);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropClicked() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob: any) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      //   var file = new File([blob],'image.png')
      dismiss(blob);
      //   if (blobUrlRef.current) {
      //     URL.revokeObjectURL(blobUrlRef.current)
      //   }
      //   blobUrlRef.current = URL.createObjectURL(blob)
      //   console.log(`URL: ${blobUrlRef.current}`)
      //   hiddenAnchorRef.current!.href = blobUrlRef.current
      //   hiddenAnchorRef.current!.click()
    });
  }

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: 100,
          height: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  return (
    <>
      <div className="fixed w-screen h-screen z-50 flex items-center justify-center">
        <div
          className="absolute z-50 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm duration-500"
          onClick={() => {
            dismiss(null);
          }}
          style={{
            opacity: `${showUI ? 0.9 : 0}`,
          }}
        />

        <div
          className="z-50 w-1/2 h-screen max-h-[800px]
                    flex flex-col 
                    justify-center items-center
                    bg-white shadow-xl duration-500 relative"
          style={{
            marginTop: `${showUI ? "0px" : `1000px`}`,
          }}
        >
          <i
            className="absolute right-2 top-2 fa-solid fa-circle-xmark fa-2x z-20 cursor-pointer"
            style={{
              color: `red`,
            }}
            onClick={() => {
              dismiss(null);
            }}
          ></i>

          <div className="flex flex-1 items-center justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => {
                // console.log(`completed crop: ${c}`)
                setCompletedCrop(c);
              }}
              aspect={aspect}
            >
              <Image
                // alt=""
                width={100}
                height={100}
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                  objectFit: `contain`,
                }}
                onLoad={onImageLoad}
                className="w-fit object-bottom"
              />
            </ReactCrop>
          </div>
          {completedCrop && (
            <div className="hidden">
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop?.width,
                  height: completedCrop?.height,
                }}
              />
              <div>
                {/* <button onClick={onCropClicked}>Download Crop</button> */}
                {/* <a
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a> */}
              </div>
            </div>
          )}
          <YMargin />
          <div className="w-full flex flex-row items-center justify-center">
            <button
              type="button"
              className=" bg-blue0 h-[50px] w-full flex-1 px-20 text-white text-xl font-bold hover:bg-blue3 duration-500"
              onClick={() => {
                onCropClicked();
              }}
            >
              Crop
            </button>

            <button
              type="button"
              className=" bg-blue1 h-[50px] px-5 hover:bg-blue3 duration-500 fa-xl"
              onClick={() => {
                let r = rotate - 90;
                if (r < 0) r = 270;
                setRotate(r);
              }}
            >
              <i
                className="fa-solid fa-rotate-left"
                style={{ color: `white` }}
              ></i>
            </button>

            <button
              type="button"
              className=" bg-blue1 h-[50px] px-5 hover:bg-blue3 duration-500 fa-xl"
              onClick={() => {
                let r = rotate + 90;
                if (r > 270) r = 0;
                setRotate(r);
              }}
            >
              <i
                className="fa-solid fa-rotate-right"
                style={{ color: `white` }}
              ></i>
            </button>
            <button
              type="button"
              className=" bg-blue1 h-[50px] px-5 hover:bg-blue3 duration-500 fa-xl"
              onClick={() => {
                let z = scale + 1;
                if (z > 5) z = 5;
                setScale(z);
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass-plus"
                style={{ color: `white` }}
              ></i>
            </button>
            <button
              type="button"
              className=" bg-blue1 h-[50px] px-5 hover:bg-blue3 duration-500 fa-xl"
              onClick={() => {
                let z = scale - 1;
                if (z < 1) z = 1;
                setScale(z);
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass-minus"
                style={{ color: `white` }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
