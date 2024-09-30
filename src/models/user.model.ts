import { GENDER, ROLE } from "@/types/enum";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: false, default: '' },
        gender: { type: String, enum: Object.values(GENDER), required: false, default: GENDER.MALE },
        dateOfBirth: {
            type: Date,
            default: null,
        },
        status: { type: Boolean, default: true },
        googleId: { type: String, unique: true, sparse: true },

        roles: { type: [String], enum: Object.values(ROLE), default: [ROLE.USER] },
        carts: {
            items: [
                {
                    course: { type: Schema.ObjectId, ref: 'Course', require: true },
                    quantity: { type: Number, required: true },
                },
            ],
            totalPrice: { type: Number, default: 0 },
        },
        addresses: [
            {
                street: { type: String },
                city: { type: String },
                postalCode: { type: String },
                country: { type: String },
            },
        ],
        notifies: [
            {
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
            }
        ],
        currentCourses: [
            {
                course: {
                    type: ObjectId,
                    ref: 'Course',
                    required: true,
                },
                progress: { type: Number, required: true, default: 0 },
                time: { type: String, required: true },
            },
        ],
    },
)
module.exports = mongoose.model('User', userSchema)
