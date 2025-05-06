import Image from "next/image";
import { useEffect, useState } from "react";
import { arrayBufferToBase64Image } from "../../utils/app.utils";

export default function ImageView({ value, className, data, size = 100 }: any) {
  const [imageData, setImageData] = useState(null);
  const [myWindow, setMyWindow] = useState<Window | null>(null);
  useEffect(() => {
    if (myWindow == null) setMyWindow(window);
    if (data != undefined) {
      setImageData(data);
    } else if (imageData == null) {
      imageHandler();
    }

    async function imageHandler() {
      // value.image.data
      try {
        // console.log(`fetching image ${value}`)
        let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${value}`);
        let response = await res.json();
        let image = response.data.image.data;
        setImageData(image);
      } catch (e: any) {
        // console.log(`${e}`);
      }
    }
  }, [myWindow, data, imageData, value]);

  return (
    <Image
      src={
        myWindow == null || imageData == null
          ? "/img/placeholder.png"
          : `data:image/png;base64,${arrayBufferToBase64Image(myWindow, imageData)}`
      }
      alt={`Icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}
