import { conversationResolvers } from "./conversationResolvers.js";
import { gigResolvers } from "./gigResolvers.js";
import { messageResolvers } from "./messageResolvers.js";
import { orderResolvers } from "./orderResolvers.js";
import { reviewResolvers } from "./reviewResolvers.js";
import { userResolvers } from "./userResolvers.js";

export const resolvers = [
    userResolvers,
    gigResolvers,
    conversationResolvers,
    messageResolvers,
    orderResolvers,
    reviewResolvers
];