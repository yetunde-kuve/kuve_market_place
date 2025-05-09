"use client";

import DropdownList from "@/components/dropDownMenu/dropDownMenu.dropdown.menu";
import NavBar from "@/components/navBar/navBar.navBar";
import SearchBar from "@/components/serachBar/searchBar.searchBar";
import SliderButton from "@/components/sliderButton/sliderButton.sliderButton";
import { useCartStore } from "@/features/cart/store/useCartStore.store";
import FutureProduct from "@/features/landingPage/futureProductsection/futureproduction.section";
import PopularProductSection from "@/features/landingPage/poppularProductSection/popularproduct.section";
import Slider from "@/features/landingPage/slider/slider/slider";
import PopularProductCard from "@/features/product/popularProduct/popularPorductCard/popularProductCard.productcard";
import { useThemeStore } from "@/store/useThemeStore.store";
import { useState } from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import TrendingProduct from "@/features/landingPage/trendingProductSection/trendingProduct";
import UnusedItemSection from "@/features/landingPage/unusedItemSection/unusedItem.section";
import GrowBusinessSection from "@/features/landingPage/growBusinessSection/growBusiness.section";

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

  return (
    <div className="flex flex-col lg:gap-[52px] md:gap-[39px] gap-[26px] lg:px-[88px] md:px-[32px] px-4  lg:mt-[200px] md:mt-[200px] mt-[220px]">
      <Slider />
      <PopularProductSection />
      <FutureProduct />
      <TrendingProduct />
      <UnusedItemSection />
      <GrowBusinessSection />
    </div>
  );
}
