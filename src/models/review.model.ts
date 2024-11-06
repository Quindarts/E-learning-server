import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
