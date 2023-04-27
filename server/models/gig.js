const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gigSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  deliveryTime: Number,
  rating: Number,
  reviews: [String],
  freelancerId: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Gig", gigSchema);
