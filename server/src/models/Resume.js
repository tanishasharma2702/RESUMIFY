import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    default: 'My Professional Resume',
  },
  templateId: {
    type: String,
    default: 'modern',
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,
  },
  summary: String,
  skills: [String],
  education: [
    {
      institution: String,
      degree: String,
      year: String,
      score: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
  projects: [
    {
      title: String,
      tech: String,
      link: String,
      description: String,
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      year: String,
    },
  ],
  achievements: [String],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
