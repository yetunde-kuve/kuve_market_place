import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistItem = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type WishlistState = {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (!exists) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage", // key in localStorage
    }
  )
);
