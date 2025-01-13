"use client";

import { FloatingElements } from "../components/FloatingElements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchCareer from "../components/SearchCareer";

// app/career/page.js

const Career = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24">
        <SearchCareer />
      </div>
      <Footer />
    </div>
  );
};

export default Career;
