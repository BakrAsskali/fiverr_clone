import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(401, "You are not authorized to delete this user"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("User has been deleted");
};
