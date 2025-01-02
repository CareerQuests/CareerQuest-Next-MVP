"use client";
export default function InputField({
  icon: Icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`w-full py-2 pl-10 pr-3 rounded-lg bg-gray-800/40 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-colors duration-200 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
