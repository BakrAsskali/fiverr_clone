import { conversationSchema } from "./conversationSchema.js";
import { gigSchema } from "./gigSchema.js";
import { messageSchema } from "./messageSchema.js";
import { orderSchema } from "./orderSchema.js";
import { reviewSchema } from "./reviewSchema.js";
import { userSchema } from "./userSchema.js";

export const typeDefs = [userSchema, gigSchema, conversationSchema, messageSchema, reviewSchema, orderSchema];