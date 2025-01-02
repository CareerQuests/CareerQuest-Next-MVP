import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [
    {
      text: String,
      traits: [String],
    },
  ],
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
