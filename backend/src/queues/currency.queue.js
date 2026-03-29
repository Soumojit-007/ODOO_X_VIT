import { createQueue } from "../config/bullmq.js";

export const currencyQueue = createQueue("currencyQueue");

export const addCurrencyJob = async (data) => {
  await currencyQueue.add("updateRates", data);
};