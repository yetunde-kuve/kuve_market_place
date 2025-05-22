type OnboardingInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: "text" | "number";
  optional?: boolean;
};

export default function OnboardingInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  optional,
  required = false,
  type = "text",
}: OnboardingInputProps) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      e.currentTarget.blur();
    }
  };
  return (
    <div className="w-full text-start">
      <p className="text-[16px] font-[400] text-[#121212]">
        {label} {required && <span className="text-[#FF0000]">*</span>}
        {optional && <span className="text-[16px] font-[400] text-[#827F7F]">(Optional)</span>}
      </p>
      <input
        name={name}
        type={type}
        onWheel={handleWheel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-[48px]  mt-[8px] text-[14px] px-4 w-full rounded-md bg-slate-100 text-[#121212] focus:outline-none focus:border ${
          error ? "border-red-500" : "border-blue-light"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
