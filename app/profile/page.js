"use client";

import React, { useState } from "react";
import {
  User,
  Settings,
  Award,
  Activity,
  Briefcase,
  BookOpen,
  Bell,
  CreditCard,
  Edit2,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Helper function for consistent date formatting
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample user data state
  const [user, setUser] = useState({
    firstName: "Adhil",
    lastName: "Akbar",
    email: "356adhil@gmail.com",
    profileImage: null,
    role: "candidate",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
    completedAssessments: [
      {
        assessmentId: "1",
        completedAt: "2024-01-16",
        result: {
          matches: [
            {
              careerTitle: "Software Developer",
              careerDescription: "Build and maintain software applications",
              matchConfidence: 92,
              skillsRequired: ["JavaScript", "React", "Node.js"],
              growthPotential: "High",
              educationPath: "Computer Science Degree",
              specializations: ["Web Development", "Mobile Apps"],
            },
            {
              careerTitle: "UX Designer",
              careerDescription: "Create user-friendly digital experiences",
              matchConfidence: 85,
              skillsRequired: ["UI Design", "User Research", "Prototyping"],
              growthPotential: "Medium",
              educationPath: "Design Degree or Bootcamp",
              specializations: ["Mobile UX", "Web Design"],
            },
          ],
        },
      },
    ],
    preferences: {
      careerFields: ["Technology", "Design"],
      location: "New York",
      careerGrowth: "Leadership track",
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
    },
    subscription: {
      plan: "premium",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      isActive: true,
      paymentHistory: [
        {
          paymentDate: "2024-01-01",
          amount: 199,
          paymentMethod: "credit_card",
        },
      ],
    },
    activityLog: [
      {
        activityType: "Assessment Completed",
        timestamp: "2024-01-16",
      },
      {
        activityType: "Profile Updated",
        timestamp: "2024-01-15",
      },
    ],
  });

  const handleNotificationSettingsUpdate = (type, value) => {
    setUser((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [type]: value,
      },
    }));
  };

  const ProfileHeader = () => (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8 mb-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[64px]" />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 text-gray-400">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {user.preferences.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Member since {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl text-white flex items-center gap-2 transition-colors">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>
    </div>
  );

  const CareerMatches = () => (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8 mb-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 blur-[64px]" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-400" />
          Career Matches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.completedAssessments[0].result.matches.map((match, index) => (
            <div key={index} className="bg-gray-700/30 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {match.careerTitle}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {match.careerDescription}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-sm">
                  {match.matchConfidence}% Match
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-600/30 rounded-full text-sm text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-400">
                      Growth Potential:
                    </span>
                    <p className="text-emerald-400">{match.growthPotential}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">
                      Education Path:
                    </span>
                    <p className="text-gray-300">{match.educationPath}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PreferencesSection = () => (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8 mb-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 blur-[64px]" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Preferences & Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              Career Fields
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.preferences.careerFields.map((field, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700/30 rounded-full text-sm text-gray-300"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              Career Growth
            </h3>
            <p className="text-gray-300">{user.preferences.careerGrowth}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              Notifications
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={user.notificationSettings.emailNotifications}
                  onChange={(e) =>
                    handleNotificationSettingsUpdate(
                      "emailNotifications",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-700 bg-gray-800"
                />
                Email Notifications
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={user.notificationSettings.smsNotifications}
                  onChange={(e) =>
                    handleNotificationSettingsUpdate(
                      "smsNotifications",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-700 bg-gray-800"
                />
                SMS Notifications
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ActivitySection = () => (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8 mb-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 blur-[64px]" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {user.activityLog.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{activity.activityType}</span>
              <span className="text-gray-500">
                {formatDate(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SubscriptionSection = () => (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8 mb-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[64px]" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          Subscription
        </h2>
        <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl p-6 border border-emerald-500/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white capitalize mb-1">
                {user.subscription.plan} Plan
              </h3>
              <p className="text-gray-400">
                Valid until {formatDate(user.subscription.endDate)}
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-sm">
              Active
            </span>
          </div>
          <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
            Manage Subscription <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Payment History
          </h3>
          <div className="space-y-3">
            {user.subscription.paymentHistory.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-gray-300 p-3 bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span>{payment.paymentMethod}</span>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400">${payment.amount}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(payment.paymentDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-white">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="pt-32 px-8 max-w-7xl mx-auto pb-24">
        <ProfileHeader />
        <CareerMatches />
        <PreferencesSection />
        <ActivitySection />
        <SubscriptionSection />
      </div>
      <Footer />
    </div>
  );
};

const FloatingElements = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[128px]" />
    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[128px]" />
  </div>
);

export default ProfilePage;
