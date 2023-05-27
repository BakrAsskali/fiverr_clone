import orderModel from "../models/order.js";

export const orderResolvers = {
    Query: {
        getOrders: async (_parent, _args, _context, _info) => {
            try {
                const orders = orderModel.find({}).exec();
                return await orders;
            } catch (error) {
                console.log(error);
            }
        },

        getFreelancerOrders: async (_parent, args, _context, _info) => {
            try {
                const orders = orderModel.find({
                    $or: [
                        { freelancerId: { token: args.input.token } },
                        { clientId: args.input.token }
                    ]
                }).exec();
                return await orders;
            } catch (error) {
                console.log(error);
            }
        },

        getOrder: async (_parent, args, _context, _info) => {
            try {
                const order = orderModel.findById(args.id).exec();
                return await order;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        createOrder: async (_parent, args, _context, _info) => {
            const order = new orderModel({
                gigId: args.input.gigId,
                clientId: args.input.clientId,
                freelancerId: args.input.freelancerToken,
                status: args.input.status,
            });
            return await order.save();
        },

        updateOrder: async (_parent, args, _context, _info) => {
            return await orderModel.findByIdAndUpdate(args.id, {
                userId: args.input.userId,
                productId: args.input.productId,
                quantity: args.input.quantity,
                price: args.input.price,
                status: args.input.status
            }, { new: true });
        },

        deleteOrder: async (_parent, args, _context, _info) => {
            return await orderModel.findByIdAndDelete(args.id).exec();
        }
    }
}