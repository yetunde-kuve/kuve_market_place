"use client";

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

const referrals = [
  {
    name: "Cao Yu",
    email: "cao.yu@gmail.com",
    avatar: "/avatars/avatar1.png", // Replace with your local asset or Next/Image import
    date: "March 1st, 2025",
    time: "9:35AM",
    amount: "₦800.00",
  },
  {
    name: "Siegbert Gottfried",
    email: "siegbert.gottfried@gmail.com",
    avatar: "/avatars/avatar2.png",
    date: "April 20th, 2025",
    time: "9:35AM",
    amount: "₦800.00",
  },
  {
    name: "Jonn Doe",
    email: "jonn.doe@gmail.com",
    avatar: "/avatars/avatar3.png",
    date: "May 31st, 2025",
    time: "9:35AM",
    amount: "₦800.00",
  },
];

export default function ReferralTable() {
  const referralLink = "https://shorturl.at/gcuJu";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#191C1F]">Refer Kuve</h2>
          <p className="text-sm text-[#5F6C72]">Refer a friend and win money to spend on Kuve</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#FAFAFA] border border-[#E4E7E9] rounded-md px-3 py-2 text-sm">
            <span className="text-[#191C1F] mr-2">{referralLink}</span>
            <button onClick={handleCopy} className="text-[#5F6C72] hover:text-black">
              {copied ? (
                <FiCheck className="text-green-500" />
              ) : (
                <FaRegCopy className="text-primary" />
              )}
            </button>
          </div>
          <button className="px-4 py-2 bg-[#000222] text-white rounded-full text-sm hover:bg-[#11192d]">
            Share Link
          </button>
        </div>
      </div>

      <div className="overflow-hidden border rounded-md">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_200px_150px] bg-[#F2F4F5] text-xs font-medium uppercase text-[#5F6C72] px-6 py-3">
          <div>Referral</div>
          <div>Date & Time</div>
          <div className="text-right">Amount Earned</div>
        </div>

        {/* Table Rows */}
        {referrals.map((ref, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1fr_200px_150px] items-center px-6 py-4 border-t text-sm text-[#191C1F]"
          >
            {/* Referral Info */}
            <div className="flex items-center gap-3">
              <img
                src={ref.avatar}
                alt={ref.name}
                className="object-cover border rounded-full w-9 h-9"
              />
              <div>
                <div className="font-medium">{ref.name}</div>
                <div className="text-xs text-[#5F6C72]">{ref.email}</div>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <div>{ref.date}</div>
              <div className="text-xs text-[#5F6C72]">{ref.time}</div>
            </div>

            {/* Amount */}
            <div className="font-medium text-right">{ref.amount}</div>
          </div>
        ))}

        {/* Footer Row */}
        <div className="grid grid-cols-[1fr_200px_150px] bg-[#F9FAFB] px-6 py-3 text-sm font-medium">
          <div className="uppercase text-[#5F6C72]">Total Amount Earned:</div>
          <div></div>
          <div className="text-right text-[#191C1F]">₦1,600.00</div>
        </div>
      </div>
    </div>
  );
}
