const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  senderId: String,
  receiverId: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Conversation", conversationSchema);
