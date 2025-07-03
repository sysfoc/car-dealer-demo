import nodemailer from "nodemailer";
import { config } from "@/app/api/utils/env-config";
const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: Number(config.emailPort),
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
});

export async function sendEmail({ to, subject, text }) {
  try {
    await transporter.sendMail({
      from: config.emailUser,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
