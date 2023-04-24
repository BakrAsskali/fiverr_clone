import { ApolloServer } from "apollo-server-express";
import { AppoloServer as AppoloServerLambda } from "apollo-server-lambda";
import express from "express";
import { GraphQLSchema } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import { MakeExecutableSchema } from "graphql-tools";
import connectDB from "./config/db";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const schema = MakeExecutableSchema;
({
  typeDefs,
  resolvers,
});

schema.applyMiddleware(schema);

const server = new ApolloServer({ schema });

const app = express();
server.applyMiddleware({ app });

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Server running on port ${port} ${server.graphqlPath}`)
);
