import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  title: String,
  description: String,
  traits: [String],
  skills: [String],
  education: [String],
  salary: {
    min: Number,
    max: Number,
  },
  outlook: String,
});

export default mongoose.models.Career || mongoose.model("Career", CareerSchema);
