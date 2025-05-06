// import { YMargin } from "@/components/utils/widget_utils";
import { useEffect, useState } from "react";
// import { delay, getError, getHeader } from "@/components/utils/app_utils";
// @ts-ignore
import { useUtils } from "@/context/UtilsContext";
import Image from "next/image";
// import { axiosInstance, useAuth } from "@/context/AuthContext";
// import { auth } from "@/firebase";
import { useRouter } from "next/router";

export default function AccessCodeDialog(param: AccessParam) {
  const router = useRouter();
  const [codes, setCodes] = useState<any>([]);
  const { showAccessDialog, showLoading, hideLoading, showPopup } = useUtils();
  const { oneTime, verifyCode, oldCode, security, onComplete } = param.accessParam;

  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);
  // const { userModel } = useAuth();
  function downHandler({ key }: any) {
    let value = key;
    console.log(value);
    let num = Number(value);
    if (value == "Backspace" || value == "Delete") {
      // removeCode();
    } else if (`${num}`.trim().toLowerCase() != "nan") {
      inputCode(num);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [codes]);

  useEffect(() => {
    handleTrigger();
  }, [triggerSet, showUI]);

  async function handleTrigger() {
    if (triggerSet) return;
    setTriggerSet(true);
    // await delay(100);
    setShowUI(true);
  }
  async function dismiss() {
    setShowUI(false);
    // await delay(500);
    showAccessDialog(null);
  }

  function inputCode(code: number) {
    // console.log(`items: ${codes}`)
    if (codes.length >= 6) {
      return;
    }
    let items = Array.from(codes) as any;
    items?.push(`${code}`);
    if (items.length == 6) {
      // console.log(items)
      // let code = getCodes(items);
      proceed(code);
    }
    setCodes(items);
  }

  async function proceed(code: any) {
    if (oneTime) {
      dismiss();
      onComplete(code);
      return;
    }
    if (verifyCode) {
      verifyCodeFromApi(code);
      return;
    }
    showLoading();
    // await delay(1000);
    hideLoading();

    if (oldCode != null && oldCode != code) {
      showPopup("Access code does not match");
      return;
    }

    dismiss();
    // await delay(1000);
    onComplete(code);
    // if(oldCode!=null){
    //   dismiss()
    //   onComplete(code)
    //   return;
    // }
    // launchScreen(EnterCode(code: getPin(),),
    // result: (_){
    //   if(_==null)return;
    //   Navigator.pop(context,_);
    // });
  }

  async function verifyCodeFromApi(code: any) {
    showLoading("Verifying Code");

    //   axiosInstance
    //     .post(
    //       "/security/validateCode",
    //       {
    //         code: code,
    //       },
    //       { headers: await getHeader(auth) }
    //     )
    //     .then((response) => {
    //       hideLoading();
    //       if (response.status == 200) {
    //         let data = response.data;

    //         //   console.log(`data: ${data}`)
    //         dismiss();
    //         onComplete(code);
    //         showPopup("Verification Successful", false);
    //       } else {
    //         showPopup("Please check the code and try again");
    //       }
    //     })
    //     .catch((e) => {
    //       hideLoading();
    //       showPopup(getError(e));
    //       setCodes([]);
    //     });
    // }

    function getCodes(codeList: any) {
      let code = "";
      for (let i of codeList) {
        code = `${code}${i}`;
      }
      return code;
    }

    function removeCode() {
      let items = Array.from(codes) as any;
      items.splice(codes.length - 1, 1);
      setCodes(items);
    }

    return (
      <>
        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full h-full duration-500">
          <div
            className="absolute top-0 bottom-0 left-0 right-0 z-30 w-full h-full duration-500 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => {
              if (!security) dismiss();
            }}
            style={{
              opacity: `${showUI ? 0.9 : 0}`,
            }}
          />

          <div
            className="relative z-40 flex flex-col items-end justify-start w-full p-6 mx-5 duration-500 bg-white shadow-xl select-none sm:w-2/3 lg:w-1/3 sm:p-10 rounded-xl"
            style={{
              marginTop: `${showUI ? "0px" : `1000px`}`,
            }}
          >
            <Image
              alt=""
              src="/img/icon.png"
              className="absolute z-0 w-10 h-10 mb-10 right-2 top-2 opacity-10"
              width={40}
              height={40}
            />

            <button
              type="button"
              className="left-2 top-2 absolute fa-solid fa-close fa-1x rounded-full bg-white
  
  p-2 w-[40px] h-[40px]"
              style={{ color: `red` }}
              onClick={() => {
                dismiss();
              }}
            ></button>

            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-xl font-bold text-black">
                {security
                  ? "Welcome Back"
                  : verifyCode
                    ? "Access Code"
                    : `${oldCode != null ? "Retype" : "Setup"} Access Code`}
              </h1>
              {/* <YMargin height="10px" /> */}
              <h1 className="text-black text-[12px] opacity-50">
                {verifyCode
                  ? "Please enter your 6 digit access code"
                  : oldCode != null
                    ? "Retype your access code"
                    : "Enter a 6 digit code you can remember"}
              </h1>
              {/* <YMargin /> */}
              {
                <div className="flex flex-row gap-3">
                  {[0, 1, 2, 3, 4, 6].map((item: any, index: number) => (
                    <div
                      key={`${index}${item}`}
                      className="w-10 h-10 bg-sla bg-opacity-10  duration-500
                rounded-lg border-[1px] border-white border-solid items-center justify-center flex"
                      style={{
                        backgroundColor: `${
                          codes.length > index ? "var(--brown04)" : "var(--brown09)"
                        }`,
                      }}
                    >
                      <h1 className="font-bold text-white duration-500 text-md">{`${
                        codes.length > index ? `${codes[index]}` : ""
                      }`}</h1>
                    </div>
                  ))}
                </div>
              }
              {/* <YMargin /> */}
              {
                <div className="flex flex-wrap items-center justify-center gap-3 mt-3 w-[300px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0].map((item: any, index: number) => (
                    <div
                      key={`${item}${index}`}
                      className="flex items-center justify-center bg-white border-solid rounded-full cursor-pointer w-14 h-14 text-brown02 hover:bg-slate-300"
                      onClick={() => {
                        if (index == 10) {
                          removeCode();
                          return;
                        }
                        inputCode(item);
                      }}
                    >
                      {index < 10 && <h1 className="text-xl font-bold">{`${item}`}</h1>}
                      {index == 10 && (
                        <i className="fa-solid fa-delete-left fa-lg" style={{ color: "black" }}></i>
                      )}
                    </div>
                  ))}
                </div>
              }

              {verifyCode && (
                <p
                  className="flex-1 mt-3 text-sm font-semibold text-black underline cursor-pointer hover:opacity-60"
                  // onClick={() => {
                  //   dismiss();
                  //   if (userModel().getString("accessCode").length == 0) {
                  //     router.push("/profile/create_code");
                  //     return;
                  //   }
                  //   router.push("/profile/reset_code");
                  // }}
                >
                  Forgot Code
                </p>
              )}
              {security && (
                <p
                  className="flex-1 font-bold text-black cursor-pointer hover:opacity-60"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Logout
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
interface AccessParam {
  accessParam: AccessItem;
}

export class AccessItem {
  oneTime;
  verifyCode;
  oldCode;
  security;
  onComplete;

  constructor({
    onComplete,
    oneTime,
    verifyCode,
    oldCode,
    security,
  }: {
    onComplete: Function;
    oneTime?: boolean;
    verifyCode?: boolean;
    oldCode?: string;
    security?: boolean;
  }) {
    this.oneTime = oneTime;
    this.verifyCode = verifyCode;
    this.oldCode = oldCode;
    this.security = security;
    this.onComplete = onComplete;
  }
}
