import { Avatar, Divider } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
interface ProfileTabprop {
  canEdit: boolean;
  onComplete: () => void;
}
export default function ProfileTab({ canEdit, onComplete }: ProfileTabprop) {
  return (
    <div>
      <div className="p-4 mt-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-700">Profile Progress</p>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-2 rounded-full bg-primary" style={{ width: "30%" }}></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500">30% Set Up Complete</p>
          <button className="flex items-center mt-2 text-sm font-medium text-[#000222]">
            Continue profile setup <FaArrowRight className="ml-1 text-xs" />
          </button>
        </div>
      </div>

      {canEdit ? (
        <div>
          <EditProfile onComplete={onComplete} />
        </div>
      ) : (
        <div>
          <div className="w-full p-4 border border-gray-200 rounded-lg">
            <p className="mb-4 text-xs font-semibold text-gray-700 uppercase">
              Profile Information
            </p>
            <div className="mb-4 -mx-4">
              <Divider />
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <Input label="Full Name" value="Kevin Gilbert" />
              <Input label="Email" value="Kevin.gilbert@gmail.com" />
              <Input label="Secondary Email" value="kevin12345@gmail.com" />
              <Input label="Phone Number" value="+234-202-555-0118" />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <Input label="Country/Region" value="Nigeria" />
              <Input label="States" value="Lagos" />
              <Input label="Zip Code" value="1207" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Input({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block mb-1 text-xs text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full p-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
      />
    </div>
  );
}
function EditProfile({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex gap-6">
      <div className="relative h-[84px] w-[84px]">
        <span className="bg-white w-[24px] h-[24px] rounded-full flex justify-center items-center absolute z-10 right-0">
          <i className="ri-verified-badge-fill text-primary text-[17px] "></i>
        </span>
        <Avatar src={"/svg/avater-profile.svg"} className="h-[84px] w-[84px]" />
      </div>
      <div className="w-full p-4 border border-gray-200 rounded-lg">
        <p className="mb-4 text-xs font-semibold text-gray-700 uppercase">Profile Information</p>
        <div className="mb-4 -mx-4">
          <Divider />
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <Input label="Full Name" value="Kevin Gilbert" />
          <Input label="Email" value="Kevin.gilbert@gmail.com" />
          <Input label="Secondary Email" value="kevin12345@gmail.com" />
          <Input label="Phone Number" value="+234-202-555-0118" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Input label="Country/Region" value="Nigeria" />
          <Input label="States" value="Lagos" />
          <Input label="Zip Code" value="1207" />
        </div>
        <button
          onClick={onComplete}
          className="text-[14px] font-[700] bg-[#000222] text-white rounded-[12px] px-[24px] py-[12px] mt-4 uppercase"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
