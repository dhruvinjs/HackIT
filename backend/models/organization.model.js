import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    sponser:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    hackathonsOrangized:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"hackathons"
        }
    ],
    socialLinks:
    {
        linkedin: String,
        twitter: String,
        github: String
    },
    website:{
        type:String,
    },
    logo:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    members:[
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            role: {
              type: String,
              enum: ['admin', 'organizer', 'mentor'],
              default: 'participant'
            },
            joinedAt: {
              type: Date,
              default: Date.now
            }
        }
    ]
},{timestamps:true})

const Organization = mongoose.model("organizations",organizationSchema)
export default Organization;