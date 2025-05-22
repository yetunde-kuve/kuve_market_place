import React, {useEffect, useState} from 'react';
import Button from "@/components/widgets/Button.widget";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {MPHttpUtilNoSecure} from "@/utils/MPHttpNosecure.utils";

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
            <div className="relative w-full lg:h-[310px] md:h-auto h-[168px]">
                {/* Skeleton Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse shadow-xl rounded-2xl" />

                {/* Skeleton Content */}
                <div className="relative flex items-center justify-between w-full h-full gap-6 lg:gap-20 md:gap-10">


                    {/* Skeleton Text Content (Left Side) */}
                    <div className="z-10 flex flex-col lg:w-[60%] sm:w-[100%] md:w-[100%] items-start justify-center p-6 lg:pl-28 md:pl-14 space-y-4">
                        {/* Skeleton Title */}
                        <div className="h-6 bg-gray-300 rounded animate-pulse w-32"></div>

                        {/* Skeleton Description */}
                        <div className="space-y-2">
                            <div className="h-8 bg-gray-300 rounded animate-pulse w-64 lg:h-12"></div>
                            <div className="h-8 bg-gray-300 rounded animate-pulse w-48 lg:h-12"></div>
                        </div>

                        {/* Skeleton Button */}
                        <div className="h-10 bg-gray-300 rounded-full animate-pulse w-32 mt-4"></div>
                    </div>

                    {/* Skeleton Image (Right Side) */}
                    <div className="justify-end flex-shrink-0 md:pr-16 lg:pr-28 py-4">
                        <div className="lg:w-[200px] lg:h-[200px] md:w-[192px] md:h-[212px] w-[113px] h-[112px] bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
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