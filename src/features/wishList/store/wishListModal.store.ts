// stores/wishlistModal.ts
import { create } from "zustand";

type WishlistModalState = {
  open: boolean;
  product: any | null;
  openModal: (product: any) => void;
  closeModal: () => void;
};

export const useWishlistModal = create<WishlistModalState>((set) => ({
  open: false,
  product: null,
  openModal: (product) => set({ open: true, product }),
  closeModal: () => set({ open: false, product: null }),
}));
