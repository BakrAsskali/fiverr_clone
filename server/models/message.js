import mongoose, { Schema } from 'mongoose';

export const messageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },

  sender: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: String,
    default: Date.now,
  },

}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
