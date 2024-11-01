import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  duration: { type: String, required: true },
  videoUrl: { type: String },
});
module.exports = mongoose.model("Lesson", lessonSchema);
