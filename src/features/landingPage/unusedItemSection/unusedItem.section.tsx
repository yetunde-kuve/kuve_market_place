import React from 'react';
import Button from "@/components/widgets/Button.widget";
import Image from "next/image";

const UnusedItemSection = () => {
    return (
        <section className="bg-white md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
                <div className="flex flex-col gap-4 lg:w-[513px] md:w-[364.8px] order-2 md:order-1">
                    <h2 className="text-[34.18px] md:text-[40px]text-text lg:text-[56px] font-[700]">
                        Turn Unused Items into Cash
                    </h2>
                    <p className="md:text-[16px] text-[12.82px] font-[400] text-text-secondary">
                        Declutter and make money by listing your items today. Quick, easy, and secure selling with local buyers!
                    </p>
                    <div className="w-[159px]">
                        <Button size="medium" color="pink">
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