import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistItem = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type WishlistGroup = {
  name: string;
  items: WishlistItem[];
};

type WishlistState = {
  lists: WishlistGroup[];
  addToWishlist: (item: WishlistItem, listName?: string) => void;
  removeFromWishlist: (id: string, listName: string) => void;
  clearWishlist: () => void;
  createList: (name: string) => void;
  getAllListNames: () => string[];
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      lists: [
        {
          name: "My Wishlist",
          items: [],
        },
      ],

      addToWishlist: (item, listName = "My Wishlist") => {
        const lists = get().lists;
        const listIndex = lists.findIndex((l) => l.name === listName);

        if (listIndex === -1) {
          // Create new list if not found
          const newList = { name: listName, items: [item] };
          set({ lists: [...lists, newList] });
        } else {
          const list = lists[listIndex];
          const exists = list.items.some((i) => i.id === item.id);

          if (!exists) {
            const updatedList = {
              ...list,
              items: [...list.items, item],
            };
            const updatedLists = [...lists];
            updatedLists[listIndex] = updatedList;
            set({ lists: updatedLists });
          }
        }
      },

      removeFromWishlist: (id, listName) => {
        const lists = get().lists;
        const listIndex = lists.findIndex((l) => l.name === listName);
        if (listIndex === -1) return;

        const updatedList = {
          ...lists[listIndex],
          items: lists[listIndex].items.filter((item) => item.id !== id),
        };

        const updatedLists = [...lists];
        updatedLists[listIndex] = updatedList;
        set({ lists: updatedLists });
      },

      clearWishlist: () =>
        set({
          lists: [
            {
              name: "My Wishlist",
              items: [],
            },
          ],
        }),

      createList: (name) => {
        const exists = get().lists.some((l) => l.name === name);
        if (!exists) {
          set((state) => ({
            lists: [...state.lists, { name, items: [] }],
          }));
        }
      },

      getAllListNames: () => get().lists.map((l) => l.name),
    }),
    {
      name: "wishlist-storage-grouped",
    }
  )
);
