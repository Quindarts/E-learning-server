import mongoose, { Schema } from "mongoose";

const notifySchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose.model('Notify', notifySchema);
