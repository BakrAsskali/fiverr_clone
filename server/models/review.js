const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  gigId: String,
  clientId: String,
  rating: Number,
  review: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Review", reviewSchema);
