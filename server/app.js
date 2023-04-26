import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authenticationRoute from "./routes/authentication.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("MongoDB is Connected...");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/authentication", authenticationRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(statusCode).send(errorMessage);
});

const port = process.env.PORT || 8800;

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
