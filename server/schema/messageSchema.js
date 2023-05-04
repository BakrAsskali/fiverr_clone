export const messageSchema = `#graphql
    type Message{
        id: ID
        senderId: String!
        receiverId: String!
        createdAt: String
        updatedAt: String
    }

    input MessageInput{
        senderId: String!
        receiverId: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getMessages: [Message]
        getMessage(id: ID!): Message
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
        deleteMessage(id: ID!): Message
    }
`