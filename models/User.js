import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    emri: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roli: {
        type: String,
        default: "user",
        enum: ['user','admin']
    }
})

const User = mongoose.model("User",userSchema)

export default User