import express from "express"
import { auth } from "../middleware/auth.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import upload from "../middleware/upload.js"
import User from "../models/User.js"
import ApiError from "../utils/ApiError.js"


const router2 = express.Router()

router2.get("/profili", auth, asyncHandler(async(req,res)=> {
    let user = await User.findById(req.user.id).select("-password")
    if(!user) {
        throw new ApiError(400,"Nuk gjendet user")
    }
    res.json(user)
}))

router2.put("/profili/foto", auth, upload.single("foto"), asyncHandler(async(req,res) => {
    let user = await User.findByIdAndUpdate(
        req.user.id,
        {foto: req.file ? req.file.path : ""}
    )
    if(!user) {
        throw new ApiError(400, "Nuk gjendet")
    }
    res.json(user)
}))

export default router2