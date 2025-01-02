import CareerQuiz from "../components/assessment/CareerQuiz";
import { FloatingElements } from "../components/assessment/FloatingElements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Assessment() {
  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <FloatingElements />
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <main className="pt-32 px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Career <span className="text-emerald-400">Quest</span>
            </h1>
            <p className="text-gray-400 text-xl mb-16">
              Discover your ideal career path through our personality-based
              assessment
            </p>
          </div>
          <CareerQuiz />
        </div>
      </main>
      <Footer />
    </div>
  );
}
