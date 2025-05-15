import { AppBar, Divider } from "@mui/material";
import SearchBar from "../serachBar/searchBar.searchBar";
import Button from "../widgets/Button.widget";
import { BsChatSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import DropDownMenuDropdownMenu from "../dropDownMenu/dropDownMenu.dropdown.menu";
import { useRef } from "react";
import IconDropdown from "../dropDownIcon/dropDownIcon.component";
import {useRouter} from "next/navigation";

export default function NavBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const routeToRegister = () => {
    router.push("/auth/signUp?activity=sell");
  }

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
              <div className="flex items-center gap-4">
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <img
                    src="/img/heart.svg"
                    alt="heart"
                    className="h-[23px] w-[23px]"
                  />
                </button>
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <BsChatSquare />
                </button>
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <IoNotificationsOutline className="text-text" />
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
                        key={"signup"}
                        onClick={()=>router.push("/auth/signUp")}
                        className="w-full mt-[23px] text-[14px] font-[500] h-[40px] rounded-md bg-primary text-text"
                      >
                        Sign Up
                      </button>,
                      <button
                        key={"login"}
                        onClick={()=>router.push("/auth/login")}
                        className="w-full text-[14px] font-[500] h-[40px] mb-[23px] rounded-md border border-primary text-text"
                      >
                        Sign In
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
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex w-full items-center gap-[7px] overflow-x-auto scrollbar-none whitespace-nowrap"
              style={{ paddingBottom: "10px" }}
            >
              {list.map((item) => (
                <DropDownMenuDropdownMenu
                  label={item.name}
                  key={item.id}
                  items={[
                    { label: "list here", href: "/dashboard" },
                    { label: "List here", onClick: () => {} },
                  ]}
                />
              ))}
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
}
