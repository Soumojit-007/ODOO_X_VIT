import { createWorker } from "../config/bullmq.js";
import { sendEmail } from "../modules/notifications/email.service.js";

createWorker("emailQueue", async (job) => {
  await sendEmail(job.data);
});