import mongoose from "mongoose";

const BadgeSchema=new mongoose.Schema({
    users:[
        {type:mongoose.Schema.Types.ObjectId,ref:'users'}
    ],
    type:{
        type:String,
        enum:["bronze","silver","gold","diamond"]
    },

    specialBadges:[
       { 
        name:{
            type:String
        },
        logo:{
            type:String
        },
        orgs:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"organizations"
        },
        users:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    }
    ]
},{timestamps:true})

export const Badge=mongoose.model('badge',BadgeSchema)