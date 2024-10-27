"use client";
export default function InputField({
  icon: Icon,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="input-field"
        placeholder={placeholder}
      />
    </div>
  );
}
