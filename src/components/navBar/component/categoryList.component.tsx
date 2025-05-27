import DropDownMenuDropdownMenu from "@/components/dropDownMenu/dropDownMenu.dropdown.menu";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [visibleCount, setVisibleCount] = useState(7);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1024 && width <= 1449) {
        setVisibleCount(6);
      } else if (width >= 768 && width <= 1023) {
        setVisibleCount(4);
      } else if (width >= 320 && width <= 767) {
        setVisibleCount(1);
      } else {
        setVisibleCount(6); // fallback/default
      }
    };

    updateVisibleCount(); // initial run
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);
  const list = [
    { id: 1, name: "Groceries" },
    { id: 2, name: "Premium Fruits" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Fashion" },
    { id: 5, name: "Electronics" },
    { id: 6, name: "Beauty" },
    { id: 7, name: "Home Improvement" },
  ];
  const freshProduceSubcategories = [
    {
      title: "Leafy Greens",
      categories: [
        { id: 1, label: "Spinach" },
        { id: 2, label: "Lettuce" },
        { id: 3, label: "Kale" },
        { id: 4, label: "Arugula" },
      ],
    },
    {
      title: "Root Vegetables",
      categories: [
        { id: 5, label: "Carrots" },
        { id: 6, label: "Beets" },
        { id: 7, label: "Radishes" },
        { id: 8, label: "Turnips" },
      ],
    },
    {
      title: "Fruits",
      categories: [
        { id: 9, label: "Apples" },
        { id: 10, label: "Bananas" },
        { id: 11, label: "Grapes" },
        { id: 12, label: "Oranges" },
      ],
    },
    {
      title: "Herbs",
      categories: [
        { id: 13, label: "Basil" },
        { id: 14, label: "Cilantro" },
        { id: 15, label: "Mint" },
        { id: 16, label: "Parsley" },
      ],
    },
    {
      title: "Cruciferous",
      categories: [
        { id: 17, label: "Broccoli" },
        { id: 18, label: "Cauliflower" },
        { id: 19, label: "Cabbage" },
        { id: 20, label: "Brussels Sprouts" },
      ],
    },
    {
      title: "Tubers",
      categories: [
        { id: 21, label: "Potatoes" },
        { id: 22, label: "Yams" },
        { id: 23, label: "Sweet Potatoes" },
        { id: 24, label: "Cassava" },
      ],
    },
    {
      title: "Gourds",
      categories: [
        { id: 25, label: "Pumpkin" },
        { id: 26, label: "Zucchini" },
        { id: 27, label: "Squash" },
        { id: 28, label: "Cucumber" },
      ],
    },
    {
      title: "Exotics",
      categories: [
        { id: 29, label: "Dragon Fruit" },
        { id: 30, label: "Passion Fruit" },
        { id: 31, label: "Durian" },
        { id: 32, label: "Rambutan" },
      ],
    },
  ];
  return (
    <div
    // className={`transition-all duration-300 ${isScrolling ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}
    >
      <div>
        <div className="flex gap-[7px] items-center px-1 py-1 overflow-x-auto scrollbar-none whitespace-nowrap transition-all duration-300 ease-in-out">
          {list.slice(0, visibleCount).map((item) => (
            <DropDownMenuDropdownMenu
              key={item.id}
              label={item.name}
              mobileRedirectPath=""
              items={freshProduceSubcategories}
            />
          ))}
          <DropDownMenuDropdownMenu
            key="All Categories"
            label="All Categories"
            mobileRedirectPath=""
            items={freshProduceSubcategories}
          />
        </div>
        {/* {showLeftButton && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 h-[24px] w-[24px] hidden lg:flex justify-center items-center hover:bg-primary transform -translate-y-1/2 bg-gray-500 rounded-full top-1/2 opacity-70 hover:opacity-100"
                >
                  &lt;
                </button>
              )}
              {showRightButton && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 h-[24px] w-[24px] hidden lg:flex justify-center items-center hover:bg-primary transform -translate-y-1/2 bg-gray-500 rounded-full top-1/2 opacity-70 hover:opacity-100"
                >
                  &gt;
                </button>
              )} */}
      </div>
    </div>
  );
}
