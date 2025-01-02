"use client";
import { useState } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FloatingElements } from "../components/assessment/FloatingElements";
import InputField from "../components/InputField";
import PasswordInput from "../components/auth/PasswordInput";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Signup data:", formData);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Create your <span className="text-emerald-400">Account</span>
            </h1>
            <p className="mt-3 text-gray-400">Join us and start your journey</p>
          </div>

          <form
            className="space-y-6 bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/30"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <InputField
                icon={FaUser}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="bg-gray-800/40 border-gray-700/50 text-gray-100 placeholder-gray-500"
              />

              <InputField
                icon={FaEnvelope}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="bg-gray-800/40 border-gray-700/50 text-gray-100 placeholder-gray-500"
              />

              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-gray-800/40 border-gray-700/50 text-gray-100 placeholder-gray-500"
              />

              <PasswordInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="bg-gray-800/40 border-gray-700/50 text-gray-100 placeholder-gray-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 bg-gray-800/40 border-gray-700/50 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg transition-all duration-200 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
