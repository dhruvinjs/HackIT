import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique : true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength : 6
    },
    address:{
        type:String,
        required : true,
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
    githubProfile:{
        type:String,
    }
    ,linkedInProfile:{
        type:String,
    }
    ,twitterInProfile:{
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
const Auth = mongoose.model("users" , authSchema);
export default Auth;