import express from "express";
import dotenv from "dotenv";
import { twilio, users } from "./routes/index.js";
import ngrok from "ngrok";
import mongoose from "mongoose";

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
const CONNECTION_URL = process.env.CONNECTION_URL;
// const client = mongoose
//   .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to database!"))
//   .catch((error) => console.log(`${error} did not connect`));
// mongoose.set("useFindAndModify", false);
// ngrok.connect(process.env.PORT).then((url) => {
//   console.log(`Server forwarded to public url ${url}`);
// });
