import mongoose from "mongoose";

const postimiSchema = new mongoose.Schema({
    titulli: {
        type: String,
        required: true
    },
    permbajtja: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: ""
    },
    autori: {
        type: String,
        required: true
    }
})

const Postimi = mongoose.model("Postimi",postimiSchema)

export default Postimi