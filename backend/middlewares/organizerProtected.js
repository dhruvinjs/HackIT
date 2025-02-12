import { asyncHandler } from "../utils/Asynchandler.js";
export const organizerProtected = asyncHandler(async(req , res , next)=>{
    const user = req.user;
    if(!user){
        return res.status(403).json({message : "Unauthenticated User."});
    }
    if( user.role != "organizer"){
        return res.status(403).json({message : "Unauthorized User."});
    }
    next();
})