import Flow from "./components/Flow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchCareer from "./components/SearchCareer";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-light">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      {/* Hero Section */}
      <section
        className="relative w-full max-w-[95%] h-[60vh] flex items-center justify-center bg-cover bg-center mt-24 mx-auto rounded-2xl shadow-sm overflow-hidden"
        style={{ backgroundImage: "url('/hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
        <div className="relative z-10 text-center p-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Welcome to Career Quest
          </h1>
          <p className="text-white mb-6 text-lg">
            Find your path with our assessments and recommendations
          </p>
          <a href="/assessment">
            <button className="rounded-full bg-white text-gray-800 px-6 py-2 text-lg hover:bg-gray-100 hover:text-gray-900 transition">
              Take Assessment
            </button>
          </a>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="py-12 px-8 sm:px-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 text-center border-r-0 sm:border-r border-gray-300">
          <h3 className="text-2xl font-semibold">Users Engaged</h3>
          <p className="text-blue-700 text-3xl font-bold">1.2K</p>
        </div>
        <div className="p-6 text-center border-r-0 sm:border-r border-gray-300">
          <h3 className="text-2xl font-semibold">Skills Aligned</h3>
          <p className="text-blue-700 text-3xl font-bold">85%</p>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-semibold">Assessments Taken</h3>
          <p className="text-blue-700 text-3xl font-bold">3.5K</p>
        </div>
      </section>

      {/* Flow Section */}
      <Flow />
      {/* Testimonial Section */}
      <Testimonial />
      {/* Trending Career Paths Section */}
      <section className="py-12 px-8 sm:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Trending Career Paths
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                Career Path {i + 1}
              </h3>
              <p className="text-gray-600">
                Learn about this trending path and how to get started.
              </p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Explore Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
