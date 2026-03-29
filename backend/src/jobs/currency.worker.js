import { createWorker } from "../config/bullmq.js";
import axios from "axios";
import env from "../config/env.js";
import logger from "../config/logger.js";
import { setCachedRate } from "../modules/currency/currency.cache.js";

createWorker("currencyQueue", async (job) => {
  const { base } = job.data;

  try {
    const res = await axios.get(`${env.apis.exchangeRate}/${base}`);
    const rates = res.data?.rates;

    if (!rates) throw new Error("Invalid exchange rate response");

    const promises = Object.entries(rates).map(([to, rate]) =>
      setCachedRate(base, to, rate)
    );

    await Promise.all(promises);

    logger.info(`✅ Currency rates cached for base ${base}`);
  } catch (err) {
    logger.error("❌ Currency worker failed", err);
    throw err;
  }
});