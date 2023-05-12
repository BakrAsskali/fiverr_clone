import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userHelper } from '../helpers/user.helper.js';
import UserModel from '../models/user.js';

export const userResolvers = {
    Query: {
        getUser: async (_parent, args, _context, _info) => {
            try {
                const user = UserModel.findById(args.id).exec();
                return await user;
            } catch (err) {
                console.log(err);
            }
        },

        getUsers: async (_parent, _args, _context, _info) => {
            try {
                const users = UserModel.find({}).exec();
                return await users;
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        createUser: async (_parent, args, _context, _info) => {
            const isEmailAlreadyExist = await userHelper.isEmailAlreadyExist(args.input.email);
            if (isEmailAlreadyExist) {
                throw new Error("Email already exists");
            }
            const isUsernameAlreadyExist = await userHelper.isUsernameAlreadyExist(args.input.username);
            if (isUsernameAlreadyExist) {
                throw new Error("Username already exists");
            }
            const token = jwt.sign({ email: args.input.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const cryptedPassword = bcrypt.hashSync(args.input.password, 10);
            const user = new UserModel({
                username: args.input.username,
                password: cryptedPassword,
                email: args.input.email,
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                phoneNumber: args.input.phoneNumber,
                type: args.input.type,
                profilePicture: args.input.profilePicture,
                bio: args.input.bio,
                gigs: args.input.gigs,
                reviews: args.input.reviews,
                orders: args.input.orders,
                messages: args.input.messages,
                conversations: args.input.conversations,
                token: token,
            });
            await user.save();
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        updateUser: async (_parent, args, _context, _info) => {
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

        deleteUser: async (_parent, args, _context, _info) => {

            const user = await UserModel.find({ token: args.userJwtToken })
            if (!user) {
                throw new Error('User not found!');
            }

            await UserModel.deleteOne({ token: args.userJwtToken });
            return true;
        },

        login: async (_parent, args, _context, _info) => {
            const cryptedPassword = bcrypt.hashSync(args.password, 10);
            const user = await UserModel.findOne({ $and: [{ email: args.email }, { password: cryptedPassword }] });
            if (user) {
                const token = jwt.sign({ userId: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                return {
                    ...user._doc, userJwtToken: {
                        token: token,
                    }
                };
            }
            throw new Error('Invalid credentials!');
        },

        logout: async (_parent, _args, _context, _info) => {
            return true;
        }
    }
}
