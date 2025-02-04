import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  logo: {
    type: String,
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hackathons',
    required: true
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
      email: { type: String, required: true },
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
  
},{timestamps:true});

export default mongoose.model('teams', TeamSchema);
