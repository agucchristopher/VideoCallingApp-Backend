import mongoose from "mongoose";

const ConfirmotpSchema = mongoose.Schema({
  owner: String,
  token: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Confirmotp = mongoose.model("OTP", ConfirmotpSchema);
export default Confirmotp;
