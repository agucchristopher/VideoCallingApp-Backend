import mongoose from "mongoose";

const verifyEmailSchema = mongoose.Schema({
  owner: String,
  token: String,
});

var verifyEmail = mongoose.model("verificationToken", verifyEmailSchema);
export default verifyEmail;
