import React from "react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />

      <div className="relative max-w-7xl mx-auto px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-16">
          {/* Left section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-xl" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CareerQuest
              </span>
            </div>

            <div className="max-w-md">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-400 mb-8">
                Join thousands of professionals discovering their ideal career
                path with AI-powered guidance.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all">
                Get Started Now
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Platform",
                links: ["Assessment", "Career Paths", "Resources", "Pricing"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <nav className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href="#"
                      className="block text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © 2025 CareerQuest. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[FaLinkedinIn, FaTwitter, FaGithub].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors group"
              >
                <Icon className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
