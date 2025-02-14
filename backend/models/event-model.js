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
            enum:["public","invite-only"],
            default : "public"
        },
        categories:[
            {
                type:String,
            }
        ],
        totalPrizePool:{
            type:String,
            required:true
        },
        opportunityDetails:{
            type:String,
            required:true,
        },
        prizeCurrency:{type:String,enum:["INR","USD"],default:"INR"},
        firstPrize:{type:String,required:true},
        secondPrize:{type:String,required:true},
        thirdPrize:{type:String,required:true},
        additionalPrizes:{
            type:String,
            required:true
        },
        hostedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        participationType : {
            type:String,
            enum :["individual" , "team"],
            default : "individual",
        },
        entryFee:{
            type:String,
            required:true
          },
          minTeamSize: {
            type: String,
            required:true
        },  
        maxTeamSize: {
            type: String,
            required:true
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
       registrationStartDate:{
        type: Date,
            required: true
       },
       registrationEndDate: {
            type: Date,
            required: true
        },
        projectSubmissionDeadline: {
            type: Date,
            required: true
        },
        judges: [
            {
                user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "users",
                //   required: true,
                },
                expertise: String,
                // New field to store the judge's name at the time of event creation
                name: {
                  type: String,
                //   required: true,
                },
              },
        ],
        rules:{
            type:String
        },
        guidelines:{
            type:String,
            required:true,
            maxLength : 3000
        },
        submissions: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'submissions'
            }
        ],
          location:{
            type:String,
          },
          status:{
            type:String,
            enum:['active',"upcoming","completed"],
            defualt:"upcoming"
          },
          maxRegistrations:{
            type:String,
            required:true,
          }
})

export const EventModel=mongoose.model('event',Event)



// title,
// logo,
// eventType,
// visibility,
// location,
// categories,
// totalPrizePool,
// prizeCurrency,
// firstPrize,
// secondPrize,
// thirdPrize,
// additionalPrizes,
// participationType,
// opportunityDetails,
// registrationStartDate,
// registrationEndDate,
// maxRegistrations,
// guidelines,
// rules,
// judges,
// minTeamSize,
// maxTeamSize,