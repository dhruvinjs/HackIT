import Chat from "../models/chat.model.js";
import { TeamModel } from "../models/team.model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import {z} from "zod"
import { io , getReceiverSocketId , userSocketMap } from "../utils/socket.js";

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const createTeam = asyncHandler(async(req,res)=>{
    const {name ,leaderId , description , logo ,hackathon} = req.body;
    // Note LeaderId is user._id
    const teamExists = await TeamModel.findOne(name);
    if(teamExists){
        return res.status(400).json({message : "Team Name already in use."});
    }
    const team = await TeamModel.create({
        name ,
        description,
        logo : logo ? logo : "",
        hackathon,
        members :[
            {
                memberId : leaderId,
                role : "leader"
            }
        ]
    })
    const chat = await Chat.create({
        teamId : team._id
    })

    return res.status(200).json({message : "Team created successfully."});    
})

export const sendInvitation = asyncHandler(async (req, res) => {
    const { receiversId } = req.body; 
    const teamId = req.params.teamId;
    if (!receiversId) {
        return res.status(400).json({ message: "Receiver ID is required." });
    }

    const teamExists = await TeamModel.findById(teamId);
    if (!teamExists) {
        return res.status(404).json({ message: "Team not found." });
    }

    const alreadyInvited = teamExists.invitations.some(
        (invitation) => invitation.receiversId.toString() === receiversId
    );

    if (alreadyInvited) {
        return res.status(400).json({ message: "User has already been invited." });
    }

    teamExists.invitations.push({ receiversId, status: "pending" });
    await teamExists.save();

    return res.status(201).json({ message: "Invitation sent successfully." });
});

export const removeMember = asyncHandler(async(req,res)=>{
    const {memberId} = req.body;
    const teamId = req.params.teamId;

    if (!memberId) {
        return res.status(400).json({ message: "Member ID is required." });
    }

    const team = await TeamModel.findById(teamId);
    if(!team){
        return res.status(404).json({message : "Team Not found"});
    }
    
    const memberIndex = team.members.findIndex(member => member.memberId === memberId);
    if (memberIndex === -1) {
        return res.status(404).json({ message: "Member not found in the team." });
    }

    team.members.splice(memberIndex, 1);
    await team.save();

    return res.status(200).json({ message: "Member removed successfully.", team });
})

export const sendMessage = asyncHandler(async(req,res)=>{
    const teamId = req.params.teamId;
    const {text} = req.body;

    if(!text){
        return res.status(400).json({message : "Text is required."});
    }

    const team = await TeamModel.findById(teamId);
    if(!team){
        return res.status(404).json({message : "Team Not found"});
    }

    const chat = await Chat.findOne({teamId});
    if(!chat){
        return res.status(404).json({message : "Chat not found."});
    }

    chat.messages.push({senderId : req.user._id , text});
    await chat.save();

    for (const userId in userSocketMap) {
        if(team.members.some(member => member.memberId === userId) && userId != req.user._id){
            io.to(getReceiverSocketId(userId)).emit("recieveMessage",{text , senderId : req.user._id ,time : Date.now() })
            console.log(`Emitted recieveMessage event to user: ${userId} , socketId ; ${getReceiverSocketId(userId)}`);
        }
    }
    return res.status(200).json({message : "Message send" , chat});
})

