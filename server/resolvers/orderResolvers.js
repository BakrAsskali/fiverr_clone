import orderModel from "../models/order.js";

export const orderResolvers = {
    Query: {
        getOrders: async (parent, args, context, info) => {
            try {
                const orders = orderModel.find({}).exec();
                return await orders;
            } catch (error) {
                console.log(error);
            }
        },

        getOrder: async (parent, args, context, info) => {
            try {
                const order = orderModel.findById(args.id).exec();
                return await order;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        createOrder: async (parent, args, context, info) => {
            const order = new orderModel({
                userId: args.input.userId,
                productId: args.input.productId,
                quantity: args.input.quantity,
                price: args.input.price,
                status: args.input.status
            });
            return await order.save();
        },

        updateOrder: async (parent, args, context, info) => {
            return await orderModel.findByIdAndUpdate(args.id, {
                userId: args.input.userId,
                productId: args.input.productId,
                quantity: args.input.quantity,
                price: args.input.price,
                status: args.input.status
            }, { new: true });
        },

        deleteOrder: async (parent, args, context, info) => {
            return await orderModel.findByIdAndDelete(args.id).exec();
        }
    }
}