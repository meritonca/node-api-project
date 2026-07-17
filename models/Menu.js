import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    emri: {
        type:String,
        required: true
    },
    cmimi: {
        type: Number,
        required: true
    },
    kategoria: {
        type: String,
        required: true
    }
})

const Menu = mongoose.model("Menu",menuSchema)

export default Menu