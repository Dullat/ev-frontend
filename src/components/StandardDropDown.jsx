import React from "react";
import { ChevronDown } from "lucide-react";

const StandardDropDown = ({
  label,
  options,
  name,
  defaultValue,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || "");

  const selectedOption = options?.find((opt) => opt.value === selectedValue);

  return (
    <div className="w-full">
      {label && <label className="label mb-1">{label}</label>}

      <select
        name={name}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="hidden"
      >
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full input focus:border-blue-500 focus:ring-blue-200 cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-between text-left"
        >
          <span
            className={
              selectedValue ? "text-slate-800 font-medium" : "text-slate-400"
            }
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute z-20 w-full mt-2 bg-white  rounded border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden animate-scale-in">
              <div className="max-h-60 overflow-y-auto">
                {options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedValue(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-all duration-150 ${
                      selectedValue === option.value
                        ? "bg-gradient-to-r from-blue-50 to-blue-200 cursor-pointer text-blue-700 font-semibold border-l-4 border-blue-500"
                        : "hover:bg-blue-100 text-slate-700 cursor-pointer"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StandardDropDown;
