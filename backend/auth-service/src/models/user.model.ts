import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true });

export const User = model("User", userSchema);

//password hashing is the process of converting a password into a one way representation using a password-hashiung algorithm
