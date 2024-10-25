import React from "react";
import { Search, MapPin, Bookmark, Compass } from "lucide-react";

const Footer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-24">
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Transforming the Way you Find Jobs
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8">
              Stop searching, start discovering. Let the ideal job come to you.
            </p>

            {/* Subscribe Form */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Course Cards */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Coursera Course Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    C
                  </div>
                  <div>
                    <h3 className="font-semibold">Machine Learning</h3>
                    <p className="text-sm text-gray-500">Coursera</p>
                  </div>
                </div>
                <Bookmark className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Online</span>
                </div>
                <span className="font-semibold">
                  Free
                  <span className="text-gray-500">
                    /certificate fee applies
                  </span>
                </span>
              </div>
            </div>

            {/* Another Coursera Course Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    C
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Data Science Specialization
                    </h3>
                    <p className="text-sm text-gray-500">Coursera</p>
                  </div>
                </div>
                <Bookmark className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Online</span>
                </div>
                <span className="font-semibold">
                  $49<span className="text-gray-500">/month</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-16 sm:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="h-6 w-6 text-pink-600" />
                <span className="font-bold text-xl">CareerQuest</span>
              </div>
              <p className="text-gray-600 mb-6">
                Career Quest connects you with career opportunities tailored to
                your skills, relevance, and personal preferences.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Technology</h3>
              <nav className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Search for Jobs
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Browse Jobs
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Browse Companies
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Career Advice
                </a>
              </nav>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Employers</h3>
              <nav className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Post Jobs
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Source Talent
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Employer & Advertising
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Hiring Events
                </a>
              </nav>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Company</h3>
              <nav className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  About Us
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Media
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Work at Career Quest
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
