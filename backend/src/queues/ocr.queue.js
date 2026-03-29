import { createQueue } from "../config/bullmq.js";
import { QUEUE_NAMES } from "../utils/constants.js";

export const ocrQueue = createQueue(QUEUE_NAMES.OCR);

export const addOCRJob = async ({ expenseId, filePath }) => {
  if (!expenseId || !filePath) {
    throw new Error("Invalid OCR job data");
  }

  await ocrQueue.add("processOCR", {
    expenseId,
    filePath,
  });
};