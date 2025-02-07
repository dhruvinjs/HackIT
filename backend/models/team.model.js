import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000,
    required : true,
  },
  logo: {
    type: String,
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hackathons',
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
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission'
    }
  ],
  invitations: [
    {
      receiversId: { type: mongoose.Schema.Types.ObjectId, required: true },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
      },
      invitedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  mentor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
  
},{timestamps:true});

export const TeamModel=mongoose.model('teams', TeamSchema);
