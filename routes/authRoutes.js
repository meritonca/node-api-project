import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import User from "../models/User.js"
import ApiError from "../utils/ApiError.js"


const authRouter = express.Router()

authRouter.post("/signup", asyncHandler(async(req,res) => {
    let ekziston = await User.findOne({email: req.body.email})
    if(ekziston) {
        throw new ApiError(400,"Email ekziston")
    }
    let passHash = await bcrypt.hash(req.body.password,10)
    
    let useri = new User({
        emri: req.body.emri,
        email: req.body.email,
        password: passHash,
        roli: req.body.roli || "user"
    })
    await useri.save()

    res.json({
        message: "U bere signup",
        user: {emri: useri.emri,email: useri.email,roli: useri.roli}
    })
}))


authRouter.post("/login", asyncHandler(async(req,res) => {
    let user = await User.findOne({email: user.body.email})
    if(user) {
        throw new ApiError(400,"Email ose paswordi gabim")
    }
    let krahaso = await bcrypt.compare(req.body.password,user.password)
    if(!krahaso) {
        throw new ApiError(400,"Password i gabuar")
    }

    let token = jwt.sign(
        {id: user._id,emri: user.emri,email: user.email,roli: user.roli},
        process.env.JWT_SECRET,
        {expiresIn: "7 days"}
    )
    
    res.json({
        message: "U bere login",
        token: token
    })
}))

export default authRouter