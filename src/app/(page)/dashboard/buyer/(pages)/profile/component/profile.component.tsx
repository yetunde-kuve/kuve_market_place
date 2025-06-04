"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/utils/cn.utils"; // Optional if you're using classnames utility
import { Avatar } from "@mui/material";
import DP from "../../../../../../../../public/svg/avater-profile.svg";
import ProfileTab from "./profile.tab";
import DeliveryTab from "./delivery.tab";
import ReferralTable from "./referral.tab";
import NotificationSettings from "./notification.tab";

const tabs = ["Profile", "Delivery", "Referral", "Notification", "Security"];

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div className="max-w-5xl bg-white rounded-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex gap-2">
            <div className="relative h-[84px] w-[84px]">
              <span className="bg-white w-[24px] h-[24px] rounded-full flex justify-center items-center absolute z-10 right-0">
                <i className="ri-verified-badge-fill text-primary text-[17px] "></i>
              </span>
              <Avatar src={"/svg/avater-profile.svg"} className="h-[84px] w-[84px]" />
            </div>

            <div>
              <p className="text-sm text-gray-500">anikavisser@gmail.com</p>
              <p className="text-xs text-gray-400">MEMBER SINCE: 29th, May 2025</p>
            </div>
          </div>
          <h1 className="mt-3 text-lg font-semibold text-gray-800">Anika Visser</h1>
        </div>
        <div className="flex items-center gap-[20px]">
          <button
            onClick={() => setCanEdit(true)}
            className="bg-[#000222] text-white text-sm px-[10px] gap-[18px] py-[9px] rounded-[12px] flex items-center justify-center"
          >
            <i className="ri-edit-box-line"></i> Edit Profile
          </button>
          <i className="ri-more-fill text-[#6C737F]"></i>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "pb-2 text-sm font-medium",
              activeTab === tab ? "text-[#000222] border-b-2 border-[#000222]" : "text-gray-500"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Profile" && (
          <ProfileTab canEdit={canEdit} onComplete={() => setCanEdit(false)} />
        )}
        {activeTab === "Delivery" && <DeliveryTab />}
        {activeTab === "Referral" && <ReferralTable />}
        {activeTab === "Notification" && <NotificationSettings />}
        {activeTab === "Security" && <p>profile</p>}
      </div>
    </div>
  );
}
