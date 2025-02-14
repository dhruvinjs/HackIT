import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
    required : true
  },
  members: [
    {
      memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      role: {
        type: String,
        enum: ['leader', 'member'],
        default: 'member'
      }
    }
  ],
  submission:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'submissions'
   }
  
  
},{timestamps:true});

export const TeamModel=mongoose.model('teams', TeamSchema);
