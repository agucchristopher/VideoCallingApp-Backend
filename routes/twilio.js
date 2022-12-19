import express from "express";
import { gettoken } from "../controllers/twilio.js";

const twilio = express.Router();
twilio.get("/getToken", gettoken);
export default twilio;
