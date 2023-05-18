import express from "express";
import dotenv from "dotenv";
import { users } from "./routes/index.js";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "30mb" }));

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
mongoose.set("strictQuery", true);
const client = mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err.message) : console.log("Connected to database")
);
