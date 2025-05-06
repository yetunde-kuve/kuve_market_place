import Link from "next/link";
import { useEffect, useState } from "react";
import { extractLink, getFromLocal, saveToLocal } from "../../utils/app.utils";

export default function CookieWidget() {
  const [showCookie, setShowCookie] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    checkCookie();
  }, []);

  function checkCookie() {
    if (loaded) return;
    setLoaded(true);
    // console.log("Checking cookie");
    let value = getFromLocal("cookie");
    let path = extractLink();
    if (!value && path == "/home") setShowCookie(true);
  }
  if (!showCookie) return <></>;
  return (
    <div className="w-screen h-full fixed top-0 bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="absolute bottom-[20px] right-[20px]  
      z-50 bg-white shadow-lg rounded-[5px] 
      border-[1px] border-black border-opacity-10
    
    p-[10px] w-4/5 md:w-1/3 pointer-events-auto"
      >
        <div className="flex flex-row gap-2 items-center">
          <p className={`text-[12px] flex-1`}>
            <span className={`${showFull ? "maxlineany" : "maxline2"}`}>
              On this website we use third-party and first-party cookies to
              personalize its content, analyze its performance, improve security
              and serve ads relevant to your interests. By continuing the use of
              the website you consent to the use of cookies as described in
              our{" "}
            </span>
            {showFull && (
              <span>
                <Link
                  className="underline text-app_color font-semibold"
                  href="/cookie-policy"
                  target="_blank"
                >
                  Cookie Policy
                </Link>
              </span>
            )}
            {!showFull && (
              <span
                onClick={() => {
                  setShowFull(true);
                }}
                className="cursor-pointer font-bold text-app_color underline"
              >
                More
              </span>
            )}
          </p>
          <button
            className="bg-app_color w-[50px] h-[50px] text-white rounded-[5px]"
            onClick={() => {
              setShowCookie(false);
              saveToLocal("cookie", true);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
