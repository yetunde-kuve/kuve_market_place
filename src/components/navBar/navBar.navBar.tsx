import { AppBar } from "@mui/material";
import SearchBar from "../serachBar/searchBar.searchBar";
import Button from "../widgets/Button.widget";
import { BsChatSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import DropDownMenuDropdownMenu from "../dropDownMenu/dropDownMenu.dropdown.menu";
import { useRef } from "react";

export default function NavBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const list = [
    { id: 1, name: "Groceries" },
    { id: 2, name: "Premium Fruits" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Fashion" },
    { id: 5, name: "Electronics" },
    { id: 6, name: "Beauty" },
    { id: 7, name: "Home Improvement" },
    { id: 8, name: "All Categories" },
    { id: 9, name: "All Categories" },
  ];

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
                <Button color="pink" onClick={() => alert("Button clicked!")}>
                  List Now
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
                  <img
                    src="/img/heart.svg"
                    alt="user-icon"
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
                  <img
                    src="/img/user.svg"
                    alt="user-icon"
                    className="h-[23px] w-[23px]"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="block md:hidden lg:hidden">
            <SearchBar />
          </div>
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex w-full items-center gap-[7.5px] overflow-x-auto scrollbar-none whitespace-nowrap"
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
