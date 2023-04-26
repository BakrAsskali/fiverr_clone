import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "You need to login"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(createError(401, "token expired"));
    }
    req.userId = payload.id;
    req.isFreelancer = payload.isFreelancer;
    next();
  });
};
