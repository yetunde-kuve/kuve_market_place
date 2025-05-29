import { AppBar, Divider } from "@mui/material";
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
  const { login, isLoggedIn } = useAuth();
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
        className="w-full mt-[23px] hover:bg-[#B47072] text-[14px] font-[500] h-[40px] rounded-md bg-primary text-text"
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
      <button
        key={"message"}
        className="w-full hover:bg-slate-50 text-[14px]  gap-[12px] flex justify-center items-center font-[500] h-[40px] rounded-md border border-[#000222] text-text"
      >
        <BsPerson size={18} /> Profile
      </button>
    ),
    isLoggedIn && ( // Conditionally render Message if logged in
      <button
        key={"message"}
        className="w-full hover:bg-slate-50 text-[14px] mb-3 gap-[12px] flex justify-center items-center font-[500] h-[40px]  rounded-md border border-[#000222] text-text"
      >
        <BsChatSquare size={18} /> Message
      </button>
    ),
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
        <div className="bg-white flex flex-col gap-[12px] xl:px-[88px] lg:px-[25px] md:px-[30px] px-4 md:py-[24px] py-[5px]">
          <div className="flex items-center justify-between">
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
                    title="Account"
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
