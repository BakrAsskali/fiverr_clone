const graphql = require("graphql");
const Gig = require("../models/gig");
const User = require("../models/user");
const Review = require("../models/review");
const Order = require("../models/order");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLDate,
} = graphql;

const GigType = new GraphQLObjectType({
  name: "Gig",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    image: { type: GraphQLString },
    category: { type: GraphQLString },
    deliveryTime: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    reviews: { type: new GraphQLList(GraphQLString) },
    freelancer: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(User, { id: parent.freelancerId });
      },
    },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    bio: { type: GraphQLString },
    skills: { type: new GraphQLList(GraphQLString) },
    education: { type: new GraphQLList(GraphQLString) },
    experience: { type: new GraphQLList(GraphQLString) },
    languages: { type: new GraphQLList(GraphQLString) },
    hourlyRate: { type: GraphQLFloat },
    rating: { type: GraphQLFloat },
    reviews: { type: new GraphQLList(GraphQLString) },
    gigs: {
      type: new GraphQLList(GigType),
      resolve(parent, args) {
        // return Gig.find({ freelancerId: parent.id });
      },
    },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    gig: {
      type: GigType,
      resolve(parent, args) {
        // return Gig.findById(Gig, { id: parent.gigId });
      },
    },
    client: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.clientId });
      },
    },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    gig: {
      type: GigType,
      resolve(parent, args) {
        // return Gig.findById(gig, { id: parent.gigId });
      },
    },
    freelancer: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.freelancerId });
      },
    },
    client: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.clientId });
      },
    },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    sender: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.senderId });
      },
    },
    receiver: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.receiverId });
      },
    },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const conversationType = new GraphQLObjectType({
  name: "Conversation",
  fields: () => ({
    id: { type: GraphQLID },
    sender: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.senderId });
      },
    },
    receiver: {
      type: UserType,
      resolve(parent, args) {
        // return User.findById(user, { id: parent.receiverId });
      },
    },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    gig: {
      type: new GraphQLList(GigType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Gig.findById(args.id);
      },
    },
    gigs: {
      type: new GraphQLList(GigType),
      resolve(parent, args) {
        return Gig.find({});
      },
    },
    user: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    review: {
      type: new GraphQLList(ReviewType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Review.findById(args.id);
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({});
      },
    },
    order: {
      type: new GraphQLList(OrderType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Order.findById(args.id);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({});
      },
    },
    message: {
      type: new GraphQLList(MessageType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Message.findById(args.id);
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return Message.find({});
      },
    },
    conversation: {
      type: new GraphQLList(conversationType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Conversation.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
        bio: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString) },
        education: { type: new GraphQLList(GraphQLString) },
        experience: { type: new GraphQLList(GraphQLString) },
        languages: { type: new GraphQLList(GraphQLString) },
        hourlyRate: { type: GraphQLFloat },
        rating: { type: GraphQLFloat },
        reviews: { type: new GraphQLList(GraphQLString) },
        gigs: { type: new GraphQLList(GraphQLString) },
        orders: { type: new GraphQLList(GraphQLString) },
        conversations: { type: new GraphQLList(GraphQLString) },
        messages: { type: new GraphQLList(GraphQLString) },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phoneNumber: args.phoneNumber,
          password: args.password,
          type: args.type,
          profilePicture: args.profilePicture,
          bio: args.bio,
          skills: args.skills,
          education: args.education,
          experience: args.experience,
          languages: args.languages,
          hourlyRate: args.hourlyRate,
          rating: args.rating,
          reviews: args.reviews,
          gigs: args.gigs,
          orders: args.orders,
          conversations: args.conversations,
          messages: args.messages,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
