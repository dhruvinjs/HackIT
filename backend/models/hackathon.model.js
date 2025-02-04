import mongoose from "mongoose";

const hackathonSchema = mongoose.Schema({
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
        {
          team: { type: mongoose.Schema.Types.ObjectId, ref: 'teams' }
        }
    ],
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

},{timestamps:true})

const Hackathon = mongoose.model("hackathon",hackathonSchema)
export default Hackathon;