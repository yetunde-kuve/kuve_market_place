"use client";

import { useCartStore } from "@/features/cart/store/useCartStore.store";
import { useThemeStore } from "@/store/useThemeStore.store";
import { useState } from "react";

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
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-[400px]">
        <h1>Shopping Cart</h1>
        <button
          onClick={handleAddToCart}
          className="bg-primary text-text w-full rounded-full  h-[40px]"
        >
          Add Item to cart
        </button>

        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.image} width={50} alt="ddhdhd" />
              <h3>{item.name}</h3>
              <p>price:{item.price}</p>
              <p>Quantity:{item.quantity}</p>
              <button
                onClick={() => {
                  handleRemoveFromCart(item.id);
                }}
              >
                Remove
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={handleClearCart}>clear cart</button>
            </div>
          ))}
        </div>
        {/* <button
        onClick={toggleTheme}
        className={`p-2 text-white rounded bg-primary dark:bg-primary-dark`}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1 className="text-primary dark:text-primary-dark">Hello, World!</h1>
      <button className="w-full shadow-md dark:bg-background-dark bg-background">jjfjdjdjd</button> */}
      </div>
    </div>
  );
}
