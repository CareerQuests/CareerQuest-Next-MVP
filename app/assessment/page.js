import CareerQuiz from "../components/assessment/CareerQuiz";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Assessment() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 px-4 mt-14">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Career Quest</h1>
            <p className="text-muted-foreground">
              Discover your ideal career path through our personality-based
              assessment
            </p>
          </div>
          <CareerQuiz />
        </div>
      </main>
      <Footer />
    </>
  );
}
