import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import { asyncHandler } from "../utils/Asynchandler.js";
import {z} from "zod"
import nodemailer from "nodemailer";
import dotenv from "dotenv"
import Hackathon from "../models/hackathon.model.js";
import teamModel, { TeamModel } from "../models/team.model.js";
import { getOrganizationSocketId, io, orgSocketMap } from "../utils/socket.js";
dotenv.config({
    path:'./.env'
})
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL,  // Use the Ethereal email
        pass: process.env.PASSWORD   // Use the Ethereal password
    }
});

export const userSignUp=asyncHandler(async (req,res) => {
    const requestBody=z.object({
        name:z.string().min(3).max(100),
        email:z.string().email("Invalid format"),
        password:z.string().min(6,"Password must have 6 characters").
        max(100,"Password must have only 100 characters")
        .regex(/[A-Z]/,"Password Must have one uppercase character")
        .regex(/[!@#$%^&*(),.?":{}|<>]/,"Password should contain one special character"),
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
    
   
    const parsedData = requestBody.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors });
    }

    const { name, email, password, address, isAvailable, dob, collegeName, 
            githubProfile, linkedInProfile, role,achievements,participatedIn,skills } = parsedData.data;
    const existingUser=await UserModel.findOne({email:email})
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
    }
    )
    // await transporter.sendMail({
    //     from: "no-reply@example.com",
    //     to: "jitubhai8928@gmail.com",
    //     subject: "Verify Your Email",
    //     html: `<p>Click <a href="http://localhost:5000/api/verify-email?token=${token}">here</a> to verify your email.</p>`,
    //   });
    // res.cookie("token",token)
     return res.status(201).json({ message: "User registered! Check your email for verification.",
        user:newUser
      });
  

})


export const userLogin=asyncHandler(async (req,res) => {
    const authSchema=z.object({
        email:z.string().email("Invalid format"),
        password:z.string().min(6,"Password must have 6 characters").
        max(100,"Password must have only 100 characters")
        .regex(/[A-Z]/,"Password Must have one uppercase character")
        .regex(/[!@#$%^&*(),.?":{}|<>]/,"Password should contain one special character")
    })
    const parsedData=authSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(404).json({
            message:parsedData.error.errors
        })
    }
    const {email,password}=parsedData.data
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
        message:"Login sucessfull"
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
    hackathonId:z.string().min(3).max(100),
    teamMembers:z.array(z.string()).optional(),
    teamDescription:z.string().optional(),
    teamName:z.string().optional(),
    role:z.string().optional()
  })

  const parsedData=requestBody.safeParse(req.body)

  if (!parsedData.success) {
    return res.status(400).json({ message: parsedData.error.errors });
    }
    const {hackathonId,teamMembers,teamDescription,teamName}=parsedData.data
    const user=req.user
    if(teamMembers){
        const members=await UserModel.find({_id:{$in :teamMembers} })


        if(members.length !== teamMembers.length){
            return res.status(400)
            .json({
                message:"One of the team members ID are invalid"
            })
        }
    }
    const hackathon=await Hackathon.findById(hackathonId).populate("organizations")

    if (!hackathon) {
        return res.status(404).json({ message: "Hackathon not found" });
      }
    hackathon.push(participants._id)
    const newTeam=await TeamModel.create({
        name:teamName || "",
        hackathon:hackathon,
        description:teamDescription || "",
        members:members || [],
    })
    const orgs=hackathon.organizations
    io.to(orgs.socketId).emit("NewRegistrations",{newTeam})
    console.log(`new member event fired to ${orgs} with ${newTeam} data`);
    return res.status(200).json({
        message:"Sucessfully participated in Hackathon",
        newTeam
    }
    )

})
