import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    let llojeFile = ['image/jpg','image/png']
    if(llojeFile.includes(file.mimetype)) {
        cb(null,true)
    } else {
        cb(new Error("Vetem jpg dhe png lejohen"),false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
})

export default upload