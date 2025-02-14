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
import Chat from "../models/chat.model.js";

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
      logo,
    title,
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
    orgname,
    orgemail,
    orgno,
  } = req.body;

  // Validate required fields
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
    !entryFee ||
    !orgname ||
    !orgemail ||
    !orgno ||
    !projectSubmissionDeadline
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Upload the logo image to Cloudinary
//   let uploadedResponse;
//   try {
//     const response = await cloudinary.uploader.upload(logo);
//     uploadedResponse = response.secure_url;
//   } catch (error) {
//     res.status(500);
//     throw new Error("Image upload failed");
//   }

  // Create the event
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
    orgno,
  });

  // Add the event to the host user's eventsHosted array and save
  req.user.eventsHosted.push(event._id);
  await req.user.save();

  // Notify connected users (except the host) about the new event
  for (const userId in userSocketMap) {
    if (String(req.user._id) !== userId) {
      io.to(getReceiverSocketId(userId)).emit("newEvent", { event });
    }
  }

  return res.status(200).json({ message: "Event Created", event });
});


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



export const registerEvents = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const { name, members } = req.body;
  const user = req.user;

  if (!name) {
    return res.status(400).json({ message: "Team name is required." });
  }

  const event = await EventModel.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  if (Number(event.maxRegistrations) <= event.participants.length) {
    return res.status(400).json({ message: "Event registration limit has been reached." });
  }

  const currentDate = new Date();
  if (currentDate > event.registrationEndDate) {
    return res.status(400).json({ message: "Event registration has ended." });
  }

  // Build the team members array.
  // For individual participation, only the current user (as leader) is added.
  // For team participation, include the current user as leader plus additional members.
  let membersArr;
  if (event.participationType === "individual") {
    membersArr = [
      { memberId: user._id, role: "leader" }
    ];
  } else {
    membersArr = [
      { memberId: user._id, role: "leader" },
      ...members  // Assuming `members` is an array of objects { memberId, role }
    ];
  }

  // Create the team and associate it with the event.
  const team = await TeamModel.create({
    name,
    event: eventId,
    members: membersArr
  });

  // Update each participating user's 'participatedIn' field.
  // Use findByIdAndUpdate with the ID directly.
  await Promise.all(
    membersArr.map(member =>
      UserModel.findByIdAndUpdate(member.memberId, { $push: { participatedIn: event._id } })
    )
  );

  // Add the new team to the event's participants array.
  event.participants.push(team);
  await event.save();

  // If the event is a team event (not individual), create a chat for the team.
  let chat;
  if (event.participationType !== "individual") {
    chat = await Chat.create({ teamId: team._id, messages: [] });
  }

  // Optionally, re-fetch the current user's updated data if needed
  const updatedUser = await UserModel.findById(user._id).select('-password');

  return res.status(200).json({
    message: "Registered for event",
    team,
    chat,
    user: updatedUser
  });
});



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
        return res.status(200).json(event)
    } catch (error) {
        console.log("error in getEventDetails : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}

export const getUsers = async(req,res)=>{
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Search text is required" });
        }
        const users = await UserModel.find({ name: { $regex: name, $options: "i" } });
        if(users.length===0){
            return res.status(400).json({messsage:"no user found"})
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const getAppliedHackathons=asyncHandler(async (req,res) => {
    const user = await UserModel.findById(req.user._id).populate('participatedIn');

  const eventNames = user.participatedIn;
    

    if(!eventNames || eventNames.length===0){
        return res.status(400).json({message:"No events found"})
    }

    return res.status(200).json({message:"Events found",eventNames})
})