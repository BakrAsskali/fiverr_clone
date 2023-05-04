import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  skills: {
    type: [String],
    required: false,
  },
  education: {
    type: [String],
    required: false,
  },
  experience: {
    type: [String],
    required: false,
  },
  languages: {
    type: [String],
    required: false,
  },
  hourlyRate: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  reviews: {
    type: [String],
    required: false,
  },
  gigs: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  updatedAt: {
    type: String,
    default: new Date(),
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);