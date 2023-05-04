import mongoose, { Schema } from 'mongoose';

export const conversationSchema = new Schema({
  members: {
    type: Array,
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

export default mongoose.model('Conversation', conversationSchema);
