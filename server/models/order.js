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
    type: Object,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: 'pending',
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