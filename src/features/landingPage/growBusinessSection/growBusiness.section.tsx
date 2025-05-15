import React from 'react';
import Button from "@/components/widgets/Button.widget";
import {useRouter} from "next/navigation";

const GrowBusinessSection = () => {
    const router = useRouter();
    const features = [
        {
            icon: "/img/editIcon.svg",
            title: "Customised Storefront",
            description: "Set up your store by organising products into categories for a professional look"
        },
        {
            icon: "/img/boostIcon.svg",
            title: "Boost Your Visibility",
            description: "Advertise your business to attract more local buyers and increase your sales"
        },
        {
            icon: "/img/customerIcon.svg",
            title: "Engage with Customers",
            description: "Connect directly with buyers, answer inquiries, and build customer trust."
        },
        {
            icon: "/img/dashboardIcon.svg",
            title: "Smart Sales Dashboard",
            description: "Track your sales, inventory, and performance in one easy-to-use dashboard"
        }
    ];

    const routeToRegister = () => {
        router.push("/auth/signUp?activity=sell");
    }
    return (
        <section className="md:py-[48px] md:px-[32px] py-[39px] px-[14px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
            <div>
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-[40px] md:text-[56px] lg:text-[56px] font-bold text-text mb-4">
                        Grow Your Business!
                    </h2>
                    <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
                        Reach more customers, promote your brand, and manage your sales with our powerful tools designed for businesses.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-6 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white md:p-6 lg:p-8 p-6 rounded-[16px] shadow-sm flex flex-col items-start h-[288px]"
                        >
                            <div className="p-[12px] rounded-lg bg-background-Secondary">
                                <img
                                    src={feature.icon}
                                    alt={`${feature.title} icon`}
                                    className="h-[26.67px] w-[26.67px]"
                                />
                            </div>
                            <h3 className="font-semibold text-lg mt-4 mb-2 text-text">
                                {feature.title}
                            </h3>
                            <p className="text-text-secondary text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <div className="w-[145px]">
                        <Button size="medium" color="pink" onClick={routeToRegister}>
                            Join Now!
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowBusinessSection;