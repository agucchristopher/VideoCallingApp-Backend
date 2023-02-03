import express from "express";
import dotenv from "dotenv";
import { users } from "./routes/index.js";
// import ngrok from "ngrok";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
// app.use("/twilio", twilio);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
const CONNECTION_URL = "mongodb://localhost:27017";
const client = mongoose.connect(
  "mongodb://127.0.0.1:27017/vcapp",
  {
    // dbName: "yourDB-name",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err.message) : console.log("Connected to database")
);
mongoose.set("strictQuery", true);
