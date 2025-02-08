import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique : true,
    },
    googleId:{
        type:String,
        unique:true,
        required:true
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
            ref:"hackathons",
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
        required:true,
    },
    collegeName:{
        type:String,
        required:true,
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
    role:{
        type:String,
        enum:["admin","participant" , "organizer" ,"judge"],
        default:"participant"
    }
    //mentor will be an normal user , but will play an role of mentor for a specific org when the organizer will add him as an member.
},{timestamps:true})
export const UserModel = mongoose.model("users" , UserSchema);
