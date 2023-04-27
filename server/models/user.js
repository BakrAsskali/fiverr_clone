const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
  type: String,
  profilePicture: String,
  bio: String,
  skills: [String],
  education: [String],
  experience: [String],
  languages: [String],
  hourlyRate: Number,
  rating: Number,
  reviews: [String],
  gigs: [String],
  updatedAt: Date,
  createdAt: Date,
});

module.exports = mongoose.model("User", userSchema);
