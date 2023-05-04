import mongoose, { Schema } from 'mongoose';

export const orderSchema = new Schema({
  gigId: {
    type: String,
    required: true,
  },

  clientId: {
    type: String,
    required: true,
  },

  freelancerId: {
    type: String,
    required: true,
  },

  status: {
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

export default mongoose.model('Order', orderSchema);