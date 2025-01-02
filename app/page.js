import React from "react";
import Testimonial from "./components/Testimonial";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Flow from "./components/Flow";

const FloatingElements = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[128px]" />
    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[128px]" />
  </div>
);

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-transparent text-gray-100">
        <FloatingElements />
        <div className="fixed w-full z-50">
          <Navbar />
        </div>

        <div className="pt-32 px-8 max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            CareerQuest: Where Careers{" "}
            <span className="text-emerald-400">Come</span>{" "}
            <span className="text-blue-400">Alive</span>
          </h1>
          <p className="text-gray-400 text-xl mb-16">
            Discover our suite of tools designed to enhance your career journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/30">
              <div className="mb-4">📊</div>
              <h2 className="text-xl font-semibold mb-3">Assessment</h2>
              <p className="text-gray-400 mb-4">
                AI-powered career evaluation platform
              </p>
              <div className="space-y-2">
                <div className="text-gray-400">Personality Analysis</div>
                <div className="text-gray-400">Skill Mapping</div>
                <div className="text-gray-400">Career Matching</div>
              </div>
              <button className="mt-6 text-blue-400 hover:text-blue-300 flex items-center">
                Explore Assessment <span className="ml-2">→</span>
              </button>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/30">
              <div className="mb-4">🎯</div>
              <h2 className="text-xl font-semibold mb-3">Career Paths</h2>
              <p className="text-gray-400 mb-4">
                Complete platform for career exploration
              </p>
              <div className="space-y-2">
                <div className="text-gray-400">Path Discovery</div>
                <div className="text-gray-400">Real-time Insights</div>
                <div className="text-gray-400">Growth Planning</div>
              </div>
              <button className="mt-6 text-emerald-400 hover:text-emerald-300 flex items-center">
                Explore Paths <span className="ml-2">→</span>
              </button>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/30">
              <div className="mb-4">📚</div>
              <h2 className="text-xl font-semibold mb-3">Resources</h2>
              <p className="text-gray-400 mb-4">
                Track and manage your career growth
              </p>
              <div className="space-y-2">
                <div className="text-gray-400">Learning Tracks</div>
                <div className="text-gray-400">Smart Recommendations</div>
                <div className="text-gray-400">Progress Tracking</div>
              </div>
              <button className="mt-6 text-gray-100 hover:text-gray-300 flex items-center">
                Explore Resources <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[64px]"></div>
                <span className="relative z-10 flex justify-center items-center w-12 h-12 rounded-xl bg-emerald-500/20 mb-4">
                  👥
                </span>
                <h3 className="relative z-10 text-5xl font-bold text-emerald-400 mb-2">
                  1.2K+
                </h3>
                <p className="relative z-10 text-gray-400">Users Guided</p>
              </div>

              <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 blur-[64px]"></div>
                <span className="relative z-10 flex justify-center items-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                  📈
                </span>
                <h3 className="relative z-10 text-5xl font-bold text-blue-400 mb-2">
                  85%
                </h3>
                <p className="relative z-10 text-gray-400">Success Rate</p>
              </div>

              <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-500/20 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-400/20 blur-[64px]"></div>
                <span className="relative z-10 flex justify-center items-center w-12 h-12 rounded-xl bg-gray-500/20 mb-4">
                  ✨
                </span>
                <h3 className="relative z-10 text-5xl font-bold text-gray-100 mb-2">
                  3.5K+
                </h3>
                <p className="relative z-10 text-gray-400">Assessments</p>
              </div>
            </div>
          </div>
        </div>
        <Flow />
        <Testimonial />
      </div>
      <Footer />
    </>
  );
}
