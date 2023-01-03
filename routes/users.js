import express from "express";
import {
  signup,
  signin,
  verifyotp,
  verifyUser,
  generateotp,
  updatePassword,
} from "../controllers/users.js";
import { checkSignup } from "../helpers/index.js";

const users = express.Router();
users.post("/signup", checkSignup, signup);
users.post("/signin", signin);
users.post("/verifyotp", verifyotp);
users.patch("/updatepassword", updatePassword);
users.post("/verify-user", verifyUser);
users.post("/generateotp", generateotp);
export default users;
