import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import jwt from "jsonwebtoken"
export const authProtection = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
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
    } catch (error) {
        console.log("error in authProtection : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}


