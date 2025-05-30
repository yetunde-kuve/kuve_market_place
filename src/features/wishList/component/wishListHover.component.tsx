"use client";

import { useState, useRef, useEffect } from "react";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";

import Camera from "../../../../public/svg/camerW.svg"; // Replace with your actual image path
import { useWishlistStore } from "../store/wishlistStore";
import EmptyCartWidget from "@/features/cart/component/emptyCart.component";
import WhistListProductHoverCard from "./wishListPeoductCard.component";
import WishListButton from "./wishListButton.component";
import ContinueButton from "@/features/cart/component/continueButton.component";
import EmptyWishhListWidget from "./emptyWishList.component";

export default function WishListDropdown() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { items, removeFromWishlist } = useWishlistStore();

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={anchorRef}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={handleToggle}
        className="relative p-2 text-xl h-[40px] w-[40px]"
      >
        <img src="/img/heart.svg" alt="heart" className="h-[23px] w-[23px]" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Popper Dropdown */}
      <Popper
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        className="z-[9999] "
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className=" md:mx-0 m-auto w-screen sm:w-[320px] md:w-[376px] lg:w-[464px] max-h-[90vh] rounded-xl shadow-lg overflow-hidden">
              <ClickAwayListener onClickAway={handleClose}>
                <div className="flex flex-col h-[80vh] sm:h-[464px] md:h-[464px] ">
                  {/* Sticky Header */}
                  {items.length > 0 && (
                    <div className="sticky top-0 z-10 px-[24px] py-3 bg-white border-b">
                      <p className="text-[16px] font-[500] text-[#191C1F]">
                        Wishlist{" "}
                        {/* <span className="text-[#5F6C72]">{`(${items.length})`}</span> */}
                      </p>
                    </div>
                  )}

                  {/* Scrollable Content */}
                  {items.length > 0 ? (
                    <div className="flex-1 px-[24px] py-[20px] space-y-3 overflow-y-auto">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-[12px]"
                        >
                          <div className="flex-1">
                            <WhistListProductHoverCard
                              price={item.price}
                              img={item.image}
                              title={item.name}
                            />
                          </div>
                          {/* <i
                            onClick={() => removeFromCart(item.id)}
                            className="ri-close-fill hover:text-primary cursor-pointer text-[#929FA5] text-[16px] transition-transform duration-300 hover:rotate-90"
                          ></i> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <EmptyWishhListWidget />
                    </div>
                  )}

                  {/* Footer */}
                  {items.length > 0 ? (
                    <div className="px-[24px] py-[20px] border-t">
                      {/* <div className="flex justify-between ">
                        <p className="text-[#475156] text-[14px] font-[400]">
                          Sub-Total:
                        </p>
                        <p className="text-[#191C1F] text-[14px] font-[500]">
                          $2038.00 USD
                        </p>
                      </div> */}

                      <WishListButton />
                    </div>
                  ) : (
                    <div className="px-[24px] py-[20px]">
                      <ContinueButton />
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
