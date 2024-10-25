"use client"
// app/feedback/page.js
import { useState } from "react";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ feedback }),
      headers: { "Content-Type": "application/json" },
    });
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Your feedback"
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackPage;
