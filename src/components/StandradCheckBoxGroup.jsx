import React, { useState } from "react";
import { Check } from "lucide-react";

const CheckboxGroup = ({ label, options, name, defaultValues = [] }) => {
  const [selectedValues, setSelectedValues] = useState(defaultValues);

  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}

      {selectedValues.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options?.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleValue(option.value)}
              className={`flex items-center gap-3 p-4 rounded border transition-all duration-200 text-left ${
                isSelected
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500 shadow-md shadow-blue-500/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div
                className={`w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-500 to-blue-400 border-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>

              <span
                className={`font-medium ${
                  isSelected ? "text-blue-700" : "text-slate-700"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {selectedValues.length > 0 && (
        <p className="text-sm text-slate-500 mt-3">
          {selectedValues.length}{" "}
          {selectedValues.length === 1 ? "option" : "options"} selected
        </p>
      )}
    </div>
  );
};

export default CheckboxGroup;
