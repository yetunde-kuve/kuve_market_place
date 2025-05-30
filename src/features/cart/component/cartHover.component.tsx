"use client";

import { useState, useRef, useEffect } from "react";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ViewCartOutlineButton from "./viewCart.component";
import CartProductHoverCard from "./CartProductHoverCard.component";
import CheckOutButton from "./checkOutButton.component";
import { useCartStore } from "../store/useCartStore.store";
import EmptyCartWidget from "./emptyCart.component";
import ContinueButton from "./continueButton.component";
import Camera from "../../../../public/svg/camerW.svg"; // Replace with your actual image path

export default function CartDropdown() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { cart, removeFromCart } = useCartStore();

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
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
            {cart.length}
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
        className="z-[9999]"
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
                  {cart.length > 0 && (
                    <div className="sticky top-0 z-10 px-[24px] py-3 bg-white border-b">
                      <p className="text-[16px] font-[500] text-[#191C1F]">
                        SHOPPING CART{" "}
                        <span className="text-[#5F6C72]">{`(${cart.length})`}</span>
                      </p>
                    </div>
                  )}

                  {/* Scrollable Content */}
                  {cart.length > 0 ? (
                    <div className="flex-1 px-[24px] py-[20px] space-y-3 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-[12px]"
                        >
                          <div className="flex-1">
                            <CartProductHoverCard
                              price={item.price}
                              title={item.name}
                              quantity={item.quantity}
                              img={Camera}
                            />
                          </div>
                          <i
                            onClick={() => removeFromCart(item.id)}
                            className="ri-close-fill hover:text-primary cursor-pointer text-[#929FA5] text-[16px] transition-transform duration-300 hover:rotate-90"
                          ></i>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <EmptyCartWidget />
                    </div>
                  )}

                  {/* Footer */}
                  {cart.length > 0 ? (
                    <div className="px-[24px] py-[20px] border-t space-y-[20px]">
                      <div className="flex justify-between ">
                        <p className="text-[#475156] text-[14px] font-[400]">
                          Sub-Total:
                        </p>
                        <p className="text-[#191C1F] text-[14px] font-[500]">
                          $2038.00 USD
                        </p>
                      </div>
                      <div className="space-y-[12px]">
                        <CheckOutButton />
                        <ViewCartOutlineButton />
                      </div>
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
