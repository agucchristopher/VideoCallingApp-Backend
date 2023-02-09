import { config } from "dotenv";
import nodemailer from "nodemailer";
config();
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "639a19dcf7b31c",
    pass: "a882fc9171f9b7",
  },
});
