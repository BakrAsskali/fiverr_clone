import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    freelancerId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    readByFreeLancer: {
      type: Boolean,
      required: true,
    },
    readByClient: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
