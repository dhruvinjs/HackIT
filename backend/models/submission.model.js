import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 3000
  },
  techStack: [
    {
      type: String
    }
  ],
  githubRepo: {
    type: String,
    required: true
  },
  demoVideo: {
    type: String 
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teams',
    required: true
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hackathons',
    required: true
  },
  judgesFeedback: [
    {
      judge: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      comments: String,
      score: {
        type: Number,
        min: 0,
        max: 100
      }
    }
  ],
  averageScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['submitted', 'under review', 'evaluated', 'winner'],
    default: 'submitted'
  }
},{timestamps:true});

export default mongoose.model('submissions', SubmissionSchema);
