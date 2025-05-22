"use client";

import Button from "@/components/widgets/Button.widget";
import SearchBar from "@/components/serachBar/searchBar.searchBar";
import DropDownMenuDropdownMenu from "@/components/dropDownMenu/dropDownMenu.dropdown.menu";
import PopularProductCard from "@/features/product/popularProduct/popularPorductCard/popularProductCard.productcard";
import TrendingProductCardProductCard from "@/features/product/trendingProduct/trendingProductCard/trendingProductCard.productCard";
import ViewAll from "@/components/widgets/ViewAll.widget";
import SliderButton from "@/components/sliderButton/sliderButton.sliderButton";
import IconDropdown from "@/components/dropDownIcon/dropDownIcon.component";
import { HttpUtil } from "@/utils/http.utils";
import { useUtils } from "@/context/utils.context";
import { useEffect, useState } from "react";
import { useToast } from "@/context/toast.context";
import { HttpUtilNoSecure } from "@/utils/httpNosecure.utils";

export default function Page() {
  const { apiCaller } = useUtils();
  const http = new HttpUtilNoSecure();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      http.get("v1/ServiceProviderType/GetAllServiceType", {}, {}, (result: any, error: any) => {
        if (error) {
          console.error("Error fetching users:", error);
          // Handle the error, e.g., display an error message to the user
        } else {
          console.log("Users fetched successfully:", result);
          // Process the fetched user data
        }
      });
    };

    fetchData();
  }, []);

  const toast = useToast();
  const register = async () => {
    // setLoading(true);
    const response = await (apiCaller() as HttpUtil).performApiCall(
      "Test/TestEncryption",
      (res: any, error: any, smessage: any) => {
        if (error) {
          console.log(error);
          // setLoading(false);
          // toast.error(error);
          return;
        }
      },
      {
        data: {
          payload: "string",
        },

        getMethod: false,
        silently: true,
      }
    );

    console.log(response);
  };
  useEffect(() => {
    register();
  }, []);
  const handleAction = () => {
    // Simulate an API call or operation
    const successCondition = Math.random() > 0.5; // Randomly show success or error

    if (successCondition) {
      toast.success("Action completed successfully!");
    } else {
      toast.error("Action failed. Please try again.");
    }
  };
  return (
    <div className="p-8 space-y-8">
      <button onClick={handleAction}>Perform Action</button>
      <h1 className="mb-6 text-2xl font-bold">Button Component</h1>

      {/* Primary Buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Primary Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button color="pink" onClick={() => alert("Button clicked!")}>
            Button
          </Button>
          <Button color="gray">Button</Button>
          <Button color="light">Button</Button>
        </div>
      </div>

      {/* Secondary/Outline Buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Outline Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" color="pink">
            Button
          </Button>
          <Button variant="outline" color="gray">
            Button
          </Button>
          <Button variant="outline" color="light">
            Button
          </Button>
          <Button variant="outline" color="white" className="w-[200px]">
            Button
          </Button>
        </div>
      </div>

      {/* Size Variants */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Size Variants</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="small" color="pink">
            Button
          </Button>
          <Button size="medium" color="pink">
            Button
          </Button>
          <Button size="large" color="pink">
            Button
          </Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ghost Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="ghost" color="pink">
            Button
          </Button>
          <Button variant="ghost" color="gray">
            Button
          </Button>
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width</h2>
        <div className="flex flex-col max-w-md gap-4">
          <Button fullWidth color="pink">
            Full Width Button
          </Button>
          <Button fullWidth variant="outline" color="gray">
            Full Width Button
          </Button>
        </div>
      </div>
      <ViewAll />
      <TrendingProductCardProductCard />
      {/*Dropdown Menue*/}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dropdown Menu</h2>
        <div className="flex flex-wrap gap-4">
          <DropDownMenuDropdownMenu
            label="list menu"
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Settings", icon: <i className="ri-tools-line"></i>, onClick: () => {} },
            ]}
            mobileRedirectPath="/"
          />
        </div>
      </div>
      {/*popular product card*/}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Product Card</h2>
        <div className="flex flex-wrap gap-4">
          <PopularProductCard />
        </div>
      </div>
      {/*<SearchBar />*/}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Search Bar</h2>
        <div className="flex flex-wrap gap-4">
          <SearchBar />
        </div>
      </div>
      {/*slider button*/}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Slider Button</h2>
        <div className="relative flex flex-wrap gap-4">
          <SliderButton icon={<i className="ri-arrow-right-s-line"></i>} onClick={() => {}} />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Icon Drop Down Options</h2>
        <button className="h-[43px] text-text-secondary text-[23px] w-[43px] flex justify-center items-center">
          <IconDropdown
            key={"account_id"}
            icon={<img src="/img/user.svg" alt="user-icon" className="h-[23px] w-[23px]" />}
            title="Account"
            options={[
              <button
                key={"signup"}
                className="w-full mt-[23px] text-[14px] font-[500] h-[40px] rounded-md bg-primary text-text"
              >
                Sign Up
              </button>,
              <button
                key={"login"}
                className="w-full text-[14px] font-[500] h-[40px] mb-[23px] rounded-md border border-primary text-text"
              >
                Sign In
              </button>,
            ]}
          />
        </button>
      </div>
    </div>
  );
}
