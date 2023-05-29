export const gigSchema = `#graphql
    type Gig {
        id: ID
        title: String!
        shortTitle: String!
        description: String!
        shortDesc: String!
        price: Float!
        coverImage: String!
        images: [String]!
        category: String!
        deliveryTime: Int!
        revisionNumber: Int
        features: [String]!
        sales: Int
        rating: Float
        reviews: [String]
        token: UserJwtToken
        createdAt: String
        updatedAt: String
    }

    input GigInput {
        title: String!
        shortTitle: String!
        description: String!
        shortDesc: String!
        price: Float!
        coverImage: String!
        images: [String]!
        category: String!
        deliveryTime: Int
        revisionNumber: Int!
        features: [String]!
        sales: Int
        rating: Float
        token: UserJwtTokenInput!
        reviews: [String]
        createdAt: String
        updatedAt: String
    }

    type UserJwtToken {
        token: String
    }

    input UserJwtTokenInput {
        token: String
    }

    type Query {
        getGigsByToken(input: UserJwtTokenInput!): [Gig]
        getGigs: [Gig]
        getGigsBySort(category: String): [Gig]
        getGig(id:ID): Gig
    }

    type Mutation {
        createGig(input: GigInput): Gig
        updateGig(id: ID!, input: GigInput): Gig
        deleteGig(id: ID!): Gig
    }
`