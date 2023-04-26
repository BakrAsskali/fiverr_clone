import Express from "express";
import {
  signup,
  login,
  logout,
} from "../controllers/authentication.controller.js";

const router = Express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
