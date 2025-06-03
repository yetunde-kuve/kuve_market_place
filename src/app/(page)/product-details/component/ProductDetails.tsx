import React, { useState } from 'react';
import FeedbackComponent from "@/app/(page)/product-details/component/Feedbacks";

export interface ShippingInfo {
    courier: string;
    localShipping: string;
    upsGroundShipping: string;
    unishopGlobalExport: string;
}

interface ProductDetailsProps {
    description: string;
    features: string[];
    shippingInfo: ShippingInfo;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({description, features, shippingInfo,}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'feedbacks'>('details');

    const tabs = [
        { id: 'details' as const, label: 'Product Details' },
        { id: 'feedbacks' as const, label: 'FeedBacks' },
        // { id: 'shipping' as const, label: 'Shipping Info' },
    ];

    return (
        <div className="mt-8">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-6 md:px-20 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                    ? 'border-[#000000] text-[#000000]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:gap-12">
                        <div>
                            <p className="text-[#191C1F] text-[16px] font-semibold leading-relaxed pb-2 w-full">Description</p>
                            <p className="text-gray-700 leading-relaxed">{description}</p>
                        </div>
                        <div>
                            <p className="text-[#191C1F] text-[16px] font-semibold leading-relaxed pb-2">Features</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 16.5C16.1421 16.5 19.5 13.1421 19.5 9C19.5 4.85786 16.1421 1.5 12 1.5C7.85786 1.5 4.5 4.85786 4.5 9C4.5 13.1421 7.85786 16.5 12 16.5Z" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 13.5C14.4853 13.5 16.5 11.4853 16.5 9C16.5 6.51472 14.4853 4.5 12 4.5C9.51472 4.5 7.5 6.51472 7.5 9C7.5 11.4853 9.51472 13.5 12 13.5Z" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16.5 15V22.5L12 20.25L7.5 22.5V15" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span className="text-gray-900 text-[14px] font-normal">Free 1 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5 7.50002H20.4938C20.6432 7.49904 20.7894 7.54329 20.9132 7.62695C21.037 7.71061 21.1326 7.82977 21.1875 7.96877L22.5 11.25" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1.5 13.5H16.5" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.625 20.25C18.8676 20.25 19.875 19.2426 19.875 18C19.875 16.7574 18.8676 15.75 17.625 15.75C16.3824 15.75 15.375 16.7574 15.375 18C15.375 19.2426 16.3824 20.25 17.625 20.25Z" stroke="#FF9D98" stroke-width="1.5" stroke-miterlimit="10"/>
                                        <path d="M6.375 20.25C7.61764 20.25 8.625 19.2426 8.625 18C8.625 16.7574 7.61764 15.75 6.375 15.75C5.13236 15.75 4.125 16.7574 4.125 18C4.125 19.2426 5.13236 20.25 6.375 20.25Z" stroke="#FF9D98" stroke-width="1.5" stroke-miterlimit="10"/>
                                        <path d="M15.375 18H8.625" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4.125 18H2.25C2.05109 18 1.86032 17.921 1.71967 17.7803C1.57902 17.6397 1.5 17.4489 1.5 17.25V6.75C1.5 6.55109 1.57902 6.36032 1.71967 6.21967C1.86032 6.07902 2.05109 6 2.25 6H16.5V16.05" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16.5 11.25H22.5V17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H19.875" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span className="text-gray-900 text-[14px] font-normal">Free Shipping & Fasted Delivery</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.5656 11.4188L20.25 12.5719L17.25 6.83444L19.5938 5.66257C19.7679 5.57378 19.9701 5.55747 20.1563 5.61718C20.3425 5.67689 20.4975 5.80778 20.5875 5.98132L22.8937 10.3969C22.9405 10.4853 22.9691 10.5822 22.9779 10.6818C22.9867 10.7814 22.9755 10.8818 22.9449 10.977C22.9143 11.0722 22.865 11.1603 22.7999 11.2362C22.7348 11.3121 22.6551 11.3742 22.5656 11.4188V11.4188Z" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M3.74984 12.4781L1.43422 11.3156C1.34506 11.2719 1.26559 11.2107 1.20055 11.1357C1.13551 11.0607 1.08622 10.9734 1.05561 10.8789C1.02499 10.7844 1.01369 10.6848 1.02236 10.5859C1.03103 10.487 1.05951 10.3908 1.10609 10.3031L3.41234 5.88749C3.50256 5.71408 3.65691 5.58275 3.84253 5.52146C4.02814 5.46017 4.23035 5.47377 4.40609 5.55937L6.74984 6.73124L3.74984 12.4781Z" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M20.25 12.5718L18.75 14.3343L15.3 17.7843C15.206 17.8722 15.092 17.936 14.968 17.9703C14.8439 18.0046 14.7133 18.0083 14.5875 17.9812L9.15 16.6218C9.05067 16.5941 8.95812 16.5462 8.87812 16.4812L3.75 12.478" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18.7506 14.3345L14.6256 11.3345L13.4256 12.2345C12.9057 12.6225 12.2743 12.8321 11.6256 12.8321C10.9768 12.8321 10.3455 12.6225 9.82557 12.2345L9.31932 11.8501C9.23371 11.785 9.16291 11.7025 9.11158 11.608C9.06026 11.5135 9.0296 11.4092 9.02162 11.3019C9.01365 11.1947 9.02854 11.087 9.06531 10.9859C9.10209 10.8849 9.15991 10.7928 9.23495 10.7157L12.9099 7.0501C12.979 6.98141 13.0609 6.927 13.151 6.89C13.2411 6.853 13.3376 6.83414 13.4349 6.83448H17.2506" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.80664 6.73121L11.616 5.32496C11.7869 5.27595 11.9696 5.28924 12.1316 5.36246L15.3754 6.83433" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.5 19.9594L7.67813 19.2469C7.56313 19.2209 7.45666 19.166 7.36875 19.0875L5.25 17.25" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span className="text-gray-900 text-[14px] font-normal">100% Money-back guarantee</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.1406 12.7498H18.1406C17.7428 12.7498 17.3613 12.9079 17.08 13.1892C16.7987 13.4705 16.6406 13.852 16.6406 14.2498V17.9998C16.6406 18.3976 16.7987 18.7792 17.08 19.0605C17.3613 19.3418 17.7428 19.4998 18.1406 19.4998H19.6406C20.0384 19.4998 20.42 19.3418 20.7013 19.0605C20.9826 18.7792 21.1406 18.3976 21.1406 17.9998V12.7498ZM21.1406 12.7498C21.1407 11.5616 20.9054 10.3851 20.4484 9.28826C19.9915 8.19141 19.3218 7.19591 18.4781 6.3592C17.6344 5.52248 16.6334 4.86112 15.5328 4.41326C14.4322 3.9654 13.2538 3.73992 12.0656 3.74982C10.8782 3.74117 9.70083 3.96757 8.60132 4.41598C7.5018 4.8644 6.50189 5.52596 5.6592 6.36255C4.81651 7.19914 4.1477 8.19422 3.69131 9.29045C3.23492 10.3867 2.99997 11.5624 3 12.7498V17.9998C3 18.3976 3.15804 18.7792 3.43934 19.0605C3.72064 19.3418 4.10218 19.4998 4.5 19.4998H6C6.39782 19.4998 6.77936 19.3418 7.06066 19.0605C7.34196 18.7792 7.5 18.3976 7.5 17.9998V14.2498C7.5 13.852 7.34196 13.4705 7.06066 13.1892C6.77936 12.9079 6.39782 12.7498 6 12.7498H3" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span className="text-gray-900 text-[14px] font-normal">24/7 Customer support</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V6C21.75 5.58579 21.4142 5.25 21 5.25Z" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.75 15.75H18.75" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.25 15.75H12.75" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M2.25 9.08447H21.75" stroke="#FF9D98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span className="text-gray-900 text-[14px] font-normal">Secure payment method</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#191C1F] text-[16px] font-semibold leading-relaxed pb-2">Shopping Information</p>
                            <div className="space-y-4 text-[14px]">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Courier:</span>
                                    <span className="text-gray-700">{shippingInfo.courier}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Local Shipping:</span>
                                    <span className="text-gray-700">{shippingInfo.localShipping}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-900">UPS Ground Shipping:</span>
                                    <span className="text-gray-700">{shippingInfo.upsGroundShipping}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-900">Unishop Global Export:</span>
                                    <span className="text-gray-700">{shippingInfo.unishopGlobalExport}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

                {activeTab === 'feedbacks' && (
                   <FeedbackComponent />
                )}
            </div>
        </div>
    );
};