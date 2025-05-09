"use client";

import Button from "@/components/widgets/Button.widget";
import SearchBar from "@/components/serachBar/searchBar.searchBar";
import DropDownMenuDropdownMenu from "@/components/dropDownMenu/dropDownMenu.dropdown.menu";
import PopularProductCard from "@/features/product/popularProduct/popularPorductCard/popularProductCard.productcard";
import TrendingProductCardProductCard
    from "@/features/product/trendingProduct/trendingProductCard/trendingProductCard.productCard";

export default function Page() {
    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold mb-6">Button Component</h1>

            {/* Primary Buttons */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Primary Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button color="pink" onClick={() => alert('Button clicked!')}>Button</Button>
                    <Button color="gray">Button</Button>
                    <Button color="light">Button</Button>
                </div>
            </div>

            {/* Secondary/Outline Buttons */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Outline Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="outline" color="pink">Button</Button>
                    <Button variant="outline" color="gray">Button</Button>
                    <Button variant="outline" color="light">Button</Button>
                    <Button variant="outline" color="white" className="w-[200px]">Button</Button>
                </div>
            </div>

            {/* Size Variants */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Size Variants</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="small" color="pink">Button</Button>
                    <Button size="medium" color="pink">Button</Button>
                    <Button size="large" color="pink">Button</Button>
                </div>
            </div>

            {/* Ghost Buttons */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Ghost Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="ghost" color="pink">Button</Button>
                    <Button variant="ghost" color="gray">Button</Button>
                </div>
            </div>

            {/* Full Width */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Full Width</h2>
                <div className="flex flex-col gap-4 max-w-md">
                    <Button fullWidth color="pink">Full Width Button</Button>
                    <Button fullWidth variant="outline" color="gray">Full Width Button</Button>
                </div>
            </div>
            <PopularProductCard />

            <TrendingProductCardProductCard />
            {/*<SearchBar />*/}
            {/*<DropDownMenuDropdownMenu label={'hjjdhhjd'} items={[{label: 'gfdddgf'}]} />*/}
        </div>

    );
}