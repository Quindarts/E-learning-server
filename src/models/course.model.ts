import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  description: { type: String },
  author: { type: String, required: true },
  category: { type: String },
  imgUrls: [{ type: String }],
  totalDuration: { type: String },
  totalReview: { type: Number, default: 0 },
  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  orders: ["orderSchema"],
  lessons: ["lessonSchema"],
  reviews: ["reviewSchema"],
});

export default mongoose.model("Course", courseSchema);
