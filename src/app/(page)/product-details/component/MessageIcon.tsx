import React, { useState } from 'react';
import Image from "next/image";
import {MessageSquareMore} from "lucide-react";

// Message Icon Component
export const MessageIcon: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Fixed Message Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onMouseOver={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="bg-black text-white p-3 rounded-full shadow-lg bg-[#000222] hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                    aria-label="Open chat"
                >
                    <MessageSquareMore className="w-12 h-12"/>
                </button>
            </div>

            {/* Chat Window (shows when clicked) */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Message Vendor</h3>
                            <p className="text-sm text-gray-300">Online now</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-300"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-3">
                            <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                                <p className="text-sm">Hello! How can I help you with this product?</p>
                                <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};