const graphql = require("graphql");
const Gig = require("../models/gigModel");
const User = require("../models/user");
const Review = require("../models/review");
const Order = require("../models/order");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");

const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLNonNull
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
        return User.findById(parent.freelancerId);
      },
    },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
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
        return Gig.find({ freelancerId: parent.id });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
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
        return Gig.findById(gig, { id: parent.gigId });
      },
    },
    client: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(user, { id: parent.clientId });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    gig: {
      type: GigType,
      resolve(parent, args) {
        return Gig.findById(gig, { id: parent.gigId });
      },
    },
    freelancer: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(user, { id: parent.freelancerId });
      },
    },
    client: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(user, { id: parent.clientId });
      },
    },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
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
        return User.findById(user, { id: parent.senderId });
      },
    },
    receiver: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(user, { id: parent.receiverId });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const ConversationType = new GraphQLObjectType({
  name: "Conversation",
  fields: () => ({
    id: { type: GraphQLID },
    sender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(user, { id: parent.senderId });
      },
    },
    receiver: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(user, { id: parent.receiverId });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
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
      type: new GraphQLList(ConversationType),
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
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        profilePicture: { type: GraphQLString },
        bio: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString) },
        education: { type: new GraphQLList(GraphQLString) },
        experience: { type: new GraphQLList(GraphQLString) },
        languages: { type: new GraphQLList(GraphQLString) },
        hourlyRate: { type: new GraphQLNonNull(GraphQLFloat) },
        rating: { type: GraphQLFloat },
        reviews: { type: new GraphQLList(GraphQLString) },
        gigs: { type: new GraphQLList(GraphQLString) },
        orders: { type: new GraphQLList(GraphQLString) },
        conversations: { type: new GraphQLList(GraphQLString) },
        messages: { type: new GraphQLList(GraphQLString) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: lowercaseEmail,
          phoneNumber: args.phoneNumber,
          password: hashedPassword,
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
        user.email = user.email.toLowerCase();
        user.password = bcrypt.hash(user.password, 10);
        return user.save();
      },
    },
    addGig: {
      type: GigType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        deliveryTime: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLFloat },
        reviews: { type: new GraphQLList(GraphQLString) },
        freelancerId: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        let gig = new Gig({
          title: args.title,
          description: args.description,
          price: args.price,
          image: args.image,
          category: args.category,
          deliveryTime: args.deliveryTime,
          rating: args.rating,
          reviews: args.reviews,
          freelancerId: args.freelancerId,
          status: args.status,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return gig.save();
      },
    },
  },
  addReview: {
    type: ReviewType,
    args: {
      rating: { type: new GraphQLNonNull(GraphQLFloat) },
      comment: { type: new GraphQLNonNull(GraphQLString) },
      gigId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    },
    resolve(parent, args) {
      let review = new Review({
        rating: args.rating,
        comment: args.comment,
        gigId: args.gigId,
        userId: args.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return review.save();
    },
  },
  addOrder: {
    type: OrderType,
    args: {
      gigId: { type: new GraphQLNonNull(GraphQLID) },
      buyerId: { type: new GraphQLNonNull(GraphQLID) },
      sellerId: { type: new GraphQLNonNull(GraphQLID) },
      status: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    },
    resolve(parent, args) {
      let order = new Order({
        gigId: args.gigId,
        buyerId: args.buyerId,
        sellerId: args.sellerId,
        status: args.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return order.save();
    },
  },
  addMessage: {
    type: MessageType,
    args: {
      conversationId: { type: new GraphQLNonNull(GraphQLID) },
      senderId: { type: new GraphQLNonNull(GraphQLID) },
      receiverId: { type: new GraphQLNonNull(GraphQLID) },
      message: { type: new GraphQLNonNull(GraphQLString) },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    },
    resolve(parent, args) {
      let message = new Message({
        conversationId: args.conversationId,
        senderId: args.senderId,
        receiverId: args.receiverId,
        message: args.message,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return message.save();
    },
  },
  addConversation: {
    type: ConversationType,
    args: {
      senderId: { type: new GraphQLNonNull(GraphQLID) },
      receiverId: { type: new GraphQLNonNull(GraphQLID) },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    },
    resolve(parent, args) {
      let conversation = new Conversation({
        senderId: args.senderId,
        receiverId: args.receiverId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return conversation.save();
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
