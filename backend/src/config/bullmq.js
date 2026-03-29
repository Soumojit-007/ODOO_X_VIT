import { Queue, Worker } from "bullmq";
import initRedis from "./redis.js";
import logger from "./logger.js";

const connection = initRedis();

// ---- Queue Factory ----
export const createQueue = (name) => {
  return new Queue(name, {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });
};

// ---- Worker Factory ----
export const createWorker = (name, processor) => {
  const worker = new Worker(name, processor, {
    connection,
    concurrency: 5,
  });

  worker.on("completed", (job) => {
    logger.info(`✅ Job completed: ${name} | ID: ${job.id}`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`❌ Job failed: ${name} | ID: ${job?.id}`, err);
  });

  worker.on("error", (err) => {
    logger.error(`❌ Worker error in ${name}`, err);
  });

  return worker;
};