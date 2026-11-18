import mongoose from 'mongoose';

const careerRecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  profileInput: {
    education: String,
    currentSkills: [String],
    interests: String,
    careerGoals: String,
    preferredRoles: String,
  },
  recommendedPaths: [
    {
      roleTitle: String,
      matchPercentage: Number,
      description: String,
      requiredSkills: [String],
      existingSkillsMatched: [String],
      skillGaps: [String],
      roadmap: [
        {
          phase: String,
          topics: [String],
        },
      ],
      nextSteps: [String],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CareerRecommendation = mongoose.models.CareerRecommendation || mongoose.model('CareerRecommendation', careerRecommendationSchema);
