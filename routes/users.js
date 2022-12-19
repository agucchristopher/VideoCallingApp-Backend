import express from "express";
import {
  signup,
  signin,
  updatepassword,
  confirmotp,
  test,
} from "../controllers/users.js";

const users = express.Router();
users.post("/signup", signup);
users.post("/signin", signin);
users.post("/confirmotp", confirmotp);
users.patch("/updatepassword", updatepassword);
users.post("/test", test);
export default users;
