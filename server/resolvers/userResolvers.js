import UserModel from '../models/user.js';

export const userResolvers = {
    Query: {
        getUser: async (parent, args, context, info) => {
            try {
                const user = UserModel.findById(args.id).exec();
                return await user;
            } catch (err) {
                console.log(err);
            }
        },

        getUsers: async (parent, args, context, info) => {
            try {
                const users = UserModel.find({}).exec();
                return await users;
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        createUser: async (parent, args, context, info) => {
            const user = new UserModel({
                username: args.input.username,
                password: args.input.password,
                email: args.input.email,
                firstName: args.input.firstName,
                type: args.input.type,
                lastName: args.input.lastName,
                phoneNumber: args.input.phoneNumber,
                profilePicture: args.input.profilePicture,
                bio: args.input.bio,
                gigs: args.input.gigs,
                reviews: args.input.reviews,
                orders: args.input.orders,
                messages: args.input.messages,
                conversations: args.input.conversations
            });
            return await user.save();
        },

        updateUser: async (parent, args, context, info) => {
            return await UserModel.findByIdAndUpdate(args.id, {
                username: args.input.username,
                password: args.input.password,
                email: args.input.email,
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                phoneNumber: args.input.phoneNumber,
                profilePicture: args.input.profilePicture,
                bio: args.input.bio,
                gigs: args.input.gigs,
                reviews: args.input.reviews,
                orders: args.input.orders,
                messages: args.input.messages,
                conversations: args.input.conversations
            }, { new: true });
        },

        deleteUser: async (parent, args, context, info) => {
            return await UserModel.findByIdAndDelete(args.id);
        }
    }
}
