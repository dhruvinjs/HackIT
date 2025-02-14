import { EventModel } from "../models/event-model.js";

export const hostProtection = async(req,res,next)=>{
    try {
        const eventId = req.params.id;
        const user = req.user;
        const event = await EventModel.findById(eventId);
        if(!event){
            return res.status(404).json({message : "Event not found"})
        }
        if(user._id != event.hostedBy ){
            return res.status(400).json({message : "Unauthorized user"});
        }
        next();
    } catch (error) {
        console.log("Error in hostProtection : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}