const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  gigId: String,
  freelancerId: String,
  clientId: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Order", orderSchema);
