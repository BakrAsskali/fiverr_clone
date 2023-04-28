const typeDefs = `#graphql

  type Gig {
    id: ID
    title: String
    shortTitle: String
    description: String
    shortDesc: String
    price: Float
    cover: String
    images: [String]
    category: String
    deliveryTime: Int
    revisionNumber: Int
    features: [String]
    sales: Int
    rating: Float
    reviews: [String]
    freelancerId: String
    status: String
    createdAt: String
    updatedAt: String
  }

  type User {
    id: ID
    fistName: String
    lastName: String
    username: String
    email: String
    phoneNumber: String
    password: String
    type: String
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

  type Review{
    id: ID
    rating: Float
    comment: String
    gig: String
    clientId: String
    createdAt: String
    updatedAt: String
  }

  type Order{
    id: ID
    gigId: String
    clientId: String
    freelancerId: String
    status: String
    createdAt: String
    updatedAt: String
  }

  type Message{
    id: ID
    senderId: String
    receiverId: String
    createdAt: String
    updatedAt: String
  }

  type conversation{
    id: ID
    senderId: String
    receiverId: String
    messages: [String]
    createdAt: String
    updatedAt: String
  }

  type Query {
    getGigs: [Gig]
    getGig(id: ID!): Gig
    getUsers: [User]
    getUser(id: ID!): User
    getReviews: [Review]
    getReview(id: ID!): Review
    getOrders: [Order]
    getOrder(id: ID!): Order
    getMessages: [Message]
    getMessage(id: ID!): Message
    getConversations: [conversation]
    getConversation(id: ID!): conversation
  }

  type Mutation {
    createGig(
      title: String!
      shortTitle: String!
      description: String!
      shortDesc: String!
      price: Float!
      cover: String!
      images: [String]!
      category: String!
      deliveryTime: Int!
      revisionNumber: Int!
      features: [String]!
      sales: Int!
      rating: Float!
      reviews: [String]!
      freelancerId: String!
      status: String!
    ): Gig!

    updateGig(
      id: ID!
      title: String!
      shortTitle: String!
      description: String!
      shortDesc: String!
      price: Float!
      cover: String!
      images: [String]!
      category: String!
      deliveryTime: Int!
      revisionNumber: Int!
      features: [String]!
      sales: Int!
      rating: Float!
      reviews: [String]!
      freelancerId: String!
      status: String!
    ): Gig!

    deleteGig(id: ID!): String!

    createUser(
      fistName: String!
      lastName: String!
      username: String!
      email: String!
      phoneNumber: String!
      password: String!
      type: String!
      profilePicture: String!
      bio: String!
      skills: [String]!
      education: [String]!
      experience: [String]!
      languages: [String]!
      hourlyRate: Float!
      rating: Float!
      reviews: [String]!
      gigs: [String]!
    ): User!

    updateUser(
      id: ID!
      fistName: String!
      lastName: String!
      username: String!
      email: String!
      phoneNumber: String!
      password: String!
      type: String!
      profilePicture: String!
      bio: String!
      skills: [String]!
      education: [String]!
      experience: [String]!
      languages: [String]!
      hourlyRate: Float!
      rating: Float!
      reviews: [String]!
      gigs: [String]!
    ): User!

    deleteUser(id: ID!): String!
    
    createReview(
      rating: Float!
      comment: String!
      gig: String!
      clientId: String!
    ): Review!

    updateReview(
      id: ID!
      rating: Float!
      comment: String!
      gig: String!
      clientId: String!
      
`;

module.exports = typeDefs;