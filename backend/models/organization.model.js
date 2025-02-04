import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    sponser:{
        type:String,
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
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            role: {
              type: String,
              enum: ['admin', 'organizer', 'mentor', 'participant'],
              default: 'participant'
            },
            joinedAt: {
              type: Date,
              default: Date.now
            }
        }
    ]
})

const Organization = mongoose.model("organizations",organizationSchema)
export default Organization;