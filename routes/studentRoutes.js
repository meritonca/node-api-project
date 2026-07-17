import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import Student from "../models/Student.js"
import { authorize } from "../middleware/authorize.js"
import { auth } from "../middleware/auth.js"

const studentRouter = express.Router()

studentRouter.get("/", asyncHandler(async(req,res) => {
    let filter = {}

    if(req.query.lenda) {
        filter.lenda = req.query.lenda
    }
    if(req.query.klasa) {
        filter.klasa = req.query.klasa
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

    let studente = await Student.find(filter).sort(sort).skip(skip).limit(limit)
    let totali = await Student.countDocuments(filter)

    res.json({
        page,
        limit,
        totalStudntent: totali,
        totalFaqe: Math.ceil(totali / limit),
        studentet: studente
    })
}))

studentRouter.get("/:id", asyncHandler(async(req,res) => {
    let student = await Student.findById(req.params.id)
    if(!student) {
        throw new ApiError(400,"Nuk u gjend")
    }
    res.json(student)
}))

studentRouter.post("/",auth,authorize("admin"),asyncHandler(async(req,res)=> {
    let student = new Student({
        emri: req.body.emri,
        mbiemri: req.body.mbiemri,
        nota: req.body.nota,
        lenda: req.body.lenda,
        klasa: req.body.klasa
    })
    let ri = await student.save()
    res.json(ri)
}))

studentRouter.put("/:id", auth,authorize("admin"), asyncHandler(async(req,res) => {
    let student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    if(!student) {
        throw new ApiError(400,"Nuk gjendet")
    }
    res.json(student)
}))

studentRouter.delete("/id", auth,authorize("admin"),asyncHandler(async(req,res) => {
    let student = await Student.findByIdAndDelete(req.params.id)
    if(!student) {
        throw new ApiError(400,"Nuk u gjend")
    }
    res.json({message: "U fshi"})
}))

export default studentRouter