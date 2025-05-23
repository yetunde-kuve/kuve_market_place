import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import React from "react";

type OnboardingSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  options: { label: string; value: any }[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  optional?: boolean;
};
const CustomIcon = () => (
  <i
    className="ri-arrow-down-s-line"
    style={{
      fontSize: 20,
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#6b7280", // matches typical icon color
    }}
  />
);

const CustomSelectInput = styled(InputBase)<{ error?: boolean }>(({ error }) => ({
  "& .MuiInputBase-input": {
    height: "48px !important",
    padding: "0 1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    borderRadius: "0.375rem", // rounded-md
    backgroundColor: "#f1f5f9", // slate-100
    color: "#121212",
    border: `1px solid ${error ? "#ef4444" : "primary"}`, // red-500 or primary
    outline: "none",
    "&:focus": {
      borderColor: error ? "#ef4444" : "#000222",
    },
  },
}));

export default function OnboardingSelect({
  label,
  name,
  value,
  onChange,
  options,
  optional,
  error,
  placeholder,
  required = false,
}: OnboardingSelectProps) {
  console.log(options);
  return (
    <div className="w-full text-start">
      <p className="text-[16px] font-[400] text-[#121212]">
        {label} {required && <span className="text-[#FF0000]">*</span>}
        {optional && <span className="text-[16px] font-[400] text-[#827F7F]">(Optional)</span>}
      </p>
      <FormControl fullWidth className="mt-[8px]">
        <Select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          IconComponent={CustomIcon}
          sx={{
            position: "relative",
          }}
          input={<CustomSelectInput error={!!error} />}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
