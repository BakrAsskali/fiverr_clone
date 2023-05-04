import messageModel from "../models/message.js";

export const messageResolvers = {
    Query: {
        getMessages: async (parent, args, context, info) => {
            try {
                const messages = messageModel.find({}).exec();
                return await messages;
            } catch (error) {
                console.log(error);
            }
        },

        getMessage: async (parent, args, context, info) => {
            try {
                const message = messageModel.findById(args.id).exec();
                return await message;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        createMessage: async (parent, args, context, info) => {
            const message = new messageModel({
                conversationId: args.input.conversationId,
                senderId: args.input.senderId,
                text: args.input.text
            });
            return await message.save();
        },

        updateMessage: async (parent, args, context, info) => {
            return await messageModel.findByIdAndUpdate(args.id, {
                conversationId: args.input.conversationId,
                senderId: args.input.senderId,
                text: args.input.text
            }, { new: true });
        },

        deleteMessage: async (parent, args, context, info) => {
            return await messageModel.findByIdAndDelete(args.id).exec();
        }
    }
}