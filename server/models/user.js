const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
