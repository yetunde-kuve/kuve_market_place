import Image from "next/image";
import { faqs, FAQ } from "../../utils/asset.utils";
import { YMargin } from "../../utils/widget.utils";
import { useState } from "react";

export default function FaqWidget() {
  const [showFaq, setShowFaq] = useState([]) as any;
  return (
    <div className="w-screen items-center justify-center bg-slate-100">
      <div className="w-full flex flex-col items-center justify-center overflow-y-auto bg-[url('/img/bg-tablet-pattern.svg')]">
        <div className="flex flex-col px-5 sm:px-10 py-10 w-full md:w-2/3 items-center justify-center">
          <Image
            className="cursor-pointer w-[65px] h-[65px] mb-10"
            src={"/img/icon.png"}
            width={65}
            height={65}
            alt=""
          />
          <h1 className="text-[25px] md:text-[40px] font-bold text-center">
            {`Frequently Asked Question`}
          </h1>
          {/* <h1 className="font-bold text-[25px] md:text-[30px] opacity-50 text-center lg:text-start">{`We've got answers...`}</h1> */}
          <YMargin />
          <div className="flex flex-col gap-3">
            {faqs.map((item: FAQ, index: number) => (
              <>
                {
                  <div
                    key={`${item}${index}`}
                    className={`flex flex-col 
                              cursor-pointer 
                              overflow-hidden
                              bg-white rounded-lg
                              ${showFaq.includes(index) ? "h-fit" : "h-[50px]"}
                               `}
                    onClick={() => {
                      let newArray = Array.from(showFaq);
                      if (showFaq.includes(index)) {
                        newArray.splice(showFaq.indexOf(index), 1);
                      } else {
                        newArray.push(index);
                      }
                      setShowFaq(newArray);
                    }}
                  >
                    <div
                      className="flex flex-row items-center bg-white 
                              px-5 py-3  
                              z-10 "
                    >
                      <h1 className="flex-1 text-sm md:text-xl font-medium">
                        {item.question}
                      </h1>
                      <i
                        className={`fa-solid ${
                          showFaq.includes(index) ? "fa-close" : "fa-plus"
                        } fa-lg`}
                        style={{
                          color: `var(--dark_green0)`,
                        }}
                      ></i>
                    </div>
                    <p
                      className={`z-0 
                                px-5 pb-3  
                                    duration-500 opacity-70
                                    transition ease-in-out 
                                    overflow-hidden ${
                                      showFaq.includes(index)
                                        ? "translate-y-0"
                                        : "-translate-y-full"
                                    }
                                
                                 `}
                    >
                      {item.answer}
                    </p>
                  </div>
                }
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
