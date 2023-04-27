const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  senderId: String,
  receiverId: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Message", messageSchema);
