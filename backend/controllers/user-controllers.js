import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/Asynchandler.js";
import { z } from "zod"
import dotenv, { parse } from "dotenv"
import cloudinary from "../utils/cloudinary.js";
import { io, userSocketMap, getReceiverSocketId } from "../utils/socket.js";
import { EventModel } from "../models/event-model.js";
import { TeamModel } from "../models/team.model.js";

dotenv.config({
    path: './.env'
})

export const userSignUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." })
    }
    const nameUsed = await UserModel.findOne({ name: name })
    if (nameUsed) {
        return res.status(400)
            .json({
                message: "Name already in use."
            })
    }

    const existingUser = await UserModel.findOne({ email: email })
    console.log("USer signup clicked ", existingUser);

    if (existingUser) {
        return res.status(400)
            .json({
                message: "User Already Exists"
            })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        name,
        email: email,
        password: hashedPassword,

    }
    )
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "6h" })
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("token", token, options)
    return res.status(201).json({
        message: "User registered! Check your email for verification.",
        user: newUser
    });
})


export const updateProfile = asyncHandler(async (req, res, next) => {
    const requestBody = z.object({
        address: z.string().min(3).max(100),
        isAvailable: z.boolean(),
        dob: z.string().max(15),
        collegeName: z.string().min(3).max(100),
        githubProfile: z.string().url("Invalid GitHub URL").regex(/^https:\/\/github\.com\/[a-zA-Z0-9-]+$/, "Invalid GitHub profile link"),
        linkedInProfile: z.string().url("Invalid LinkedIn URL").regex(/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/, "Invalid LinkedIn profile link"),
        role: z.enum(["admin", "participant", "organizer", "mentor", "judge"], "Invalid Role"),
        skills: z.array(z.string()).optional(),
        participatedIn: z.array(z.string()).optional(),
        achievements: z.array(z.string()).optional()
    })

    const parsedData = requestBody.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors })
    }
    const { address, isAvailable, dob, collegeName,
        githubProfile, linkedInProfile, role, achievements, participatedIn, skills } = parsedData.data

    const user = req.user
    const updateProfile = await UserModel.findByIdAndUpdate({
        _id: user._id
    },
        {
            address,
            isAvailable,
            dob,
            collegeName,
            githubProfile,
            linkedInProfile,
            role,
            isVerified: false,
            participatedIn,
            skills,
            achievements
        },
        { new: true }
    )
    if (!updateProfile) {
        return res.status(400).json({
            message: "User details not updated successfully",
        })
    }
    return res.status(201).json({
        message: "User details updated successfully",
        updateProfile
    })
})


export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) return res.status(400).json({ message: "Invalid email or password" });


    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "6h" })
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("token", token, options)

    return res.status(200).json({
        message: "Login sucessfull",
        user
    })
})


export const userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        message: "Logout Successfull"
    })
})


export const checkAuth = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
})

export const hostEvents = asyncHandler(async (req, res) => {
    const {
        title,
        logo,
        eventType,
        visibility,
        location,
        categories,
        entryFee,
        totalPrizePool,
        prizeCurrency,
        firstPrize,
        secondPrize,
        thirdPrize,
        additionalPrizes,
        participationType,
        opportunityDetails,
        registrationStartDate,
        projectSubmissionDeadline,
        registrationEndDate,
        maxRegistrations,
        guidelines,
        rules,
        judges,
        minTeamSize,
        maxTeamSize,
        status,
        orgname, orgemail, orgno
    } = req.body;
    if (
        !logo ||
        !eventType ||
        !registrationStartDate ||
        !registrationEndDate ||
        !guidelines ||
        !rules ||
        !judges ||
        !title ||
        !visibility ||
        !entryFee || !orgname || !orgemail || !orgno ||
        !projectSubmissionDeadline
    ) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }
    let uploadedResponse;
    const response = await cloudinary.uploader.upload(logo);
    uploadedResponse = response.secure_url;



    const event = await EventModel.create({
        hostedBy: req.user._id,
        title,
        logo: uploadedResponse,
        eventType,
        visibility,
        location,
        categories,
        totalPrizePool,
        prizeCurrency,
        status: status ? status : "upcoming",
        firstPrize,
        secondPrize,
        thirdPrize,
        additionalPrizes,
        participationType,
        opportunityDetails,
        registrationStartDate,
        registrationEndDate,
        maxRegistrations,
        projectSubmissionDeadline,
        guidelines,
        entryFee,
        rules,
        judges,
        minTeamSize,
        maxTeamSize,
        orgname,
        orgemail,
        orgno
    });
    const user = req.user


    user.eventsHosted.push(event._id)
    await user.save()
    for (const userId in userSocketMap) {
        if (event.hostedBy != userId) {
            io.to(getReceiverSocketId(userId)).emit("newEvent", { event })
        }
    }
    return res.status(200).json({ messsage: "Event Created", event })

})

export const getActiveEvents = asyncHandler(async (req, res) => {
    const user = req.user
    const events = await EventModel.find({ status: "upcoming" })
    if (!events) {
        return res.status(201).json({ message: "No Current events active" })
    }
    return res.status(200).json({success:true,events})


})

export const getParticipants = asyncHandler(async (req, res) => {
    const { eventID } = req.params
    if (!eventID) {
        return res.status(400).json({ message: "Event id missing" })
    }
    const event = await EventModel.findById(eventID);
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
    const id = req.params.id;
    const {name,members}=req.body;
    if(!name){
        return res.status(400).json({message : "Team name is required."})
    }
    const event = await EventModel.findById(id); 
    if(!event){
        return res.status(404).json({message:"Event not found."});
    }
    if(Number(event.maxRegistrations) == event.participants.length){
        return res.status(400).json({message : "Event registeration limit have reached."})
    }
    const currentDate = new Date();
    if(currentDate == event.registrationEndDate){
        return res.status(400).json({message : "Event registeration have Ended."})
    }

    let membersArr = event.participationType == "individual" ? [
        {
            memberId : req.user._id,
            role : "leader"
        }
    ] : [
        {
            memberId : req.user._id,
            role : "leader"
        },...members
    ]

    const team = await TeamModel.create({
        name , event : id , members :membersArr
    })
    event.participants.push(team);
    await event.save();
<<<<<<< Updated upstream
    return res.status(200).json({message : "Registered of event" , team});
})



export const projectSubmission=asyncHandler(async (req,res) => {
    const requestBody={
        githubRepoLink: z.string().url("Invalid GitHub URL").regex(/^https:\/\/github\.com\/[a-zA-Z0-9-]+$/, "Invalid GitHub repo link"),
        teamId:z.string().min(3).max(100),
        eventId:z.string().min(3).max(100),
        description:z.string().min(3).max(100),
        techStack:z.array(z.string()),

    }

    const parsedBody=requestBody.safeParse(req.body)
    if(!parsedBody.success){
        return res.status(400).json({errors: parsedData.error.errors})
    }
    const {githubRepoLink,teamId,eventId}=parsedBody.data
    const event=await EventModel.findById(eventId)
    if(!event){
        return res.status(400).json({message:"Event Not Found"})
    }
    const team=await TeamModel.findById(teamId)
    if(!team){
        return res.status(400).json({message:"Team not found"})
    }
    // Validate event submission deadline
    const currentDate = new Date();

    const eventDeadline = new Date(event.projectSubmissionDeadline); // Assuming `submissionDeadline` is stored in the database

    if(currentDate>eventDeadline){
        return res.status(400).json({message:"Sorry time for submission has ended"})
    }

    const newSubmission=await submissionModel.create({
        title: `Submission by ${team.name}`, // You can adjust the title dynamically
    description: parsedBody.data.description,
    techStack: parsedBody.data.techStack,
    githubRepo: githubRepoLink,
    demoVideo: req.body.demoVideo || "", // Optional field
    team: teamId,
    hackathon: eventId,
    judgesFeedback: [], // Initially empty
    averageScore: 0, // No score yet
    status: "submitted" // Default status
    })
    team.submission=newSubmission._id

    event.submissions=newSubmission._id
    await team.save()
    await event.save()

    return res.status(201).json({message:"Project is submitted"})


})


export const getEventDetails = async(req,res)=>{
    try {
        const id = req.params.id;

        const event = await EventModel.findById(id);
        if(!event){
            return res.status(404).json({message : "Event not found."});
        }
        return res.status(200).json({event})
    } catch (error) {
        console.log("error in getEventDetails : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}