import mongoose, { Schema } from "mongoose";
import user from "./user.js";

export const gigSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    token: {
      type: Object,
      required: true,
    },
  }, {
  timestamps: true,
}
);

export default mongoose.model("Gig", gigSchema);