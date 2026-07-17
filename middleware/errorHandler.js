import ApiError from "../utils/ApiError.js"

export const errorHandler = (err,req,res,next) => {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({error: err.message})
    }
    console.log(err)
    res.status(500).json({error: "Serveri ka probleme"})
}

