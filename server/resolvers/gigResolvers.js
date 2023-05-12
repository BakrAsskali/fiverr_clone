import gigModel from '../models/gigModel.js';
import userModel from '../models/user.js';

export const gigResolvers = {
    Query: {
        getGigs: async (_parent, _args, _context, _info) => {
            try {
                const gigs = gigModel.find({}).exec();
                return await gigs;
            } catch (error) {
                console.log(error);
            }
        },

        getGig: async (_parent, args, _context, _info) => {
            try {
                const gig = gigModel.findById(args.id).exec();
                return await gig;
            } catch (err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        createGig: async (_parent, args, _context, _info) => {
            const gig = new gigModel({
                title: args.input.title,
                shortTitle: args.input.shortTitle,
                description: args.input.description,
                shortDescription: args.input.shortDescription,
                price: args.input.price,
                category: args.input.category,
                images: args.input.images,
                coverImage: args.input.coverImage,
                deliveryTime: args.input.deliveryTime,
                revisionNumber: args.input.revisionNumber,
                features: args.input.features,
                freelancerToken: args.input.freelancerToken,
            });
            return await gig.save();
        },

        updateGig: async (_parent, args, _context, _info) => {
            return await gigModel.findByIdAndUpdate(args.id, {
                title: args.input.title,
                shortTitle: args.input.shortTitle,
                description: args.input.description,
                shortDescription: args.input.shortDescription,
                price: args.input.price,
                category: args.input.category,
                images: args.input.images,
                coverImage: args.input.coverImage,
                deliveryTime: args.input.deliveryTime,
                revisionNumber: args.input.revisionNumber,
                features: args.input.features,
            }, { new: true });
        },

        deleteGig: async (_parent, args, _context, _info) => {
            return await gigModel.findByIdAndDelete(args.id).exec();
        }
    }
};