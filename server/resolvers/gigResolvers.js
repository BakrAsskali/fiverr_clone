import gigModel from '../models/gigModel.js';

export const gigResolvers = {
    Query: {
        getGigs: async (parent, args, context, info) => {
            try {
                const gigs = gigModel.find({}).exec();
                return await gigs;
            } catch (error) {
                console.log(error);
            }
        },

        getGig: async (parent, args, context, info) => {
            try {
                const gig = gigModel.findById(args.id).exec();
                return await gig;
            } catch (err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        createGig: async (parent, args, context, info) => {
            const gig = new gigModel({
                title: args.input.title,
                description: args.input.description,
                price: args.input.price,
                category: args.input.category,
                subcategory: args.input.subcategory,
                seller: args.input.seller,
                buyer: args.input.buyer,
                reviews: args.input.reviews,
                orders: args.input.orders
            });
            return await gig.save();
        },

        updateGig: async (parent, args, context, info) => {
            return await gigModel.findByIdAndUpdate(args.id, {
                title: args.input.title,
                description: args.input.description,
                price: args.input.price,
                category: args.input.category,
                subcategory: args.input.subcategory,
                seller: args.input.seller,
                buyer: args.input.buyer,
                reviews: args.input.reviews,
                orders: args.input.orders
            }, { new: true });
        },

        deleteGig: async (parent, args, context, info) => {
            return await gigModel.findByIdAndDelete(args.id).exec();
        }
    }
};