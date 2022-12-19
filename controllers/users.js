import express from "express";
import mongoose from "mongoose";
import twilio from "twilio";
import User from "../models/User.js";
export const signup = async (req, res) => {
  const { username, first_name, last_name, password, country, gender, email } =
    req.body;
  let profilePic;
  if (gender == "Male") {
    profilePic = "link to male avatar";
  } else {
    profilePic = "link to Female avatar";
  }
  const newUser = new User({
    username,
    first_name,
    last_name,
    password,
    country,
    gender,
    email,
    profilePic,
  });

  try {
    await newUser.save();
    res.status(201).json({ status: "success", newUser, message: "Created" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  res.end();
};

export const signin = (req, res) => {
  const { username, email, password } = req.body;
  if (username == "de") {
    res.status(404).json({
      status: "error",
      maessage: "User doesn't Exists",
      username,
      email,
    });
  }
  if (username == "exists") {
    res.status(201).json({
      status: "success",
      maessage: "User Exists",
      username,
      email,
    });
    // res.end();
  }
};

export const updatepassword = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

export const confirmotp = (req, res) => {
  const { otp, uotp } = req.body;
  if (!otp && !uotp) {
    res.status(400).json({
      status: "error",
      message: "Required fields are empty",
    });
  }
  if (otp !== uotp) {
    res.status(400).json({
      status: "error",
      message: "Otp do not match",
    });
  }
  if (otp == uotp) {
    res.status(200).json({
      status: "success",
      message: "confirmed",
    });
  }
};

export const test = (req, res) => {
  console.log(req.body);
  const body = req.body;
  res.status(200).json({
    status: "success",
    body,
  });
};
