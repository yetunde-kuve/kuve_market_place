import React, {useEffect, useState} from 'react';
import Button from "@/components/widgets/Button.widget";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {MPHttpUtilNoSecure} from "@/utils/MPHttpNosecure.utils";
import UnusedItemSkeleton from "@/components/skeleton/unusedItem/unusedItem.skeleton";

interface Product {
    id: number;
    title: string;
    imagePath: string;
    bannerDescription: string;
}

const UnusedItemSection = () => {
    const router = useRouter()
    const mpHttp = new MPHttpUtilNoSecure()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Product[]>([])

    const routeToRegister = () => {
        router.push("/auth/signUp?activity=sell&type=list");
    }

    useEffect(() => {
        const fetchBanner = async () => {
            setLoading(true);
            setError(null);

            mpHttp.get("InfoBanner/GetAllInfoBanner", {}, {}, (result: any, error: any) => {
                if (error) {
                    console.error("Error fetching banners:", error);
                    setError("Failed to load banners");
                    setLoading(false);
                } else {
                    console.log("Banner fetched successfully:", result);

                    // Check if result is an array and has items
                    if (Array.isArray(result) && result.length > 0) {
                        setData(result);
                    } else {
                        setError("No banners available");
                    }
                    setLoading(false);
                }
            });
        };

        fetchBanner();
    }, []);

    if (loading) {
        return (
            <UnusedItemSkeleton />
        );
    }

    // Error state
    if (error) {
        return (
            <div className="relative w-full lg:h-[310px] md:h-auto h-[168px] flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    // Show empty state
    if (data.length === 0) {
        return (
            <div className="relative w-full lg:h-[310px] md:h-auto h-[168px] flex items-center justify-center">
                <div className="text-white">No banners available</div>
            </div>
        );
    }
    return (
        <section className="bg-white md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
                <div className="flex flex-col gap-4 lg:w-[513px] md:w-[364.8px] order-2 md:order-1">
                    <h2 className="text-[34.18px] md:text-[40px]text-text lg:text-[56px] font-[700]">
                        {data[0]?.title}
                    </h2>
                    <p className="md:text-[16px] text-[12.82px] font-[400] text-text-secondary">
                        {data[0]?.bannerDescription}
                    </p>
                    <div className="w-[159px]">
                        <Button size="medium" color="pink" onClick={routeToRegister}>
                            List an Item
                        </Button>
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <Image
                        src={"/img/camera.png"}
                        className="lg:h-[410px] lg:w-[620px] md:w-[440.89px] md:h-[291.56px] w-[376.73px] h-[240.13px]"
                        alt="unused product"
                        width={620}
                        height={410}
                    />
                </div>
            </div>
        </section>
    );
};

export default UnusedItemSection;