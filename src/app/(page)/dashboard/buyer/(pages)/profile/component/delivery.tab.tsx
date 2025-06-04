import { Divider } from "@mui/material";
import { useState } from "react";
import SelectInput from "./select.component";

const options = [
  { label: "Nigeria", value: "a" },
  { label: "Togo", value: "b" },
  { label: "United Kingdom", value: "c" },
];
const stateOption = [
  { label: "Abia", value: "abia" },
  { label: "Adamawa", value: "adamawa" },
  { label: "Akwa Ibom", value: "akwa-ibom" },
  { label: "Anambra", value: "anambra" },
  { label: "Bauchi", value: "bauchi" },
  { label: "Bayelsa", value: "bayelsa" },
  { label: "Benue", value: "benue" },
  { label: "Borno", value: "borno" },
  { label: "Cross River", value: "cross-river" },
  { label: "Delta", value: "delta" },
  { label: "Ebonyi", value: "ebonyi" },
  { label: "Edo", value: "edo" },
  { label: "Ekiti", value: "ekiti" },
  { label: "Enugu", value: "enugu" },
  { label: "Gombe", value: "gombe" },
  { label: "Imo", value: "imo" },
  { label: "Jigawa", value: "jigawa" },
  { label: "Kaduna", value: "kaduna" },
  { label: "Kano", value: "kano" },
  { label: "Katsina", value: "katsina" },
  { label: "Kebbi", value: "kebbi" },
  { label: "Kogi", value: "kogi" },
  { label: "Kwara", value: "kwara" },
  { label: "Lagos", value: "lagos" },
  { label: "Nasarawa", value: "nasarawa" },
  { label: "Niger", value: "niger" },
  { label: "Ogun", value: "ogun" },
  { label: "Ondo", value: "ondo" },
  { label: "Osun", value: "osun" },
  { label: "Oyo", value: "oyo" },
  { label: "Plateau", value: "plateau" },
  { label: "Rivers", value: "rivers" },
  { label: "Sokoto", value: "sokoto" },
  { label: "Taraba", value: "taraba" },
  { label: "Yobe", value: "yobe" },
  { label: "Zamfara", value: "zamfara" },
  { label: "FCT - Abuja", value: "fct" },
];
const cities = [
  { label: "Lagos", value: "lagos" },
  { label: "Abuja", value: "abuja" },
  { label: "Kano", value: "kano" },
  { label: "Port Harcourt", value: "port-harcourt" },
  { label: "Ibadan", value: "ibadan" },
  { label: "Benin City", value: "benin-city" },
  { label: "Jos", value: "jos" },
  { label: "Enugu", value: "enugu" },
  { label: "Abeokuta", value: "abeokuta" },
  { label: "Ilorin", value: "ilorin" },
  { label: "Maiduguri", value: "maiduguri" },
  { label: "Owerri", value: "owerri" },
  { label: "Uyo", value: "uyo" },
  { label: "Calabar", value: "calabar" },
  { label: "Kaduna", value: "kaduna" },
];
export default function DeliveryTab() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState<{ label: string; value: string } | null>(null);
  const [state, setState] = useState<{ label: string; value: string } | null>(null);
  const [city, setCity] = useState<{ label: string; value: string } | null>(null);
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumer, setPhoneNumber] = useState("");
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg">
      <p className="mb-4 text-xs font-semibold text-gray-700 uppercase">DELIVERY Address</p>
      <div className="mb-4 -mx-4">
        <Divider />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="First Name" onChange={setFirstName} value={firstName} />
        <Input label="Last Name" onChange={setLastName} value={lastName} />
        <Input label="Company Name (Optional)" onChange={setCompanyName} value={companyName} />
        <Input label="Address" onChange={setAddress} value={address} />
        <SelectInput label="Country" value={country} onChange={setCountry} options={options} />
        <SelectInput label="Region/State" value={state} onChange={setState} options={stateOption} />

        <SelectInput label="Zip Code" value={city} onChange={setCity} options={cities} />
        <Input label="Address" onChange={setZipCode} value={zipCode} />
        <Input label="Email" onChange={setEmail} value={email} />
        <Input label="Phone Number" onChange={setPhoneNumber} value={phoneNumer} />
      </div>
      <button className="text-[14px] font-[700] bg-[#000222] text-white rounded-[12px] px-[24px] py-[12px] mt-4 uppercase">
        Save Changes
      </button>
    </div>
  );
}
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-xs text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 text-gray-700 border border-gray-200 rounded-md focus:border focus:border-slate-600 focus:outline-none"
      />
    </div>
  );
}
