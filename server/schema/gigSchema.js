import { userSchema } from "./userSchema.js"

export const gigSchema = `#graphql
    type Gig {
        id: ID
        title: String!
        shortTitle: String!
        description: String!
        shortDesc: String!
        price: Float!
        cover: String!
        images: [String]!
        category: String!
        deliveryTime: Int!
        revisionNumber: Int
        features: [String]!
        sales: Int
        rating: Float
        reviews: [String]
        freelancerToken: UserJwtToken
        createdAt: String
        updatedAt: String
    }

    input GigInput {
        title: String!
        shortTitle: String!
        description: String!
        shortDesc: String!
        price: Float!
        cover: String!
        images: [String]!
        category: String!
        deliveryTime: Int
        revisionNumber: Int!
        features: [String]!
        sales: Int
        rating: Float
        reviews: [String]
        createdAt: String
        updatedAt: String
    }

    type Query {
        getGigs: [Gig]
        getGig(id: ID!): Gig
    }

    type Mutation {
        createGig(input: GigInput): Gig
        updateGig(id: ID!, input: GigInput): Gig
        deleteGig(id: ID!): Gig
    }
`