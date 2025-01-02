"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-emerald-400 transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-emerald-400 transition-colors block w-full text-center py-2"
  >
    {children}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 pt-4">
      <nav className="bg-gray-900/50 backdrop-blur-md w-full z-50 rounded-xl border border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg" />
              <span className="text-xl font-semibold text-white">
                CareerQuest
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/paths">Career Paths</NavLink>
              <NavLink href="/resources">Resources</NavLink>
              <a href="/assessment">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Get Started
                </button>
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 pt-4">
                <MobileNavLink href="/">Home</MobileNavLink>
                <MobileNavLink href="/paths">Career Paths</MobileNavLink>
                <MobileNavLink href="/resources">Resources</MobileNavLink>
                <a href="/assessment">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">
                    Get Started
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
