import express from "express";
import dotenv from "dotenv";
import { twilio, users } from "./routes/index.js";
import ngrok from "ngrok";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/twilio", twilio);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
const CONNECTION_URL =
  "mongodb+srv://agucchristopher:agu123@memories-app.ryucxb9.mongodb.net/?retryWrites=true&w=majority";

const client = mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.log(`${error} did not connect`));
// mongoose.set("strictQuery", false);
// ngrok.connect(process.env.PORT).then((url) => {
//   console.log(`Server forwarded to public url ${url}`);
// });
