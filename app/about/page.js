"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Target,
  Sparkles,
  Trophy,
  ArrowRight,
  Brain,
  LineChart,
  GraduationCap,
  Users,
  ClipboardCheck,
  Lightbulb,
  Compass,
  Rocket,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { number: "10K+", label: "Career Matches", color: "text-emerald-400" },
  { number: "95%", label: "Success Rate", color: "text-blue-400" },
  { number: "50+", label: "Partner Institutions", color: "text-purple-400" },
];

const values = [
  {
    icon: <HeartHandshake className="w-8 h-8" />,
    title: "User-Centric Approach",
    description: "We prioritize your unique career aspirations and goals",
    color: "text-emerald-400",
    glow: "bg-emerald-500/20",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Data-Driven Insights",
    description: "Our AI algorithms provide accurate career recommendations",
    color: "text-blue-400",
    glow: "bg-blue-500/20",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Continuous Innovation",
    description: "We constantly evolve our technology to serve you better",
    color: "text-purple-400",
    glow: "bg-purple-500/20",
  },
];

const FloatingElements = () => {
  const orbs = [
    { color: "bg-emerald-500/20", position: "-left-32 top-0" },
    { color: "bg-blue-500/20", position: "-right-32 bottom-0" },
  ];

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.position} h-96 w-96 rounded-full ${orb.color} blur-[128px]`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const StaggerContainer = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const FadeInUpItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      <div className="pt-32 px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center mb-24"
        >
          <h1 className="text-5xl font-bold mb-6">
            Empowering Careers Through{" "}
            <span className="text-emerald-400">AI Innovation</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Our mission is to revolutionize career guidance using advanced AI
            technology and real-world insights
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <FadeInUpItem key={index}>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.h2
                      className={`text-4xl font-bold mb-2 ${stat.color}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.h2>
                    <p className="text-gray-400">{stat.label}</p>
                  </motion.div>
                </FadeInUpItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Values Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Our Core <span className="text-blue-400">Values</span>
          </motion.h2>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <FadeInUpItem key={index}>
                  <motion.div
                    className={`relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 overflow-hidden group hover:border-gray-600/50 transition-all`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`absolute bottom-0 right-0 w-32 h-32 ${value.glow} blur-[64px] opacity-60 group-hover:opacity-100 transition-opacity`}
                    />
                    <div className="relative z-10">
                      <motion.div
                        className={`flex justify-center items-center w-12 h-12 rounded-xl ${value.glow} mb-6 ${value.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {value.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-400">{value.description}</p>
                    </div>
                  </motion.div>
                </FadeInUpItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gray-800/30 backdrop-blur-sm p-12 rounded-2xl border border-gray-700/30"
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 blur-[128px] opacity-60" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">
                Our <span className="text-blue-400">Mission</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                At CareerQuest, we believe everyone deserves to find a
                fulfilling career that aligns with their passions and skills.
                Our AI-powered platform combines cutting-edge technology with
                human expertise to provide personalized career guidance and
                insights.
              </p>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all transform flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Our Technology
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="text-emerald-400">Technology</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover how we leverage cutting-edge AI to transform career
              guidance
            </p>
          </motion.div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "AI-Powered Assessment",
                  description:
                    "Our advanced algorithms analyze multiple factors including skills, interests, personality traits, and market demands to provide accurate career matches.",
                  icon: <Brain className="w-6 h-6" />,
                  color: "text-emerald-400",
                  glow: "bg-emerald-500/20",
                },
                {
                  title: "Real-Time Market Analysis",
                  description:
                    "Stay informed with current industry trends, salary data, and growth opportunities through our real-time market analysis system.",
                  icon: <LineChart className="w-6 h-6" />,
                  color: "text-blue-400",
                  glow: "bg-blue-500/20",
                },
                {
                  title: "Personalized Learning Paths",
                  description:
                    "Get customized skill development recommendations and learning resources tailored to your career goals.",
                  icon: <GraduationCap className="w-6 h-6" />,
                  color: "text-purple-400",
                  glow: "bg-purple-500/20",
                },
                {
                  title: "Expert Network Integration",
                  description:
                    "Connect with industry professionals and mentors who can provide valuable insights and guidance for your career journey.",
                  icon: <Users className="w-6 h-6" />,
                  color: "text-pink-400",
                  glow: "bg-pink-500/20",
                },
              ].map((item, index) => (
                <FadeInUpItem key={index}>
                  <motion.div
                    className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`absolute bottom-0 right-0 w-32 h-32 ${item.glow} blur-[64px] opacity-60`}
                    />
                    <div className="relative z-10">
                      <motion.div
                        className={`flex justify-center items-center w-12 h-12 rounded-xl ${item.glow} mb-6`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <span className={item.color}>{item.icon}</span>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                </FadeInUpItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24 px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your journey to the perfect career in four simple steps
            </p>
          </motion.div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Take Assessment",
                  description:
                    "Complete our comprehensive AI-powered assessment",
                  icon: <ClipboardCheck className="w-6 h-6" />,
                },
                {
                  step: "02",
                  title: "Get Insights",
                  description:
                    "Receive detailed analysis of your career matches",
                  icon: <Lightbulb className="w-6 h-6" />,
                },
                {
                  step: "03",
                  title: "Explore Paths",
                  description:
                    "Discover personalized career paths and opportunities",
                  icon: <Compass className="w-6 h-6" />,
                },
                {
                  step: "04",
                  title: "Take Action",
                  description: "Access resources and start your career journey",
                  icon: <Rocket className="w-6 h-6" />,
                },
              ].map((item, index) => (
                <FadeInUpItem key={index}>
                  <motion.div
                    className="relative text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-500/20 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="text-blue-400">{item.icon}</span>
                    </motion.div>
                    <div className="text-5xl font-bold text-gray-700 mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                </FadeInUpItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="text-emerald-400">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our platform
            </p>
          </motion.div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "How accurate is the AI assessment?",
                  answer:
                    "Our AI assessment has a 95% accuracy rate, validated through extensive testing and real-world career outcomes.",
                },
                {
                  question: "How long does the assessment take?",
                  answer:
                    "The comprehensive assessment typically takes 20-30 minutes to complete, providing detailed insights into your career potential.",
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "Yes, we employ enterprise-grade encryption and follow strict data protection protocols to ensure your information is secure.",
                },
                {
                  question: "Can I retake the assessment?",
                  answer:
                    "Yes, you can retake the assessment after 3 months to track your progress and update your career recommendations.",
                },
              ].map((item, index) => (
                <FadeInUpItem key={index}>
                  <motion.div
                    className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {item.question}
                    </h3>
                    <p className="text-gray-400">{item.answer}</p>
                  </motion.div>
                </FadeInUpItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
}
