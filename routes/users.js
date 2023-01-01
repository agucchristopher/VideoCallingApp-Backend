import express from "express";
import {
  signup,
  signin,
  confirmotp,
  verifyUser,
  generateotp,
  updatePassword,
} from "../controllers/users.js";

const users = express.Router();
users.post("/signup", signup);
users.post("/signin", signin);
users.post("/confirmotp", confirmotp);
users.patch("/updatepassword", updatePassword);
users.post("/verify-user", verifyUser);
users.post("/generateotp", generateotp);
export default users;
