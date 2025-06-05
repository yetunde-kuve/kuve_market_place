// components/WishlistModal.tsx
"use client";
import {
  Backdrop,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useWishlistStore } from "../store/wishlistStore";
import { useWishlistModal } from "../store/wishListModal.store";

const WishlistModal = () => {
  const { open, product, closeModal } = useWishlistModal();
  const getAllListNames = useWishlistStore((state) => state.getAllListNames);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const createList = useWishlistStore((state) => state.createList);

  const [wishlistNames, setWishlistNames] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState("");
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    if (getAllListNames) {
      const names = getAllListNames();
      setWishlistNames(names);
    }
  }, [getAllListNames, open]); // Re-fetch when modal opens

  const handleAdd = () => {
    const listToUse = newListName || selectedList || "My Wishlist";
    if (newListName && createList) createList(newListName);
    if (product) addToWishlist(product, listToUse);
    closeModal();
    setSelectedList("");
    setNewListName("");
  };

  return (
    <Backdrop open={open} sx={{ zIndex: 9999 }}>
      <div className="mx-4 bg-white md:mx-0 rounded-[20px] md:w-[461px] w-full">
        <div className="flex flex-col gap-6 md:p-[28px] p-6 ">
          <p className="text-[20px] font-[600] text-center">Add to Wishlist</p>
          <Divider />

          <div className="flex flex-col gap-4">
            <p className="text-[14px] text-center font-[400]">
              Add product to “My Wishlist” or create a new list{" "}
            </p>
            <div>
              <p className="text-[14px] font-[400] text-[#121212]">List name</p>
              <input
                type="text"
                placeholder="e.g: Birthday list for my son"
                className="h-[40px] w-full focus:outline-none rounded-md border border-[#828294] px-4 text-[14px] font-[400]"
              />
            </div>
            <div>
              <p className="text-[14px] font-[400] text-[#121212]">
                Select Whistlist group
              </p>

              <Select
                fullWidth
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                displayEmpty
                MenuProps={{
                  disablePortal: true,
                  PaperProps: {
                    sx: {
                      zIndex: 13000,
                    },
                  },
                }}
                sx={{
                  height: "40px",
                  width: "100%",
                  borderRadius: "8px", // less rounded
                  border: "1px solid #828294",
                  px: 2,
                  fontSize: "14px",
                  fontWeight: 400,
                  backgroundColor: "white",

                  // override outline border radius & border
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "none",
                  },

                  // override root input border radius if needed
                  "&.MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },

                  // select box styles
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                  },

                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
              >
                <MenuItem value="">Select a Wishlist</MenuItem>
                {wishlistNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAdd}
                className="w-full bg-[#000222] text-white text-[14px] font-[400] h-[40px] rounded-lg"
              >
                Add to wishlist
              </button>
              <button
                onClick={closeModal}
                className="w-full border border-[#000222] text-[#000222] text-[14px] font-[400] h-[40px] rounded-lg"
              >
                Cancel
              </button>
            </div>
            {/* <Box display="flex" justifyContent="space-between">
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="contained" onClick={handleAdd}>
                Save
              </Button>
            </Box> */}
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
export default WishlistModal;
