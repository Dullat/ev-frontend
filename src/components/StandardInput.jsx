const StandardInput = ({ Icon, label, name, type = "text", placeholder }) => {
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
          className={`w-full input pl-12 focus:border-blue-500 focus:ring-blue-100`}
        />
      </div>
    </div>
  );
};

export default StandardInput;
