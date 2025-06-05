"use client";

import { useState } from "react";

const NotificationSwitch = ({
  enabled,
  onChange,
  activeColor = "#FF9D9D",
  inactiveColor = "#B0B7C3",
}: {
  enabled: boolean;
  onChange: () => void;
  activeColor?: string;
  inactiveColor?: string;
}) => {
  return (
    <button
      onClick={onChange}
      className="relative w-10 h-5 transition-colors duration-300 rounded-full focus:outline-none"
      style={{
        backgroundColor: enabled ? activeColor : inactiveColor,
      }}
    >
      <span
        className={`absolute top-0.5 left-[2px] h-4 w-4 bg-white rounded-full shadow transition-transform duration-300 ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
};

export default function NotificationSettings() {
  const [emailProductUpdates, setEmailProductUpdates] = useState(true);
  const [emailSecurityUpdates, setEmailSecurityUpdates] = useState(true);
  const [phoneSecurityUpdates, setPhoneSecurityUpdates] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-white border shadow-sm rounded-xl border-slate-100">
      {/* Email Section */}
      <div className="grid grid-cols-2">
        <h2 className="text-sm font-semibold text-[#191C1F] mb-4">Email</h2>

        {/* Product Updates */}
        <div>
          <div className="flex items-start justify-between py-4 border-t first:border-0">
            <div>
              <p className="text-sm font-medium text-[#191C1F]">Product updates</p>
              <p className="text-sm text-[#5F6C72]">News, announcements, and product updates.</p>
            </div>
            <NotificationSwitch
              enabled={emailProductUpdates}
              onChange={() => setEmailProductUpdates(!emailProductUpdates)}
              activeColor="#FF9D9D"
            />
          </div>

          {/* Security Updates */}
          <div className="flex items-start justify-between py-4 border-t">
            <div>
              <p className="text-sm font-medium text-[#191C1F]">Security updates</p>
              <p className="text-sm text-[#5F6C72]">
                Important notifications about your account security.
              </p>
            </div>
            <NotificationSwitch
              enabled={emailSecurityUpdates}
              onChange={() => setEmailSecurityUpdates(!emailSecurityUpdates)}
              activeColor="#FF9D9D"
            />
          </div>
        </div>
      </div>

      {/* Phone Section */}
      <div className="pt-6 border-t">
        <div className="grid grid-cols-2">
          <h2 className="text-sm font-semibold text-[#191C1F] mb-4">Phone notifications</h2>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#191C1F]">Security updates</p>
              <p className="text-sm text-[#5F6C72]">
                Important notifications about your account security.
              </p>
            </div>
            <NotificationSwitch
              enabled={phoneSecurityUpdates}
              onChange={() => setPhoneSecurityUpdates(!phoneSecurityUpdates)}
              activeColor="#656D76"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
