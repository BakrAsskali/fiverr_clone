import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userHelper } from '../helpers/user.helper.js';
import UserModel from '../models/user.js';

export const userResolvers = {
    Query: {
        getUser: async (_parent, args, _context, _info) => {
            const user = await UserModel.find({ token: args.userJwtToken })
            if (!user) {
                throw new Error('User not found!');
            }
            return user;
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
            const token = jwt.sign({ email: args.input.email }, process.env.JWT_SECRET);
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
                userJwtToken: {
                    token: token
                }
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
            const user = await UserModel.findOne({ email: args.email });
            if (!user) {
                throw new Error("User does not exist");
            }
            const comparePassword = bcrypt.compareSync(args.password, user.password);
            if (!comparePassword) {
                throw new Error("Password is incorrect");
            }
            return {
                ...user._doc,
                id: user._id,
                userJwtToken: {
                    token: user.token,
                }
            };
        },

        logout: async (_parent, _args, _context, _info) => {
            return true;
        }
    }
}
