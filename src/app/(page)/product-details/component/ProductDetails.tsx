import React, { useState } from 'react';

export interface ShippingInfo {
    freeShipping: boolean;
    estimatedDays: string;
    returnPolicy: string;
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
                    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                        <div className="prose prose-sm max-w-none w-5/12">
                            <p className="text-[#191C1F] text-[16px] font-semibold leading-relaxed pb-2">Description</p>
                            <p className="text-gray-700 leading-relaxed">{description}</p>
                        </div>
                        <div>
                            <p className="text-[#191C1F] text-[16px] font-semibold leading-relaxed pb-2">Shopping Information</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Free Shipping:</span>
                                    <span className="text-gray-700">{shippingInfo.freeShipping ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Estimated Delivery:</span>
                                    <span className="text-gray-700">{shippingInfo.estimatedDays}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-900">Return Policy:</span>
                                    <span className="text-gray-700">{shippingInfo.returnPolicy}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#191C1F] text-[16px] font-semibold leading-relaxed pb-2">Shopping Information</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Free Shipping:</span>
                                    <span className="text-gray-700">{shippingInfo.freeShipping ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Estimated Delivery:</span>
                                    <span className="text-gray-700">{shippingInfo.estimatedDays}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-900">Return Policy:</span>
                                    <span className="text-gray-700">{shippingInfo.returnPolicy}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

                {activeTab === 'feedbacks' && (
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span className="text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};