export const reviewSchema = `#graphql
    type Review{
        id: ID
        rating: Float!
        comment: String!
        gig: String!
        clientId: String!
        createdAt: String
        updatedAt: String
    }

    input ReviewInput{
        rating: Float!
        comment: String!
        gig: String!
        clientId: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getReviews: [Review]
        getReview(id: ID!): Review
    }

    type Mutation {
        createReview(input: ReviewInput): Review    
        updateReview(id: ID!, input: ReviewInput): Review
        deleteReview(id: ID!): Review  
    }
`