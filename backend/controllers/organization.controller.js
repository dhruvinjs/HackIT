import Organization from "../models/organization.model.js";
import { asyncHandler } from "../utils/Asynchandler.js"
import {z} from "zod";
import Hackathon from "../models/hackathon.model.js";
import { io , getReceiverSocketId , userSocketMap } from "../utils/socket.js";
import { TeamModel } from "../models/team.model.js";
import { objectIdSchema } from "./team.controllers.js";

export const createOrganization = asyncHandler(async(req,res)=>{
    const requestBody = z.object({
        name:z.string().min(3).max(100),
        sponser:z.string().min(3).max(100).optional(),
        hackathonsOrganized: z.array(objectIdSchema),
        socialLinks : z.object({
            linkedin: z.string().url().optional(),
            twitter: z.string().url().optional(),
            github: z.string().url().optional(),
        }),
        website : z.string().url().optional(),
        logo : z.string().url().optional(),
        description : z.string().min(10).max(200),
        members:z.array(z.object({
            user: objectIdSchema,
            role: z.enum(['admin', 'organizer', 'mentor', 'participant']).default('participant'),
            joinedAt: z.date().default(() => new Date()),
        })),
    });

    const parsedData = requestBody.safeParse(req.body);
    const user = req.user;


    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors });
    }

    const { name , sponser , hackathonsOrangized , socialLinks , website , logo ,description , members} = parsedData.data;

    const existingOrg = await Organization.findOne({name:name});
    if(existingOrg){
        return res.status(400).json({
            message : "Organization name already in use."
        })
    }
    
    const newOrg = await Organization.create({
        name ,
        email,
        password : hashedPassword,
        sponser,
        hackathonsOrangized : [],
        socialLinks,
        website,
        logo,
        description,
        members:[{
            user:user._id,
            role:"organizer",
        }]
    })

    return res.status(201).json({ message: "Organization registered! Check your email for verification.",
        org:newOrg
      });
})

//Organizer will be the create of the org and a single Org can't have multiple organizer.
export const addMember = asyncHandler(async(req,res)=>{
    const requestBody = z.object({
        role: z.enum(["admin", "mentor"]).default('admin'),
        user : objectIdSchema,
    })
    const parsedData = requestBody.safeParse(req.body);
    const orgId = req.params.orgId;
    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors });
    }

    const {role , user} = parsedData.data;

    const isOrg = await Organization.findById(orgId);
    if(!isOrg){
        return res.status(404).json({message : "Organization doesn't found."})
    }
    const isAlreadyMember = isOrg.members.some(member => member.user.toString() === user);
    if (isAlreadyMember) {
        return res.status(400).json({ message: "User is already a member of this organization." });
    }
    isOrg.members.push({ role, user });
    await isOrg.save();

    return res.status(200).json({
        message : "Member added successfully.",
        org:isOrg
    })
})

export const hostHackathon = asyncHandler(async(req,res)=>{
    const requestBody = z.object({
        title:z.string().min(3).max(100),
        description:z.string().min(10).max(5000),
        organization : objectIdSchema,
        entryFee:z.number(),
        maxTeamSize : z.number().default(4),
        participants : z.array(objectIdSchema),
        endDate : z.date(),
        registrationDeadline : z.date(),
        judges:z.array(z.object({
                user:objectIdSchema,
                expertise: z.string()
            }
        )),
        submissions:z.array(objectIdSchema),
        prizes:z.array(z.object({
            title:z.string(),
            description : z.string(),
            amount : z.number()
        })),
        location : z.string()
    })
    const parsedData = requestBody.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors });
    }
    const orgId = req.params.orgId;

    const org = await Organization.findById(orgId);
    if(!org){
        return res.status(404).json({message : "Organization doesn't found."});
    }

    const {title , description ,organization ,entryFee,maxTeamSize,participants,endDate,registrationDeadline,judges,submissions,prizes,location} = parsedData.data;

    const isHackathon = await Hackathon.findOne({title});
    if(isHackathon){
        return res.status(404).json({message : "Hackathon Title already in use."});
    }
    const hackathon = await Hackathon.create({
        title,
        description,
        organization : orgId,
        entryFee,
        maxTeamSize,
        participants,
        endDate,
        registrationDeadline,
        judges,
        submissions,
        prizes,
        location
    })
    org.hackathonsOrangized.push(hackathon._id);
    await org.save();

    for (const userId in userSocketMap) {
        if(userId != req.user._id){
            io.to(getReceiverSocketId(userId)).emit("newhackathon",{hackathon})
            console.log(`Emitted newhackathon event to user: ${userId} , socketId ; ${getReceiverSocketId(userId)}`);
        }
    }

    return res.status(200).json({message : "Hackathon Hosted.",hackathon , org});
})
export const getHackathons = asyncHandler(async(req,res)=>{
    const orgId = req.params.orgId;

    const org = await Organization.findById(orgId);
    if(!org){
        return res.status(404).json({message : "Organization not found."});
    }
    return res.status(20).json({hackathons : org.hackathonsOrangized}) 
})

export const assignMentor = asyncHandler(async(req,res)=>{
    const {mentorId , teamId} = req.body;
    const orgId = req.params.orgId;

    if(!mentorId ){
        return res.status(400).json({message : "Mentor Id requried."});
    }
    if(!teamId ){
        return res.status(400).json({message : "Mentor Id requried."});
    }

    const org = await Organization.findById(orgId);
    if(!org){
        return res.status(404).json({message : "Organization not found."});
    }

    const team = await TeamModel.findById(teamId);
    if(!team){
        return res.status(404).json({message : "Team not found."});
    }

    const isMentorPresent = org.members.some(member => member.user === mentorId);
    if(!isMentorPresent){
        return res.status(400).json({message:"Mentor doesn't belong to organization."})
    }

    team.mentor = mentorId;

    return res.status(200).json({message : "Mentor Assigned" , team});
})



export const getMentors = asyncHandler(async(req,res)=>{
    const orgId = req.params.orgId;

    const org = await Organization.findById(orgId);

    if(!org){
        return res.status(404).json({message : "Oragnization not found."});
    }

    let mentors = org.members.filter((mem) =>{
        return mem.role === "mentor";
    })
    if(mentors.length === 0){
        return res.status(404).json({message : "No mentor found."});
    }
    return res.status(200).json({mentors});
})

export const getTeamsForHack = asyncHandler(async(req,res)=>{
    const hackId = req.params.hackId;

    const teams = await TeamModel.find({hackathon : hackId});
    if(!teams){
        return res.status(404).json({message : "No Teams Found."});
    }

    return res.status(200).json({teams});
})