import express from "express";

import {
  registerUser,
  loginUser,
  updateUser
} from "../controllers/userController.js";
import { isAuthorised } from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").put(isAuthorised, updateUser);

export default router;
