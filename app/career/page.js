"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchCareer from "../components/SearchCareer";

// app/career/page.js

const Career = () => {
  return (
    <>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24">
        <SearchCareer />
      </div>
      <Footer />
    </>
  );
};

export default Career;
