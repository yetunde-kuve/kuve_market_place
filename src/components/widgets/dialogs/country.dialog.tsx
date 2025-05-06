import { YMargin } from "../../../utils/widget.utils";
import { useEffect, useState } from "react";
import { delay, getError, getHeader } from "../../../utils/app.utils";
// @ts-ignore

import { useUtils } from "../../../context/utils.context";
import Image from "next/image";

// import InputField from "../InputField";
const countryCodes = require("country-codes-list");

const myCountryCodesObject = countryCodes.customList(
  "countryCode",
  "[{countryCode}] {countryNameEn}: +{countryCallingCode}"
);

export default function CountryDialog(param: { onComplete: Function }) {
  const [search, setSearch] = useState("");
  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);
  const [countryList, setCountryList] = useState([]) as any;

  useEffect(() => {
    handleTrigger();
  }, [triggerSet, showUI]);

  async function handleTrigger() {
    if (triggerSet) return;
    setTriggerSet(true);

    loadCountries();

    await delay(100);
    setShowUI(true);
  }

  function loadCountries() {
    // 'AD': '[AD] Andorra: +376',
    let list = [];
    for (let key in myCountryCodesObject) {
      let item = myCountryCodesObject[key] as string;
      let parts = `${item}`.split(" ");
      let name = parts[1];
      name = item.substring(item.indexOf(" "), item.lastIndexOf(" "));
      name = name.replace(":", "");
      name = name.trim();
      let code = parts[parts.length - 1];

      list.push({
        name: name,
        code: code,
      });
      // console.log(JSON.stringify(item));
    }
    // console.log(`Country size: ${list.length}`);
    setCountryList(list);
  }

  async function dismiss(countryItem?: any) {
    setShowUI(false);
    await delay(500);
    param.onComplete(countryItem);
  }

  return (
    <>
      <div
        className="w-full h-full z-20 fixed items-center justify-center duration-500 
       left-0 right-0 top-0 bottom-0 flex"
      >
        <div
          className="absolute z-30 w-full h-full left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm duration-500"
          onClick={() => {
            dismiss();
          }}
          style={{
            opacity: `${showUI ? 0.9 : 0}`,
          }}
        />

        <div
          className="z-40 w-full md:w-1/2 lg:w-1/3
                    mx-5 sm:mx-10
                    p-6 sm:p-10
                    flex flex-col 
                    justify-start items-end select-none
                    bg-white rounded-xl shadow-xl duration-500 absolute"
          style={{
            marginTop: `${showUI ? "0px" : `1000px`}`,
          }}
        >
          <Image
            alt=""
            src="/img/icon.png"
            className="right-2 top-2 h-10 w-10 mb-10 z-0 absolute opacity-10"
            width={40}
            height={40}
          />

          {/* <button
            type="button"
            className="left-2 top-2 absolute fa-solid fa-close fa-1x rounded-full bg-white
  
  p-2 w-[40px] h-[40px]"
            style={{ color: `red` }}
            onClick={() => {
              dismiss();
            }}
          ></button> */}

          <div className="w-full h-full justify-center items-start flex flex-col">
            {
              <h1 className="z-10 sm:text-2xl font-bold text-black text-start mb-5">
                {"Select Country"}
              </h1>
            }

            {/* {
              <InputField
                id="Search"
                hint="Search"
                name="Search"
                iconClass="fa-solid fa-magnifying-glass"
                value={search}
                onChanged={(text: any) => {
                  setSearch(text);
                }}
              />
            } */}
            <YMargin />
            <ol className="w-full max-h-[400px] items-center justify-center overflow-y-auto">
              {countryList.map((item: any, index: number) => (
                <li
                  key={`${index}${JSON.stringify(item)}`}
                  className={`${
                    search.length != 0 &&
                    !`${item.name}`
                      .toLowerCase()
                      .includes(search.trim().toLowerCase())
                      ? "hidden"
                      : "block"
                  } py-3 w-full border-b-[1px] border-solid border-slate-200 cursor-pointer hover:text-blue0 hover:font-bold duration-500`}
                  onClick={() => {
                    dismiss(item);
                  }}
                  style={{
                    borderBottomWidth: `${index == countryList.length - 1 ? "0px" : "1px"}`,
                  }}
                >
                  <div className="flex flex-row">
                    <h1 className="flex-1 text-xl">{`${item.name}`}</h1>
                    <h1 className="text-lg font-semibold text-app_color">{`${item.code}`}</h1>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
