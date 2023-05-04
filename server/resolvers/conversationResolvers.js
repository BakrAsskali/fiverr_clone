import conversationModel from "../models/conversation.js";

export const conversationResolvers = {
    Query: {
        getConversations: async (parent, args, context, info) => {
            try {
                const conversations = conversationModel.find({}).exec();
                return await conversations;
            } catch (error) {
                console.log(error);
            }
        },

        getConversation: async (parent, args, context, info) => {
            try {
                const conversation = conversationModel.findById(args.id).exec();
                return await conversation;
            } catch (err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        createConversation: async (parent, args, context, info) => {
            const conversation = new conversationModel({
                members: args.input.members,
                messages: args.input.messages
            });
            return await conversation.save();
        },

        updateConversation: async (parent, args, context, info) => {
            return await conversationModel.findByIdAndUpdate(args.id, {
                members: args.input.members,
                messages: args.input.messages
            }, { new: true });
        },

        deleteConversation: async (parent, args, context, info) => {
            return await conversationModel.findByIdAndDelete(args.id).exec();
        }
    }
};
