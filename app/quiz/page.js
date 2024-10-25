"use client"
// app/quiz/page.js
import { useState } from "react";

const QuizPage = () => {
  const [answers, setAnswers] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your API to send answers and get suggestions here
    console.log(answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>What are your skills?</h2>
      <input
        type="radio"
        name="skill"
        value="coding"
        onChange={(e) => setAnswers({ ...answers, skill: e.target.value })}
      />
      <label>Coding</label>
      <input
        type="radio"
        name="skill"
        value="design"
        onChange={(e) => setAnswers({ ...answers, skill: e.target.value })}
      />
      <label>Design</label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizPage;
