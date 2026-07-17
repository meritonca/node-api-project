import { upload } from "../middleware/upload.js";
import express from "express"

const router4 = express.Router()


router4.post("/foto", upload.single("foto"), (req,res) => {
    if(!req.file) {
        return res.status(400).json({error: "Asnje file seshte bere upload"})
    }

    res.json({
        message: "U be upload",
        file: {
            emri: req.file.originalname,
            rruga: req.file.path,
            gjatsia: req.file.size
        }
    })
})

router4.post("/fotot", upload.array("fotot",5), (req,res) => {
    if(!req.files) {
        return res.status(400).json({error: "Asnje seshte upload"})
    }
    res.json({
        message: `${req.files.length} u bene upload`,
        file: req.files
    })
})

export default router4