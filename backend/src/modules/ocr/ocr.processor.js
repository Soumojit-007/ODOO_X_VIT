import { processOCR } from "./ocr.service.js";
import prisma from "../../config/db.js";
import logger from "../../config/logger.js";

export const ocrProcessor = async (job) => {
  try {
    const { expenseId, filePath } = job.data;

    const extracted = await processOCR(filePath);

    await prisma.expense.update({
      where: { id: expenseId },
      data: {
        amount: extracted.amount || undefined,
        date: extracted.date || undefined,
        description: extracted.vendor,
      },
    });

    logger.info(`OCR processed for expense ${expenseId}`);
  } catch (err) {
    logger.error("OCR processing failed", err);
    throw err;
  }
};