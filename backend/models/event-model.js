import mongoose from "mongoose";

const Event=new mongoose.Schema({
     logo:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true
        },
        eventType:{
            type: String,
            required:true
        },
        visibility:{
            type:String,
            enum:["public","invite-only"]
        },
        eventCategories:{
            type:String,
            required:true
        },
        prizePool:[{
        currency:{type:String,enum:["inr","usd"]},
        firstPrice:{type:Number,required:true},
        secondPrice:{type:Number,required:true},
        additionalPrices:{type:String}    
        },
        ],
        description: {
            type: String,
            required: true,
            maxlength: 5000
        },
        hostedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        entryFee:{
            type:Number,
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
                user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "users",
                  required: true,
                },
                expertise: String,
                // New field to store the judge's name at the time of event creation
                name: {
                  type: String,
                  required: true,
                },
              },
        ],
        rules:{
            type:String
        },
        guidelines:{
            type:String
        },
        submissions: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'submissions'
            }
        ],
          location:{
            type:String,
        }
    
})

export const EventModel=mongoose.model('event',Event)