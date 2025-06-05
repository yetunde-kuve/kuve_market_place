import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {MessageSquareMore} from "lucide-react";

// Message Icon Component
export const MessageIcon: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowText(prev => !prev);
        }, 2000); // Toggle every 2 seconds

        // Cleanup function - this will only run when component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once and keeps running

    return (
        <>
            {/* Fixed Message Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {/* Animated Text - positioned behind/under button */}
                <div
                    className={`
                        absolute right-2 top-1/2 transform -translate-y-1/2
                        bg-white text-[#000000] px-4 py-1 pr-16 rounded-lg shadow-lg
                        transition-all duration-300 ease-in-out
                        ${showText ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
                    `}
                >
                    <span className="text-sm font-medium whitespace-nowrap">
                        Message Vendor
                    </span>
                </div>

                {/* Message Button - positioned on top of text */}
                <button
                    onMouseOver={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="bg-black text-white p-3 rounded-full shadow-lg bg-[#000222] hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center relative z-10"
                    aria-label="Open chat"
                >
                    <MessageSquareMore className="w-12 h-12"/>
                </button>
            </div>
        </>
    );
};