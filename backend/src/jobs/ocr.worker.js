import { createWorker } from "../config/bullmq.js";
import { ocrProcessor } from "../modules/ocr/ocr.processor.js";
import logger from "../config/logger.js";

createWorker("ocrQueue", async (job) => {
  try {
    await ocrProcessor(job);
  } catch (err) {
    logger.error("❌ OCR worker failed", err);
    throw err;
  }
});