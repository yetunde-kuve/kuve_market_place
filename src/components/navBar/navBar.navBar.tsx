import { AppBar, Avatar, Divider } from "@mui/material";
import SearchBar from "../serachBar/searchBar.searchBar";
import Button from "../widgets/Button.widget";
import { BsChatSquare, BsPerson } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import DropDownMenuDropdownMenu from "../dropDownMenu/dropDownMenu.dropdown.menu";
import { useEffect, useRef, useState } from "react";
import IconDropdown from "../dropDownIcon/dropDownIcon.component";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "@/context/auth.context";
import useMeasure from "react-use-measure";
import CategoryList from "./component/categoryList.component";
import CartDropdown from "@/features/cart/component/cartHover.component";
import WishListDropdown from "@/features/wishList/component/wishListHover.component";

export default function NavBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { login, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const checkOverflow = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollWidth > clientWidth + scrollLeft);
    }
  };

  const scrollAmount = 150; // Adjust the scroll amount as needed

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
    setTimeout(checkOverflow, 100);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
    setTimeout(checkOverflow, 100);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const handleScroll = () => {
    checkOverflow();
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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

  const options = [
    !isLoggedIn && (
      <button
        onClick={() => {
          router.push("/auth/signUp");
        }}
        key={"signup"}
        className="w-full mt-[10px] hover:bg-[#B47072] text-[14px] font-[500] h-[40px] rounded-md bg-primary text-text"
      >
        Sign Up
      </button>
    ),
    !isLoggedIn && (
      <button
        onClick={() => {
          router.push("/auth/login");
        }}
        key={"login"}
        className="w-full mb-[16px] hover:bg-slate-50  text-[14px] font-[500] h-[40px]  rounded-md border border-[#000222] text-text"
      >
        Sign In
      </button>
    ),
    isLoggedIn && ( // Conditionally render Message if logged in
      <div className="flex flex-col w-full gap-4">
        <button className="flex items-center text-[#111928] w-full gap-2 hover:text-primary">
          <i className="ri-account-circle-line text-primary text-[18px]"></i>
          <p className="text-[14px]  font-[400]">My Kuve </p>
        </button>
        <button className="flex items-center w-full gap-2 text-[#111928] hover:text-primary">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3 6.87474V5.25467C13.3 4.87744 13.1525 4.51565 12.8899 4.24891C12.6274 3.98217 12.2713 3.83231 11.9 3.83231H11.2805L8.8816 0.76855C8.76594 0.620863 8.59727 0.525905 8.4127 0.504566C8.22812 0.483226 8.04276 0.537253 7.8974 0.654761C7.75203 0.772269 7.65857 0.943633 7.63757 1.13115C7.61656 1.31867 7.66974 1.50699 7.7854 1.65468L9.4906 3.83231H8.4805L6.0816 0.76855C6.02278 0.694019 5.94986 0.632211 5.86714 0.586773C5.78443 0.541336 5.69359 0.513188 5.6 0.503991C5.41208 0.486782 5.22509 0.545845 5.0799 0.668274L1.3888 3.83231C1.01944 3.83531 0.666216 3.98649 0.406083 4.25291C0.145949 4.51933 -1.18193e-05 4.8794 7.17839e-10 5.25467V13.0776C7.17839e-10 13.4549 0.1475 13.8167 0.41005 14.0834C0.672601 14.3501 1.0287 14.5 1.4 14.5H11.9C12.2713 14.5 12.6274 14.3501 12.8899 14.0834C13.1525 13.8167 13.3 13.4549 13.3 13.0776V11.4576C13.5121 11.3337 13.6885 11.1554 13.8113 10.9404C13.9342 10.7255 13.9993 10.4815 14 10.2329V8.09939C13.9993 7.85082 13.9342 7.60682 13.8113 7.39188C13.6885 7.17693 13.5121 6.99858 13.3 6.87474ZM12.6 8.09939V10.2329H9.1C8.91435 10.2329 8.7363 10.158 8.60503 10.0246C8.47375 9.89125 8.4 9.71036 8.4 9.52175V8.81057C8.4 8.62195 8.47375 8.44106 8.60503 8.30769C8.7363 8.17431 8.91435 8.09939 9.1 8.09939H12.6ZM5.4341 2.22718L6.6913 3.83231H3.5616L5.4341 2.22718ZM1.4 13.0776V5.25467H11.9V6.67703H9.1C8.54305 6.67703 8.0089 6.90181 7.61508 7.30193C7.22125 7.70204 7 8.24472 7 8.81057V9.52175C7 10.0876 7.22125 10.6303 7.61508 11.0304C8.0089 11.4305 8.54305 11.6553 9.1 11.6553H11.9V13.0776H1.4Z"
              fill="#FF9D98"
            />
            <path
              d="M10.15 9.87733C10.5366 9.87733 10.85 9.55893 10.85 9.16615C10.85 8.77338 10.5366 8.45498 10.15 8.45498C9.7634 8.45498 9.45 8.77338 9.45 9.16615C9.45 9.55893 9.7634 9.87733 10.15 9.87733Z"
              fill="#FF9D98"
            />
          </svg>

          <p className="text-[14px]  font-[400]">Purchases </p>
        </button>
        <button className="flex items-center w-full gap-2  text-[#111928] hover:text-primary">
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1575 2.18916C11.8596 1.89108 11.5059 1.65462 11.1165 1.4933C10.7272 1.33197 10.3098 1.24893 9.88838 1.24893C9.46693 1.24893 9.04961 1.33197 8.66026 1.4933C8.27091 1.65462 7.91716 1.89108 7.61922 2.18916L7.00088 2.8075L6.38255 2.18916C5.78073 1.58734 4.96449 1.24924 4.11338 1.24924C3.26228 1.24924 2.44604 1.58734 1.84422 2.18916C1.2424 2.79098 0.904297 3.60723 0.904297 4.45833C0.904297 5.30943 1.2424 6.12568 1.84422 6.7275L7.00088 11.8842L12.1575 6.7275C12.4556 6.42956 12.6921 6.07581 12.8534 5.68645C13.0147 5.2971 13.0978 4.87978 13.0978 4.45833C13.0978 4.03688 13.0147 3.61956 12.8534 3.23021C12.6921 2.84086 12.4556 2.4871 12.1575 2.18916Z"
              stroke="#FF9D98"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p className="text-[14px]  font-[400]">Wishlist </p>
        </button>
        <button className="flex items-center w-full gap-2  text-[#111928] hover:text-primary">
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33268 10.1667C1.01185 10.1667 0.737196 10.0524 0.508724 9.82397C0.280252 9.5955 0.166016 9.32084 0.166016 9.00001V2.00001C0.166016 1.67918 0.280252 1.40452 0.508724 1.17605C0.737196 0.94758 1.01185 0.833344 1.33268 0.833344H10.666C10.9868 0.833344 11.2615 0.94758 11.49 1.17605C11.7184 1.40452 11.8327 1.67918 11.8327 2.00001V9.00001C11.8327 9.32084 11.7184 9.5955 11.49 9.82397C11.2615 10.0524 10.9868 10.1667 10.666 10.1667H1.33268ZM5.99935 6.08334L1.33268 3.16668V9.00001H10.666V3.16668L5.99935 6.08334ZM5.99935 4.91668L10.666 2.00001H1.33268L5.99935 4.91668ZM1.33268 3.16668V2.00001V9.00001V3.16668Z"
              fill="#FF9D98"
            />
          </svg>

          <p className="text-[14px]  font-[400]">Inbox </p>
        </button>
        <button
          onClick={() => logout()}
          className="flex items-center w-full gap-2"
        >
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_38533_19573)">
              <path
                d="M13.9337 7.16575C13.8891 7.05813 13.8252 6.96187 13.7438 6.8805L10.2444 3.38138C9.90227 3.03925 9.34923 3.03925 9.00708 3.38138C8.66493 3.7235 8.66493 4.2765 9.00708 4.61862L11.0136 6.625H3.50027C3.01636 6.625 2.62521 7.017 2.62521 7.5C2.62521 7.983 3.01636 8.375 3.50027 8.375H11.0136L9.00708 10.3814C8.66493 10.7235 8.66493 11.2765 9.00708 11.6186C9.17772 11.7893 9.40173 11.875 9.62575 11.875C9.84977 11.875 10.0738 11.7893 10.2444 11.6186L13.7438 8.1195C13.8252 8.039 13.8891 7.94187 13.9337 7.83425C14.0221 7.62075 14.0221 7.37925 13.9337 7.16575Z"
                fill="#E02424"
              />
              <path
                d="M5.25041 12.75H2.62521C2.14217 12.75 1.75014 12.3571 1.75014 11.875V3.125C1.75014 2.64287 2.14217 2.25 2.62521 2.25H5.25041C5.73432 2.25 6.12548 1.858 6.12548 1.375C6.12548 0.892 5.73432 0.5 5.25041 0.5H2.62521C1.17784 0.5 0 1.67775 0 3.125V11.875C0 13.3223 1.17784 14.5 2.62521 14.5H5.25041C5.73432 14.5 6.12548 14.108 6.12548 13.625C6.12548 13.142 5.73432 12.75 5.25041 12.75Z"
                fill="#E02424"
              />
            </g>
            <defs>
              <clipPath id="clip0_38533_19573">
                <rect
                  width="14"
                  height="14"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <p className="text-[14px] text-[#E02424] font-[400]">Log out </p>
        </button>
      </div>
    ),
    // isLoggedIn && ( // Conditionally render Message if logged in
    //   <button
    //     key={"message"}
    //     className="w-full hover:bg-slate-50 text-[14px]  gap-[12px] flex justify-center items-center font-[500] h-[40px] rounded-md border border-[#000222] text-text"
    //   >
    //     <BsPerson size={18} /> Profile
    //   </button>
    // ),
    // isLoggedIn && ( // Conditionally render Message if logged in
    //   <button
    //     key={"message"}
    //     className="w-full hover:bg-slate-50 text-[14px] mb-3 gap-[12px] flex justify-center items-center font-[500] h-[40px]  rounded-md border border-[#000222] text-text"
    //   >
    //     <BsChatSquare size={18} /> Message
    //   </button>
    // ),
  ].filter(Boolean);

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
        <div className="pt-[20px] bg-white flex flex-col gap-[12px] xl:px-[88px] lg:px-[25px] md:px-[30px] px-4 md:py-[24px] py-[14px]">
          <div className="flex items-center justify-between pt-[14px] md:pt-0">
            <div>
              <img src="/img/logo.svg" alt="KuVE-LOGO" />
            </div>
            <div className="hidden md:block lg:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-4">
              <div
                className="hidden lg:block md:hidden"
                onClick={routeToRegister}
              >
                <button className="h-[40px] rounded-full bg-[#FF9D98] border shadow-md border-black-primary text-[14px] font-[600] text-black-primary px-4">
                  Sell Now
                </button>
              </div>
              <div className="flex items-center gap-2">
                <WishListDropdown />
                <CartDropdown />
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
                    title={
                      <div>
                        {!isLoggedIn ? (
                          <p>Account</p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Avatar sx={{ width: 34, height: 34 }} />
                            <div className="flex flex-col items-start">
                              <p className="text-[14px] font-[700] text-[#111928]">
                                Jese Leos
                              </p>
                              <p className="text-[12px] font-[400] text-[#828294]">
                                Jese@gmail.com
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                    options={options}
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
          <CategoryList />
        </div>
      </AppBar>
    </div>
  );
}
