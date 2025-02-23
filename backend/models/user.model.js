import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique : true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    participatedIn:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"event",
        }
    ],
    achievements:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"hackathons",
        }
    ],
    league:{
        type:String, 
    },
    isAvailable:{
        type:Boolean,
        default : true,
    },
    skills:[
        {
            type:String ,
        }
    ],
    dob:{
        type:String,
        // required:true,
    },
    collegeName:{
        type:String,
        // required:true,
    },
    githubProfile:{
        type:String,
    },
    linkedInProfile:{
        type:String,
    }
    ,twitterProfile:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    eventsHosted:[{
        type : mongoose.Schema.Types.ObjectId,
            ref:"events",
    }]
    //mentor will be an normal user , but will play an role of mentor for a specific org when the organizer will add him as an member.
},{timestamps:true})
export const UserModel = mongoose.model("users" , UserSchema);
