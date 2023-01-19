import express from "express";
import mongoose from "mongoose";
import twilio from "twilio";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import verifyEmail from "../models/VerifyEmail.js";
import { generateotpcode } from "../helpers/index.js";
import Confirmotp from "../models/Confirmotp.js";
import jwt from "jsonwebtoken";
// Signup
export const signup = async (req, res) => {
  let { username, first_name, last_name, password, country, gender, email } =
    req.body;
  const userhash = await bcrypt.hash(password, 8);

  password = userhash;
  let profilePic;
  if (gender == "male") {
    profilePic = "link to male avatar";
  } else {
    profilePic = "link to Female avatar";
  }
  let token = generateotpcode();
  console.log(token);
  const tokenhash = await bcrypt.hash(`${token}`, 8);

  token = tokenhash;
  console.log(token);
  const newUser = new User({
    username,
    first_name,
    last_name,
    country,
    gender,
    email,
    profilePic,
    password,
  });
  const verifyToken = new verifyEmail({ owner: newUser._id, token });
  try {
    const emailexists = await User.findOne({ email });
    if (emailexists) {
      throw Error("Email already in use");
    }
    const usernameexists = await User.findOne({ username });
    if (usernameexists) {
      throw Error("Username already in use");
    }
    await newUser.save();
    await verifyToken.save();
    res.status(201).json({
      status: "success",
      user: newUser,
      message: "Signup Successful!",
    });
  } catch (error) {
    if (error) {
      res.status(409).json({ message: error.message });
    }
  }
  res.end();
};
// Verify User
export const verifyUser = async (req, res) => {
  const { token, id, email } = req.body;
  const _id = id;
  try {
    const userexists = await User.findOne({ _id });
    if (!userexists) {
      throw Error("invalid user");
    }
    const usertoken = await verifyEmail.findOne({ owner: id });
    if (!usertoken) {
      throw Error("User have already been verified!");
    }
    const correct = await bcrypt.compare(token, `${usertoken.token}`);
    if (!correct) {
      throw Error("invalid token");
    }
    const verify = verifyEmail.findOneAndDelete({ owner: id });
    const user = User.findOneAndUpdate({ id });
    user.update({ verified: "true" });
    await verify;
    await user;
    res.status(200).json({
      status: "success",
      message: "User have been verified succesfully",
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

// Signin
export const signin = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username: username });
  let userpassword;
  let token;
  try {
    if (!user) {
      const uemail = await User.findOne({ email: username });
      if (!uemail) {
        throw Error("User does not exist");
      }
    }
    const uemail = await User.findOne({ email: username });
    userpassword = !user ? uemail.password : user.password;
    const iscorrectpassword = await bcrypt.compare(password, userpassword);
    if (!iscorrectpassword) {
      throw Error("Incorrect Password");
    }
    let id = user ? user._id : uemail._id;
    token = jwt.sign({ id }, process.env.SECRET);
    res.status(200).json({
      status: "success",
      message: "Logged In Sucessfully",
      user: {
        _id: user ? user._id : uemail._id,
        username: user ? user.username : uemail.username,
        email: user ? user.email : uemail.email,
        verified: user ? user.verified : uemail.verified,
        first_name: user ? user.first_name : uemail.first_name,
        last_name: user ? user.last_name : uemail.last_name,
        gender: user ? user.gender : uemail.gender,
        country: user ? user.country : uemail.country,
      },
      token: token,
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};
// Generate OTP
export const generateotp = async (req, res) => {
  const { id } = req.body;
  const _id = id;
  try {
    const resettoken = await Confirmotp.findOneAndDelete({ owner: _id });
    if (resettoken) {
    }
    let otp = generateotpcode();
    console.log(otp);
    const hash = await bcrypt.hash(`${otp}`, 8);
    otp = hash;
    const userexists = await User.findOne({ _id });
    if (!userexists) {
      throw Error("invalid user");
    }
    const reset = new Confirmotp({ owner: id, token: `${otp}` });
    await reset.save();
    res.status(200).json({
      status: "success",
      message: "We Sent You A Code at test@gmail.com",
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }

  // }
};
// Confirm OTP
export const verifyotp = async (req, res) => {
  try {
    const { token, id } = req.body;
    const _id = id;
    const usertoken = await User.findOne({ _id });
    if (!usertoken) {
      throw Error("Invalid User");
    }
    const resettoken = await Confirmotp.findOne({ owner: _id });
    if (!resettoken) {
      throw Error("Invalid Token");
    }
    let utoken = `${resettoken.token}`;
    utoken.trim();
    token.trim();
    const correct = await bcrypt.compare(`${token}`, `${utoken}`);
    console.log(`${token}`, `${utoken}`);
    if (!correct) {
      throw Error("Token does not match");
    } else {
      const deletetoken = Confirmotp.findOneAndDelete({ owner: _id });
      await deletetoken;
      res.status(200).json({
        status: "success",
        message: "Token have been confirmed",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};
// Update Password
export const updatePassword = async (req, res) => {
  let { id, password } = req.body;
  const _id = id;
  const rawpass = password;
  const passwordhash = await bcrypt.hash(password, 8);
  password = passwordhash;
  try {
    const userexists = await User.findOne({ _id });
    if (!userexists) {
      throw Error("invalid user");
    }
    const usertoken = await Confirmotp.findOne({ owner: _id });
    if (usertoken) {
      throw Error("Invalid Request");
    }
    const exists = await bcrypt.compare(rawpass, `${userexists.password}`);
    console.warn("exists", exists, usertoken);
    if (exists) {
      throw Error("Your New Password Must be different from the old one");
    }

    const user = User.findOneAndUpdate({ _id });
    user.update({ password: password });
    await user;
    res.status(200).json({
      status: "success",
      message: "User password have been updated succesfully",
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};
