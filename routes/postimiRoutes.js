import express from "express"
import upload from "../middleware/upload.js"
import { auth } from "../middleware/auth.js"
import Postimi from "../models/Postimi.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"


const router3 = express.Router()

router3.get("/", asyncHandler(async(req,res) => {
    let postimi = await Postimi.find()
    res.json(postimi)
}))

router3.get("/:id",asyncHandler(async(req,res) => {
    let postimi = await Postimi.findById(req.params.id)
    if(!postimi) {
        throw new ApiError(400,"Nuk gjendet asnje postim")
    }
    res.json(postimi)
}))

router3.post("/", auth, upload.single("foto"),asyncHandler(async(req,res) => {
    let postim = new Postimi({
        titulli: req.body.titulli,
        permbajtja: req.body.permbajtja,
        foto: req.file ? req.file.path : "",
        autori: req.body.autori
    })
    let ri = await postim.save()
    res.json(ri)
}))

router3.put("/:id", auth, upload.single("foto"),asyncHandler(async(req,res) =>{
    let postim = await Postimi.findByIdAndUpdate(
        req.params.id,
        {foto: req.file ? req.file.path : ""},
        req.body,
        {new: true}
    )
    if(!postim) {
        throw new ApiError(400,"Nuk gjendet postim me kete id")
    }
    res.json(postim)
}))

router3.delete("/:id", auth, asyncHandler(async(req,res) => {
    let postim = await Postimi.findByIdAndDelete(req.params.id) 
    if(!postim) {
        throw new ApiError(400,"Nuk gjendet")
    }
    res.json({message: "U fshi"})
}))

export default router3