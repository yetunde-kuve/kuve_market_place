"use client";

import DropdownList from "@/components/dropDownMenu/dropDownMenu.dropdown.menu";
import SearchBar from "@/components/serachBar/searchBar.searchBar";
import SliderButton from "@/components/sliderButton/sliderButton.sliderButton";
import { useCartStore } from "@/features/cart/store/useCartStore.store";
import PopularProductCard from "@/features/product/popularProduct/popularPorductCard/popularProductCard.productcard";
import { useThemeStore } from "@/store/useThemeStore.store";
import { useState } from "react";
import { MdLogout, MdSettings } from "react-icons/md";

export default function Login() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCartStore();
  const [newItem, setNewItem] = useState({
    id: "123",
    name: "Cake",
    price: 10,
    quantity: 1,
    image: "https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice.jpg",
  });

  const handleAddToCart = () => {
    addToCart(newItem);
  };
  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };
  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  const handleClearCart = () => {
    clearCart();
  };

  return <div className="flex items-center justify-center w-full h-screen"></div>;
}
