import { AppBar, Divider } from "@mui/material";
import SearchBar from "../serachBar/searchBar.searchBar";
import Button from "../widgets/Button.widget";
import { BsChatSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import DropDownMenuDropdownMenu from "../dropDownMenu/dropDownMenu.dropdown.menu";
import { useEffect, useRef, useState } from "react";
import IconDropdown from "../dropDownIcon/dropDownIcon.component";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const list = [
    { id: 1, name: "Groceries" },
    { id: 2, name: "Premium Fruits" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Fashion" },
    { id: 5, name: "Electronics" },
    { id: 6, name: "Beauty" },
    { id: 7, name: "Home Improvement" },
    { id: 8, name: "All Categories" },
  ];
  const freshProduceSubcategories = [
    {
      title: "Leafy Greens",
      categories: [
        { id: 1, label: "Spinach" },
        { id: 2, label: "Lettuce" },
        { id: 3, label: "Kale" },
        { id: 4, label: "Arugula" },
      ],
    },
    {
      title: "Root Vegetables",
      categories: [
        { id: 5, label: "Carrots" },
        { id: 6, label: "Beets" },
        { id: 7, label: "Radishes" },
        { id: 8, label: "Turnips" },
      ],
    },
    {
      title: "Fruits",
      categories: [
        { id: 9, label: "Apples" },
        { id: 10, label: "Bananas" },
        { id: 11, label: "Grapes" },
        { id: 12, label: "Oranges" },
      ],
    },
    {
      title: "Herbs",
      categories: [
        { id: 13, label: "Basil" },
        { id: 14, label: "Cilantro" },
        { id: 15, label: "Mint" },
        { id: 16, label: "Parsley" },
      ],
    },
    {
      title: "Cruciferous",
      categories: [
        { id: 17, label: "Broccoli" },
        { id: 18, label: "Cauliflower" },
        { id: 19, label: "Cabbage" },
        { id: 20, label: "Brussels Sprouts" },
      ],
    },
    {
      title: "Tubers",
      categories: [
        { id: 21, label: "Potatoes" },
        { id: 22, label: "Yams" },
        { id: 23, label: "Sweet Potatoes" },
        { id: 24, label: "Cassava" },
      ],
    },
    {
      title: "Gourds",
      categories: [
        { id: 25, label: "Pumpkin" },
        { id: 26, label: "Zucchini" },
        { id: 27, label: "Squash" },
        { id: 28, label: "Cucumber" },
      ],
    },
    {
      title: "Exotics",
      categories: [
        { id: 29, label: "Dragon Fruit" },
        { id: 30, label: "Passion Fruit" },
        { id: 31, label: "Durian" },
        { id: 32, label: "Rambutan" },
      ],
    },
  ];

  const routeToRegister = () => {
    router.push("/auth/signUp?activity=sell");
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Delay before showing again
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // @ts-ignore
  return (
    <div>
      <AppBar
        elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      >
        <div className="bg-white flex flex-col gap-[17px] lg:px-[88px] md:px-[30px] px-4 md:py-[33px] py-[10px]">
          <div className="flex items-center justify-between">
            <div>
              <img src="/img/logo.svg" alt="KuVE-LOGO" />
            </div>
            <div className="hidden md:block lg:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block md:hidden">
                <Button color="pink" onClick={routeToRegister}>
                  Sell Now
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <img
                    src="/img/heart.svg"
                    alt="heart"
                    className="h-[23px] w-[23px]"
                  />
                </button>
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1404 19.6026C19.8034 19.6026 20.4393 19.8659 20.9081 20.3348C21.377 20.8036 21.6404 21.4395 21.6404 22.1026C21.6404 22.7656 21.377 23.4015 20.9081 23.8703C20.4393 24.3392 19.8034 24.6026 19.1404 24.6026C18.4773 24.6026 17.8415 24.3392 17.3726 23.8703C16.9038 23.4015 16.6404 22.7656 16.6404 22.1026C16.6404 21.4395 16.9038 20.8036 17.3726 20.3348C17.8415 19.8659 18.4773 19.6026 19.1404 19.6026ZM19.1404 20.8526C18.8089 20.8526 18.4909 20.9842 18.2565 21.2187C18.0221 21.4531 17.8904 21.771 17.8904 22.1026C17.8904 22.4341 18.0221 22.752 18.2565 22.9864C18.4909 23.2209 18.8089 23.3526 19.1404 23.3526C19.4719 23.3526 19.7898 23.2209 20.0243 22.9864C20.2587 22.752 20.3904 22.4341 20.3904 22.1026C20.3904 21.771 20.2587 21.4531 20.0243 21.2187C19.7898 20.9842 19.4719 20.8526 19.1404 20.8526ZM7.89038 19.6026C8.55342 19.6026 9.18931 19.8659 9.65815 20.3348C10.127 20.8036 10.3904 21.4395 10.3904 22.1026C10.3904 22.7656 10.127 23.4015 9.65815 23.8703C9.18931 24.3392 8.55342 24.6026 7.89038 24.6026C7.22734 24.6026 6.59145 24.3392 6.12261 23.8703C5.65377 23.4015 5.39038 22.7656 5.39038 22.1026C5.39038 21.4395 5.65377 20.8036 6.12261 20.3348C6.59145 19.8659 7.22734 19.6026 7.89038 19.6026ZM7.89038 20.8526C7.55886 20.8526 7.24092 20.9842 7.0065 21.2187C6.77208 21.4531 6.64038 21.771 6.64038 22.1026C6.64038 22.4341 6.77208 22.752 7.0065 22.9864C7.24092 23.2209 7.55886 23.3526 7.89038 23.3526C8.2219 23.3526 8.53984 23.2209 8.77426 22.9864C9.00868 22.752 9.14038 22.4341 9.14038 22.1026C9.14038 21.771 9.00868 21.4531 8.77426 21.2187C8.53984 20.9842 8.2219 20.8526 7.89038 20.8526ZM21.6404 4.60255H4.47788L7.66538 12.1026H17.8904C18.3029 12.1026 18.6654 11.9026 18.8904 11.6026L22.6404 6.60255C22.8029 6.39005 22.8904 6.12755 22.8904 5.85255C22.8904 5.52103 22.7587 5.20309 22.5243 4.96867C22.2898 4.73425 21.9719 4.60255 21.6404 4.60255ZM17.8904 13.3526H7.72788L6.76538 15.3026L6.64038 15.8526C6.64038 16.1841 6.77208 16.502 7.0065 16.7364C7.24092 16.9709 7.55886 17.1026 7.89038 17.1026H21.6404V18.3526H7.89038C7.22734 18.3526 6.59145 18.0892 6.12261 17.6203C5.65377 17.1515 5.39038 16.5156 5.39038 15.8526C5.39001 15.4284 5.49755 15.0112 5.70288 14.6401L6.60288 12.8026L2.06538 2.10255H0.390381V0.852554H2.89038L3.95288 3.35255H21.6404C22.3034 3.35255 22.9393 3.61595 23.4081 4.08479C23.877 4.55363 24.1404 5.18951 24.1404 5.85255C24.1404 6.47755 23.9279 7.00255 23.5779 7.42755L19.9404 12.2901C19.4904 12.9276 18.7404 13.3526 17.8904 13.3526Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8895 9.81212V9.10752C18.8895 5.23878 15.8678 2.10255 12.1404 2.10255C8.41294 2.10255 5.39125 5.23878 5.39125 9.10752V9.81212C5.39125 10.6577 5.1501 11.4844 4.69818 12.188L3.59074 13.9121C2.5792 15.4869 3.35143 17.6275 5.11074 18.1255C9.71312 19.4282 14.5676 19.4282 19.17 18.1255C20.9293 17.6275 21.7016 15.4869 20.69 13.9121L19.5826 12.188C19.1307 11.4844 18.8895 10.6577 18.8895 9.81212Z"
                      stroke="#060619"
                      stroke-width="1.5"
                    />
                    <path
                      d="M7.64038 19.1025C8.29541 20.8503 10.0628 22.1025 12.1404 22.1025C14.2179 22.1025 15.9854 20.8503 16.6404 19.1025"
                      stroke="#060619"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <IconDropdown
                    key={"account_id"}
                    icon={
                      <img
                        src="/img/user.svg"
                        alt="user-icon"
                        className="h-[23px] w-[23px]"
                      />
                    }
                    title="Account"
                    options={[
                      <button
                        onClick={() => {
                          router.push("/auth/signUp");
                        }}
                        key={"signup"}
                        className="w-full mt-[23px] hover:bg-[#B47072] text-[14px] font-[500] h-[40px] rounded-md bg-primary text-text"
                      >
                        Sign Up
                      </button>,
                      <button
                        onClick={() => {
                          router.push("/auth/login");
                        }}
                        key={"login"}
                        className="w-full hover:bg-slate-50  text-[14px] font-[500] h-[40px]  rounded-md border border-[#000222] text-text"
                      >
                        Sign In
                      </button>,
                      <button
                        key={"login"}
                        className="w-full hover:bg-slate-50 text-[14px] gap-[12px] flex justify-center items-center font-[500] h-[40px] mb-[23px] rounded-md border border-[#000222] text-text"
                      >
                        <BsChatSquare /> Message
                      </button>,
                    ]}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:mx-[-88px] md:mx-[-30px] mx-[-16px]">
            <Divider />
          </div>
          <div className="block md:hidden lg:hidden">
            <SearchBar />
          </div>
          <div
            className={`transition-all duration-300 ${isScrolling ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}
          >
            <div
              ref={scrollRef}
              className="flex w-full px-1 py-1 items-center gap-[7px] overflow-x-auto scrollbar-none whitespace-nowrap"
              style={{ paddingBottom: "10px" }}
            >
              {list.map((item) => (
                <DropDownMenuDropdownMenu
                  mobileRedirectPath=""
                  label={item.name}
                  key={item.id}
                  items={freshProduceSubcategories}
                />
              ))}
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
}
