import React from "react";

const StandardInput = ({
  Icon,
  label,
  name,
  type = "text",
  placeholder,
  isEmpty,
  validate,
  onValidateChange,
}) => {
  const [hasValue, setHasValue] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [empty, setEmpty] = React.useState(false);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setHasValue(value !== "");

    if (validate) {
      const result = validate(value);

      if (result === true) {
        setError(null);
        onValidateChange?.(name, true);
      } else {
        setError(result || "invalid input");
        onValidateChange?.(name, false);
      }
    } else {
      onValidateChange?.(name, value !== "");
    }
  };

  React.useEffect(() => {
    isEmpty && setEmpty(true);
    hasValue && setEmpty(false);
  }, [isEmpty, hasValue]);

  return (
    <div className={`flex flex-col gap-1 w-full`}>
      <label htmlFor="state" className="label ">
        {label}
      </label>
      <div className={`relative w-full`}>
        <Icon
          className={`w-6 h-6 text-slate-600 absolute top-1/2 -translate-y-1/2 left-3`}
        />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full input pl-12 focus:border-blue-500 focus:ring-blue-100 shadow-lg shadow-blue-200 ${
            error || empty
              ? "border-red-500 ring-4 ring-red-100 focus:border-red-500"
              : hasValue
                ? "border-blue-500 ring-4 ring-blue-100"
                : "shadow-sm shadow-gray-100"
          }`}
        />
      </div>
    </div>
  );
};

export default StandardInput;
