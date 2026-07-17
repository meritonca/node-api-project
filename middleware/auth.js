import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

export function auth(req,res,next) {
    let token = req.headers['auhtorization']
    if(!token) {
        throw new ApiError(400,"Nuk ka token")
    }
    if(token.startsWith("Bearer")) {
        token = token.slice(7)
    }
    try {
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded,
        next()
    } catch(err) {
        throw new ApiError(400,"Nuk perputhen")
    }
}

