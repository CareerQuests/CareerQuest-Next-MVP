import React from 'react';
import Link from 'next/link';
import { Briefcase, Building2, Brain, Target, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Flow from './components/Flow';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Career Fields Data
const careerFields = [
  {
    title: "Technology & Innovation",
    icon: <Briefcase className="w-8 h-8 text-emerald-400" />,
    roles: ["Software Developer", "Data Scientist", "UX Designer"],
    skills: ["Problem Solving", "Programming", "Design Thinking"],
    borderColor: "border-emerald-500/20",
    glowColor: "bg-emerald-500/20"
  },
  {
    title: "Healthcare & Medicine",
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    roles: ["Nurse Practitioner", "Medical Researcher", "Healthcare Administrator"],
    skills: ["Patient Care", "Clinical Knowledge", "Medical Technology"],
    borderColor: "border-blue-500/20",
    glowColor: "bg-blue-500/20"
  },
  {
    title: "Business & Finance",
    icon: <Building2 className="w-8 h-8 text-purple-400" />,
    roles: ["Financial Analyst", "Business Consultant", "Marketing Manager"],
    skills: ["Analytics", "Strategic Planning", "Leadership"],
    borderColor: "border-purple-500/20",
    glowColor: "bg-purple-500/20"
  }
];

// Why CareerQuest Section
const WhyCareerQuest = () => (
  <div className="py-24">
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Why Choose <span className="text-emerald-400">CareerQuest</span>?
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Our innovative platform combines AI technology with real-world insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI-Powered Matching",
            description: "Advanced algorithms analyze your skills, interests, and personality to find perfect career matches",
            icon: <Target className="w-8 h-8" />,
            color: "text-emerald-400",
            glow: "bg-emerald-500/20"
          },
          {
            title: "Real-World Insights",
            description: "Access current market data, salary trends, and growth opportunities in various fields",
            icon: <Brain className="w-8 h-8" />,
            color: "text-blue-400",
            glow: "bg-blue-500/20"
          },
          {
            title: "Personalized Guidance",
            description: "Get customized learning paths and development plans based on your career goals",
            icon: <Users className="w-8 h-8" />,
            color: "text-purple-400",
            glow: "bg-purple-500/20"
          }
        ].map((item, index) => (
          <div key={index} className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 overflow-hidden group hover:border-gray-600/50 transition-all">
            <div className={`absolute bottom-0 right-0 w-32 h-32 ${item.glow} blur-[64px] opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className={`flex justify-center items-center w-12 h-12 rounded-xl ${item.glow} mb-6 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Career Fields Section
const CareerFields = () => (
  <div className="py-24 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent" />
    <div className="max-w-7xl mx-auto px-8 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Explore Career <span className="text-blue-400">Fields</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover opportunities across various industries with real-time insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerFields.map((field, index) => (
          <div key={index} className={`relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border ${field.borderColor} overflow-hidden group hover:border-opacity-50 transition-all`}>
            <div className={`absolute bottom-0 right-0 w-32 h-32 ${field.glowColor} blur-[64px] opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                {field.icon}
                <h3 className="text-xl font-semibold ml-4 text-white">{field.title}</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Top Roles</h4>
                  <ul className="space-y-2">
                    {field.roles.map((role, i) => (
                      <li key={i} className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                        <CheckCircle2 className="w-4 h-4 mr-2 opacity-60" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {field.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700/30 rounded-full text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// CTAs Section
const CTASection = () => (
  <div className="py-24 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent" />
    <div className="max-w-7xl mx-auto px-8 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Start Your <span className="text-emerald-400">Journey</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose your path and begin your career transformation today
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/assessment" className="group">
          <div className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-emerald-500/20 overflow-hidden group-hover:border-emerald-500/40 transition-all h-full">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[64px] opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-emerald-500/20 mb-6">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Start Assessment</h3>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Begin your career journey with our AI-powered assessment tool
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 flex items-center">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        <Link href="/about" className="group">
          <div className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 overflow-hidden group-hover:border-blue-500/40 transition-all h-full">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 blur-[64px] opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-blue-500/20 mb-6">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Learn More</h3>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Discover how our AI technology matches you with the perfect career
              </p>
              <span className="text-blue-400 group-hover:text-blue-300 flex items-center">
                Explore <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        <Link href="/institutions" className="group">
          <div className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 overflow-hidden group-hover:border-purple-500/40 transition-all h-full">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 blur-[64px] opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-purple-500/20 mb-6">
                <Building2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Join as Institution</h3>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Partner with us to provide career guidance to your students
              </p>
              <span className="text-purple-400 group-hover:text-purple-300 flex items-center">
                Partner <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default function UpdatedHome() {
  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="pt-32 px-8 max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Discover Your Perfect Career Path with{" "}
          <span className="text-emerald-400">AI-Powered</span>{" "}
          <span className="text-blue-400">Guidance</span>
        </h1>
        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
          Join thousands of professionals finding their ideal career through personalized assessments and data-driven insights
        </p>
        <Link href="/assessment">
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all transform hover:scale-105">
            Start Your Journey
          </button>
        </Link>
      </div>

      <WhyCareerQuest />
      <CareerFields />
      <CTASection />
      
      <Flow />
      <Testimonial />
      <Footer />
    </div>
  );
}

const FloatingElements = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[128px]" />
    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[128px]" />
  </div>
);