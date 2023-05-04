export const conversationSchema = `#graphql
    type conversation{
        id: ID
        senderId: String!
        receiverId: String!
        messages: [String]!
        createdAt: String
        updatedAt: String
    }

    input conversationInput{
        senderId: String!
        receiverId: String!
        messages: [String]!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getConversations: [conversation]
        getConversation(id: ID!): conversation
    }

    type Mutation {
        createConversation(input: conversationInput): conversation
        updateConversation(id: ID!, input: conversationInput): conversation
        deleteConversation(id: ID!): conversation
    }
`