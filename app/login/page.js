"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";
import { FloatingElements } from "../components/assessment/FloatingElements";
import InputField from "../components/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (
        formData.email === "adhil@gmail.com" &&
        formData.password === "Adhil123"
      ) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Welcome <span className="text-emerald-400">Back</span>
            </h1>
            <p className="mt-3 text-gray-400">
              Sign in to continue your journey
            </p>
          </div>

          <form
            className="mt-8 space-y-6 bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/30"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-800/40 border-gray-700/50 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg transition-all duration-200 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner /> : "Sign in"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don&#39;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
