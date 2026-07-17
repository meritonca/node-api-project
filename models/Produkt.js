import mongoose from "mongoose";

const produktSchema = new mongoose.Schema({
    emri: {
        type: String,
        required: true
    },
    cmimi: {
        type: Number,
        reqeuired: true
    },
    kategoria: {
        type: String,
        required: true
    },
    disponueshem: {
        type: Boolean,
        default: true
    }
})

const Produkt = mongoose.model("Produkt",produktSchema)

export default Produkt