export const userSchema = `#graphql
    type User {
        id: ID
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        phoneNumber: String!
        type: String!
        profilePicture: String
        bio: String
        skills: [String]
        education: [String]
        experience: [String]
        languages: [String]
        hourlyRate: Float
        rating: Float
        reviews: [String]
        gigs: [String]
        createdAt: String
        updatedAt: String
        userJwtToken: UserJwtToken
  }

    input UserInput {
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        phoneNumber: String!
        password: String!
        type: String!
        profilePicture: String
        bio: String
        skills: [String]
        education: [String]
        experience: [String]
        languages: [String]
        hourlyRate: Float
        rating: Float
        reviews: [String]
        gigs: [String]
        createdAt: String
        updatedAt: String
    }

    type UserJwtToken {
        token: String!
    }

    type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): User
        login(email: String!, password: String!): User
        logout: Boolean
    }
`