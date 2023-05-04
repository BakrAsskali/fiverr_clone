import e from 'express';
import mongoose, { Schema } from 'mongoose';

export const reviewSchema = new Schema({
  gigId: {
    type: String,
    required: true,
  },

  clientId: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  comment: {
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

export default mongoose.model('Review', reviewSchema);