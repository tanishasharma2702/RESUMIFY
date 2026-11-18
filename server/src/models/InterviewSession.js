import mongoose from 'mongoose';

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  role: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Technical', 'HR'],
    default: 'Technical',
  },
  difficulty: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'],
    default: 'Junior',
  },
  topics: String,
  questions: [
    {
      questionText: String,
      guidance: String,
      userAnswer: String,
      evaluation: {
        score: Number,
        strengths: [String],
        weaknesses: [String],
        missingConcepts: [String],
        suggestions: [String],
        modelAnswer: String,
      },
      answeredAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const InterviewSession = mongoose.models.InterviewSession || mongoose.model('InterviewSession', interviewSessionSchema);
