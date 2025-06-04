import React from "react";
import Select from "react-select";

type OptionType = { label: string; value: string };

interface SelectInputProps {
  label: string;
  value: OptionType | null;
  onChange: (option: OptionType | null) => void;
  options: OptionType[];
}

export default function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#334155" : "#e5e7eb", // slate-700 : gray-200
      boxShadow: "none",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.375rem", // rounded-md
      "&:hover": {
        borderColor: "#334155", // slate-700
      },
      minHeight: "38px",
    }),
    option: (base: any, { isFocused, isSelected }: any) => ({
      ...base,
      backgroundColor: isSelected
        ? "#334155" // slate-700
        : isFocused
          ? "#f1f5f9" // slate-100
          : "white",
      color: isSelected ? "white" : "#1e293b", // slate-800
      fontSize: "0.875rem",
      padding: "0.5rem 0.75rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#334155", // slate-700
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.375rem",
      boxShadow: "0 0 0 1px #e5e7eb",
      zIndex: 50,
    }),
    input: (base: any) => ({
      ...base,
      color: "#1e293b", // slate-800
    }),
  };

  return (
    <div>
      <label className="block mb-1 text-xs text-gray-500">{label}</label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        styles={customStyles}
        className="text-sm"
        classNamePrefix="react-select"
      />
    </div>
  );
}
