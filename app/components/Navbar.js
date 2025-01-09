"use client";
import { useState } from "react";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-emerald-400 transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-emerald-400 transition-colors block w-full text-center py-2"
  >
    {children}
  </a>
);

const ProfileDropdown = ({ isOpen, setIsOpen }) => (
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl text-gray-300 transition-colors"
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
        J
      </div>
      <span className="hidden sm:inline">Adhil Akbar</span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700/30 shadow-lg">
        <a
          href="/profile"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 transition-colors"
        >
          <User className="w-4 h-4" />
          Profile
        </a>
        {/* <a
          href="/settings"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </a> */}
        <hr className="my-2 border-gray-700/30" />
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-700/50 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="px-4 pt-4">
      <nav className="bg-gray-800/30 backdrop-blur-md w-full z-50 rounded-xl border border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-lg border border-emerald-400/30" />
              <span className="text-xl font-semibold text-gray-100">
                CareerQuest
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              {/* {/* <NavLink href="/paths">Career Paths</NavLink> */}
              <NavLink href="/chat">Chat</NavLink>
              <NavLink href="/ai-chat">Ai Chat</NavLink>
              <a href="/assessment">
                <button className="bg-blue-500/20 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                  Get Started
                </button>
              </a>
              <ProfileDropdown
                isOpen={isProfileOpen}
                setIsOpen={setIsProfileOpen}
              />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-emerald-400 transition-colors md:hidden"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700/30">
              <div className="flex flex-col space-y-4 pt-4">
                <MobileNavLink href="/">Home</MobileNavLink>
                <MobileNavLink href="/chat">Chat</MobileNavLink>
                <MobileNavLink href="/ai-chat">Ai Chat</MobileNavLink>
                <MobileNavLink href="/profile">Profile</MobileNavLink>
                {/* <MobileNavLink href="/settings">Settings</MobileNavLink> */}
                <a href="/assessment">
                  <button className="bg-blue-500/20 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-500/30 transition-colors w-full">
                    Get Started
                  </button>
                </a>
                <button className="text-gray-400 hover:text-red-400 transition-colors w-full text-center py-2">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
