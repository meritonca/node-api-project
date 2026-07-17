import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import Menu from "../models/Menu.js"
import { auth } from "../middleware/auth.js"
import { authorize } from "../middleware/authorize.js"
import ApiError from "../utils/ApiError.js"


const router = express.Router()

router.get("/", asyncHandler(async(req,res) => {
    let menu = await Menu.find()
    res.json(menu)
}))

router.get("/:id", asyncHandler(async(req,res) => {
    let menu = await Menu.findById(req.params.id)
    if(!menu) {
        throw new ApiError(400,"Nuk gjendet")
    }
    res.json(menu)
}))

router.post("/", auth, authorize("admin"), asyncHandler(async(req,res) => {
    let menure = new Menu({
        emri: req.body.emri,
        cmimi: req.body.cmimi,
        kategoria: req.body.kategoria
    })
    let ri = await menure.save()
    res.json(ri)
}))

router.put("/:id", auth, authorize("admin"), asyncHandler(async(req,res) => {
    let menu = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    if(!menu) {
         throw new ApiError(400,"Nuk gjendet")
    }
    res.json(menu)
}))

router.delete("/:id", auth, authorize("admin"), asyncHandler(async(req,res) => {
    let menu = await Menu.findByIdAndDelete(req.params.id)
    if(!menu) {
        throw new ApiError(400,"Nuk gjendet")
    }
    res.json({message: "U fshi"})
}))

export default router