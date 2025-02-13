import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import { asyncHandler } from "../utils/Asynchandler.js";
import {z} from "zod"
import nodemailer from "nodemailer";
import dotenv, { parse } from "dotenv"
import Hackathon from "../models/hackathon.model.js";
import  { TeamModel } from "../models/team.model.js";
import {  io } from "../utils/socket.js";
import { assignBadges } from "../utils/Badges.js";
import { objectIdSchema } from "./team.controllers.js";
import { resolveContent } from "nodemailer/lib/shared/index.js";
import { EventModel } from "../models/event-model.js";

dotenv.config({
    path:'./.env'
})

export const userSignUp=asyncHandler(async (req,res) => {

   

    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message : "All fields are required."})
    }
    const nameUsed = await UserModel.findOne({name:name})
    if(nameUsed){
        return res.status(400)
        .json({
            message:"Name already in use."
        }) 
    }

    const existingUser=await UserModel.findOne({email:email})
    console.log("USer signup clicked " , existingUser);

    if(existingUser){
        return res.status(400)
        .json({
            message:"User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser=await UserModel.create({
        name,
        email:email, 
        password:hashedPassword,
        
    }
    )
    const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"6h"})
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:24 * 60 * 60 * 1000
    }
    res.cookie("token",token,options)
     return res.status(201).json({ message: "User registered! Check your email for verification.",
        user:newUser
      });
})


export const updateProfile=asyncHandler(async (req,res,next) => {
    const requestBody=z.object({
        address:z.string().min(3).max(100),
        isAvailable:z.boolean(),
        dob:z.string().max(15),
        collegeName:z.string().min(3).max(100),
        githubProfile: z.string().url("Invalid GitHub URL").regex(/^https:\/\/github\.com\/[a-zA-Z0-9-]+$/, "Invalid GitHub profile link"),
        linkedInProfile: z.string().url("Invalid LinkedIn URL").regex(/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/, "Invalid LinkedIn profile link"),
        role:z.enum(["admin","participant" , "organizer" , "mentor","judge"],"Invalid Role"),
        skills:z.array(z.string()).optional(),
        participatedIn:z.array(z.string()).optional(),
        achievements:z.array(z.string()).optional()
    })

    const parsedData=requestBody.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json({errors:parsedData.error.errors})
    }
    const { address, isAvailable, dob, collegeName, 
        githubProfile, linkedInProfile, role,achievements,participatedIn,skills}=parsedData.data

        const user=req.user
      const updateProfile=await UserModel.findByIdAndUpdate({
            _id:user._id
        },
        {
        address,
        isAvailable,
        dob,
        collegeName,
        githubProfile,
        linkedInProfile,
        role,
        isVerified:false,
        participatedIn,
        skills,
        achievements
        },
        {new:true}
    )
    if(!updateProfile){
        return res.status(400).json({
            message:"User details not updated successfully",
        })
    }
    return res.status(201).json({
        message:"User details updated successfully",
        updateProfile
    })
})


export const userLogin=asyncHandler(async (req,res) => {
    const {email,password}=req.body
    const user=await UserModel.findOne({email:email})
    if(!user){
        return res.status(404).json({
            message:"User not found"
        }) 
    }
    const checkPassword=await bcrypt.compare(password,user.password)
    if (!checkPassword) return res.status(400).json({ message: "Invalid email or password" });


    const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"6h"})
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:24 * 60 * 60 * 1000
    }
    res.cookie("token",token,options)

    return res.status(200).json({
        message:"Login sucessfull",
        user
    })
})


export const userLogout=asyncHandler(async (req,res) => {
    res.clearCookie("token")
    return res.status(200).json({
        message:"Logout Successfull"
    })
})


export const registerHackathon=asyncHandler(async (req,res) => {
  const requestBody=z.object({
    hackathonId:z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format")
  })

  const parsedData=requestBody.safeParse(req.body)

  if (!parsedData.success) {
    return res.status(400).json({ message: parsedData.error.errors });
    }
    const {hackathonId}=parsedData.data
    const user=req.user
    const hackathon=await Hackathon.findById(hackathonId).populate("organizations")
    
    if (!hackathon) {
        return res.status(404).json({ message: "Hackathon not found" });
      }
    hackathon.push(participants._id)
    
    io.to(orgs.socketId).emit("NewRegistrations",{user})
    console.log(`new member event fired to ${orgs} with ${user} data`);
    return res.status(200).json({
        message:"Sucessfully participated in Hackathon",
        user,
        leagueMessage
    }
    )

})

export const checkAuth = asyncHandler(async(req,res)=>{
    return res.status(200).json(req.user);
})

export const hostEvents=asyncHandler(async (req,res) => {
    const {
        logo,
        title,
        eventType,
        visibility,
        eventCategories,
        prizePool,
        description,
        hostedBy,
        entryFee,
        maxTeamSize,
        participants,
        endDate,
        registrationDeadline,
        judges,
        submissions,
        rules,
        guidelines,
        location
      } = req.body;
      if (
        !logo ||
        !eventType ||
        !eventCategories ||
        !description ||
        !hostedBy ||
        !endDate ||
        !registrationDeadline ||
        !judges ||
        !title
      ) {
        res.status(400);
        throw new Error("Please provide all required fields");
      }


      const event = await EventModel.create({
        logo,
        eventType,
        visibility,
        eventCategories,
        prizePool,
        description,
        hostedBy,
        entryFee,
        maxTeamSize,
        participants,
        endDate,
        registrationDeadline,
        judges,
        title,
      });
      const user=req.user


      user.eventsHosted.push(event._id)
      await user.save()
      return res.status(200).json({messsage:"Event Created",event})

})

export const getActiveEvents=asyncHandler(async (req,res) => {
    const user=req.user 
    const events=await EventModel.find({status:"upcoming"})
    if(!events){
        return res.status(201).json({message:"No Current events active"})
    }
    return res.status(200).json({success:true,events})


})

export const getParticipants=asyncHandler(async (req,res) => {
    const {eventID}=req.params
    if(!eventID){
        return res.status(400).json({message:"Event id missing"})
    }
    const event = await EventModel.findById(eventId);
    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }
  
    // Count the participants using the length of the participants array
    const participantCount = event.participants.length;
    return res.status(200).json({
        success: true,
        participantCount,
      });
})

export const registerEvents=asyncHandler(async (req,res) => {
    
})