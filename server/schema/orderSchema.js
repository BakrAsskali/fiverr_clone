import { userSchema } from "./userSchema.js"

export const orderSchema = `#graphql
    type Order{
        id: ID
        gigId: String!
        clientId: String!
        freelancerToken: UserJwtToken
        status: String!
        createdAt: String
        updatedAt: String
    }

    input OrderInput{
        gigId: String!
        clientId: String!
        freelancerToken: UserJwtTokenInput!
        status: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getOrders: [Order]
        getFreelancerOrders(input: UserJwtTokenInput): [Order]
        getOrder(id: ID!): Order    
    }

    type Mutation {
        createOrder(input: OrderInput): Order
        updateOrder(id: ID!, input: OrderInput): Order
        deleteOrder(id: ID!): Order 
    }
`