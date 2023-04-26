import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      passwordHash: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("User has been registered!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "Wrong Password or username"));
    }
    const password = bcrypt.compare(req.body.password, user.passwordHash);
    if (!password) {
      return next(createError(404, "Wrong Password or username"));
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isFreelancer: user.isFreelancer,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { passwordHash, ...others } = user._doc;
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .send(others);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken"),
    {
      sameSite: "none",
      secure: true,
    }
      .status(200)
      .send("Logged out");
};
