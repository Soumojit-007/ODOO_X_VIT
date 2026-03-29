import { createQueue } from "../../config/bullmq.js";

export const emailQueue = createQueue("emailQueue");

export const addEmailJob = async (data) => {
  await emailQueue.add("sendEmail", data);
};