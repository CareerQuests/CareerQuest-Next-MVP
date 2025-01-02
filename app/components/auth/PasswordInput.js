"use client";
import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  className,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaLock className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`w-full py-2 pl-10 pr-10 rounded-lg bg-gray-800/40 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-colors duration-200 ${className}`}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-200"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FaEyeSlash className="h-5 w-5" />
        ) : (
          <FaEye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
