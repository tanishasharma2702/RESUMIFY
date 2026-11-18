import mongoose from 'mongoose';

const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  atsAssessment: {
    score: Number,
    level: {
      type: String,
      enum: ['Needs Improvement', 'Moderate', 'High', 'Optimal'],
      default: 'Moderate',
    },
    summary: String,
  },
  identifiedSkills: [String],
  strengths: [String],
  weaknesses: [String],
  missingSkills: [String],
  formattingFeedback: [String],
  keywordRecommendations: [String],
  improvementSuggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ResumeAnalysis = mongoose.models.ResumeAnalysis || mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
