import gigModel from '../models/gigModel.js';

export const gigResolvers = {
    Query: {
        getGigsByToken: async (_parent, args, _context, _info) => {
            try {
                const gigs = gigModel.findOne({ freelancerToken: args.freelancerTokenInput }).exec();
                return await gigs;
            } catch (err) {
                console.log(err);
            }
        },

        getGigs: async (_parent, args, _context, _info) => {
            try {
                const gigs = gigModel.find().exec();
                return await gigs;
            } catch (err) {
                console.log(err);
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
                shortDesc: args.input.shortDesc,
                price: args.input.price,
                category: args.input.category,
                images: args.input.images,
                coverImage: args.input.coverImage,
                deliveryTime: args.input.deliveryTime,
                revisionNumber: args.input.revisionNumber,
                features: args.input.features,
                token: args.input.freelancerToken,
            });
            await gig.save();
        },

        updateGig: async (_parent, args, _context, _info) => {
            return await gigModel.findByIdAndUpdate(args.id, {
                title: args.input.title,
                shortTitle: args.input.shortTitle,
                description: args.input.description,
                shortDesc: args.input.shortDesc,
                price: args.input.price,
                category: args.input.category,
                images: args.input.images,
                coverImage: args.input.coverImage,
                deliveryTime: args.input.deliveryTime,
                revisionNumber: args.input.revisionNumber,
                features: args.input.features,
                freelancerToken: args.input.freelancerToken,
            }, { new: true });
        },

        deleteGig: async (_parent, args, _context, _info) => {
            return await gigModel.findByIdAndDelete(args.id).exec();
        }
    }
};