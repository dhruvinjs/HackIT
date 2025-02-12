import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import jwt from "jsonwebtoken"
export const authProtection = asyncHandler(async(req,res,next)=>{
    const token = req.cookie.token;
    if(!token){
        return res.status(403).json({
            message: "Unauthenticated user."
        })
    }
    const decodedData = jwt.verify(token , process.env.JWT_SECRET);
    if(!decodedData){
        return res.status(403).json({
            message: "Unauthenticated user."
        })
    }
    const user = await UserModel.findOne({email : decodedData.email});
    if(!user){
        return res.status(403).json({
            message: "Unauthenticated user."
        })
    }
    req.user = user;
    next();
})