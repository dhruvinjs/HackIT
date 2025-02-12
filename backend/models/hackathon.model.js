import mongoose, { mongo } from "mongoose";
import { boolean } from "zod";

const hackathonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"organizations",
        required:true
    },
    entryFee:{
        type:Number,
        required:true,
    },
    maxTeamSize: {
        type: Number,
        default: 4
    },
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'teams' }
    ],
   results:{
    winners:[{
        team:{type:mongoose.Schema.Types.ObjectId, ref:'teams'},
        prizeAmt:{type:Number}
    }],
    runnerup:[{
        team:{type:mongoose.Schema.Types.ObjectId,ref:"teams"},
        prizeAmt:{type:Number}//Runner up will have some price amt 
    }]
   },
    endDate: {
        type: Date,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true
    },
    judges: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
          expertise: String
        }
    ],
    submissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'submissions'
        }
    ],
    prizes: [
        {
          title: String,
          description: String,
          amount: Number
        }
    ],
    location:{
        type:String,
        required:true,
    }

},{timestamps:true})

const Hackathon = mongoose.model("hackathon",hackathonSchema)
export default Hackathon;