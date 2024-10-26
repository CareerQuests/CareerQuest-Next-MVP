"use client";
import { useState } from "react";
import { Menu, X, Compass } from "lucide-react";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium block w-full text-center py-2 rounded-lg hover:bg-gray-50"
  >
    {children}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 pt-4">
      <nav className="bg-white/80 backdrop-blur-md w-full z-50 rounded-xl shadow-sm border border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-pink-600" />
              <span className="text-xl font-semibold text-gray-800">
                Career Quest
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/career">Find Your Path</NavLink>
              {/* <NavLink href="#about">About</NavLink> */}
              {/* <NavLink href="#contact">Contact</NavLink> */}
              <a href="/assessment">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                  Take Assessment
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <MobileNavLink href="/">Home</MobileNavLink>
                <MobileNavLink href="/career">Find Your Path</MobileNavLink>
                {/* <MobileNavLink href="#about">About</MobileNavLink> */}
                {/* <MobileNavLink href="#contact">Contact</MobileNavLink> */}
                <a href="/assessment">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors w-full">
                    Take Assessment
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
