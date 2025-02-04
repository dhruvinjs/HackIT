import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique : true,
    },
    address:{
        type:String,
        required : true,
    },
    participatedIn:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"hackathon",
        }
    ],
    achievements:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"hackathon",
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
        enum:["admin","participant" , "organizer" , "mentor"],
        default:"participant"
    }

})
const Auth = mongoose.model("users" , authSchema);
export default Auth;