import express from "express"
import ApiError from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import Produkt from "../models/Produkt.js"
import {auth} from "../middleware/auth.js"
import {authorize} from "../middleware/authorize.js"

const produktRouter = express.Router()

produktRouter.get("/", asyncHandler(async(req,res) => {
    let filter = {}
    if(req.query.kategoria) {
        filter.kategoria = req.query.kategoria
    }

    if(req.query.disponueshme) {
        filter.disponueshme = req.query.disponueshme === "true"
    }

    if(req.query.cmimiMin || req.query.cmimiMax) {
        filter.cmimi = {}
        if(req.query.cmimiMin) filter.cmimi.$gte = Number(req.query.cmimiMin)
        if(req.query.cmimiMax) filter.cmimi.$lte = Number(req.query.cmimiMax)
    }

    let sort = {}
    if(req.query.sort) {
        let fusha = req.query.sort
        if(fusha.startsWith("-")) {
            sort[fusha.slice(1)] = -1
        } else {
            sort[fusha] = 1
        }
    }

    if(req.query.search) {
        filter.emri = {$regex: req.query.search, $options: "i"}
    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5

    let skip = (page - 1) * limit
    
    let produkt = await Produkt.find(filter).skip(skip).limit(limit)

    let totali = await Produkt.countDocuments(filter)

    res.json({
        page,
        limit,
        totalProdukte: totali,
        totalFaqe: Math.ceil(totali / limit),
        produktet: produkt
    })
}))

produktRouter.get("/:id", asyncHandler(async(req,res) => {
    let produkt = await Produkt.findById(req.params.id)
    if(!produkt) {
        throw new ApiError(400,"Nuk u gjend")
    }
    res.json(produkt)
}))

produktRouter.post("/", auth, authorize("admin"),asyncHandler(async(req,res)=> {
    let produkti = new Produkt({
        emri: req.body.emri,
        cmimi: req.body.cmimi,
        kategoria: req.body.kategoria,
        disponueshem: req.body.disponueshem
    })
    let ri = produkti.save()
    res.json(ri)
}))

produktRouter.put("/:id",auth,authorize("admin"),asyncHandler(async(req,res)=> {
    let produkt = await Produkt.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    if(!produkt) {
        throw new ApiError(400,"Nuk gjendet")
    }
    res.json(produkt)
}))

produktRouter.delete("/:id",auth,authorize("admin"), asyncHandler(async(req,res)=> {
    let produkt = await Produkt.findByIdAndDelete(req.params.id)
    if(!produkt) {
        throw new ApiError(400,"Nuk gjendet")
    }
    res.json({message: "U fshi"})
}))

export default produktRouter