import Tesseract from "tesseract.js";
import env from "../../config/env.js";

export const processOCR = async (filePath) => {
  if (env.ocrProvider === "tesseract") {
    const { data } = await Tesseract.recognize(filePath, "eng");

    return extractFields(data.text);
  }

  // Placeholder for Google Vision
  throw new Error("OCR provider not implemented");
};

const extractFields = (text) => {
  const amountMatch = text.match(/(\d+(\.\d{2})?)/);
  const dateMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);

  return {
    amount: amountMatch ? Number(amountMatch[0]) : null,
    date: dateMatch ? new Date(dateMatch[0]) : null,
    vendor: "Unknown",
    category: "General",
    rawText: text,
  };
};