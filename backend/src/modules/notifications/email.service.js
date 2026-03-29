import nodemailer from "nodemailer";
import env from "../../config/env.js";
import logger from "../../config/logger.js";

const transporter = nodemailer.createTransport({
  host: env.email.host,
  port: env.email.port,
  secure: false,
  auth: {
    user: env.email.user,
    pass: env.email.pass,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Reimbursement System" <${env.email.user}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to}`);
  } catch (err) {
    logger.error("Email sending failed", err);
    throw err;
  }
};