import { useEffect, useState } from "react";
import { delay } from "../../../utils/app.utils";
// @ts-ignore
import { useUtils } from "../../../context/utils.context";
import Image from "next/image";
import Logo from "../../../../../public/img/3ribe.png";
import { Box, Container } from "@mui/material";
import { MdCancel } from "react-icons/md";

export default function Loading(param: LoadingParam) {
  let { cancellable, message, onDismiss } = param.loadingParam;
  message = message ?? "Please wait";
  cancellable = cancellable ?? true;
  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);

  const { hideLoading } = useUtils();

  useEffect(() => {
    // console.log(`${message} Loading shown`);
    handleLoading();
  }, [triggerSet]);

  async function handleLoading() {
    if (triggerSet) return;
    setTriggerSet(true);
    await delay(100);
    setShowUI(true);
    // await delay(1800);
    // setShowUI(false);
    // console.log("");
  }

  return (
    <>
      <Container>
        <Box
          zIndex={"99999"}
          className="fixed top-0 left-0 right-0 w-full h-full bg-gray-200 bg-opacity-70 backdrop-blur-sm "
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div>
            <div className="container">
              <div className="box box3"></div>
              <div className="box box2"></div>
              <div className="box box1"></div>
            </div>
            <br></br>
            <div>
              <h1 className="mt-5 text-lg font-semibold">{message}</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {cancellable && (
                <button
                  style={{
                    marginTop: 1,
                    border: "none",
                    fontSize: 20,
                    textAlign: "center",
                    backgroundColor: "#ffffff00",
                  }}
                  onClick={() => {
                    hideLoading();
                    if (onDismiss != null) {
                      onDismiss();
                    }
                  }}
                >
                  <MdCancel className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
}

interface LoadingParam {
  loadingParam: LoadingItem;
}

export class LoadingItem {
  message?: string;
  cancellable?: boolean;
  onDismiss?: Function;

  constructor(message?: string, cancellable?: boolean, onDismiss?: Function) {
    this.message = message;
    this.cancellable = cancellable;
    this.onDismiss = onDismiss;
  }
}
