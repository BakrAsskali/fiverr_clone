const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
