import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    emri: {
        type: String,
        required: true
    },
    mbiemri: {
        type: String,
        required: true
    },
    nota: {
        type: Number,
        required: true
    },
    lenda: {
        type: String,
        required: true
    },
    klasa: {
        type: String,
        required: true
    }
})

const Student = mongoose.model("Student",studentSchema)

export default Student