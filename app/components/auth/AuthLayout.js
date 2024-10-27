"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const title = pathname === "/login" ? "Welcome Back" : "Create Account";
  const subtitle =
    pathname === "/login"
      ? "Please sign in to your account"
      : "Sign up to get started";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <div className="glass-card space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              {title}
            </h2>
            <p className="mt-2 text-center text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
