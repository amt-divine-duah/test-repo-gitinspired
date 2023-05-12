import nodemailer from "nodemailer";
import configValues from "./config";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: configValues.MAILER_HOST,
  port: Number(configValues.MAILER_PORT),
  auth: {
    user: process.env.MAILER_ADD,
    pass: process.env.MAILER_PASS,
  },
});

export default transporter;
