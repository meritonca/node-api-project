import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import Libri from "../models/Libri.js"

const router1 = express.Router()

router1.get("/", asyncHandler(async(req,res) => {
    let filter = {}

    if(req.query.autori) {
        filter.autori = req.query.autori
    }

    if(req.query.disponueshem) {
        filter.disponueshem = req.query.disponueshem === 'true'
    }

    if(req.query.cmimiMin || req.query.cmimiMax) {
        filter.cmimi = {}
        if(req.query.cmimiMin) filter.cmimi.$gte = Number(req.query.cmimiMin)
        if(req.query.cmimiMax) filter.cmimi.$lte = Number(req.query.cmimiMax)
    }

    if(req.query.vitiMin || req.query.vitiMax) {
        filter.viti = {}
        if(req.query.vitiMin) filter.viti.$gte = Number(req.query.vitiMin)
        if(req.query.vitiMax) filter.viti.$lte = Number(req.query.vitiMax)
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
        filter.titulli = {$regex: req.query.search, $options: "i"}
    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5

    let skip = (page - 1) * limit

    let liber = await Libri.find(filter).sort(sort).skip(skip).limit(limit)

    let total = await Libri.countDocuments(filter)

    res.json({
        page,
        limit,
        skip,
        totalLibra: total,
        totalFaqe: Math.ceil(total / limit),
        librat: liber
    })
}))

export default router1