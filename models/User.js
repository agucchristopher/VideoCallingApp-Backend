import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  country: String,
  password: String,
  gender: String,
  email: String,
  joinDate: {
    type: Date,
    default: new Date(),
  },
  profilePic: String,
});

var User = mongoose.model("User", userSchema);

export default User;
