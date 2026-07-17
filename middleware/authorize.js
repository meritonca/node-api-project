import ApiError from "../utils/ApiError.js";


export function authorize(...rolet) {
    return(req,res,next) => {
        if(!rolet.includes(req.user.roli)) {
            throw new ApiError(403,"Sje i autorizuar")
        }
        next()
    }
}
