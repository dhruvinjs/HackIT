import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
        enum:["admin","participant" , "organizer" , "mentor","judge"],
        default:"participant"
    }
    
},{timestamps:true})
export const UserModel = mongoose.model("users" , UserSchema);
