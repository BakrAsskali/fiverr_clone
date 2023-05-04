import reviewModel from "../models/review.js";

export const reviewResolvers = {
    Query: {
        getReviews: async (parent, args, context, info) => {
            try {
                const reviews = reviewModel.find({}).exec();
                return await reviews;
            } catch (error) {
                console.log(error);
            }
        },

        getReview: async (parent, args, context, info) => {
            try {
                const review = reviewModel.findById(args.id).exec();
                return await review;
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        createReview: async (parent, args, context, info) => {
            const review = new reviewModel({
                userId: args.input.userId,
                productId: args.input.productId,
                rating: args.input.rating,
                comment: args.input.comment
            });
            return await review.save();
        },

        updateReview: async (parent, args, context, info) => {
            return await reviewModel.findByIdAndUpdate(args.id, {
                userId: args.input.userId,
                productId: args.input.productId,
                rating: args.input.rating,
                comment: args.input.comment
            }, { new: true });
        },

        deleteReview: async (parent, args, context, info) => {
            return await reviewModel.findByIdAndDelete(args.id).exec();
        }
    }
}
