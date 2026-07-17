import mongoose from "mongoose";

const libriSchema = new mongoose.Schema({
    titulli: {
        type: String,
        required: true
    },
    autori: {
        type: String,
        required: true
    },
    cmimi: {
        type: String,
        required: true
    },
    viti: {
        type: Number,
        required: true
    },
    disponueshem: {
        type: Boolean,
        default: true
    }
})

const Libri = mongoose.model("/Libri",libriSchema)

export default Libri