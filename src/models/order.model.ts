import { ORDER_STATUS } from "@/types/enum";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: ['userSchema'],
    amount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: Object.values(ORDER_STATUS), required: true, default: ORDER_STATUS.INIT },
    date: { type: Date, required: true, default: Date.now() },
});

export default mongoose.model("Order", orderSchema);