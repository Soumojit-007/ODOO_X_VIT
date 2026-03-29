import axios from "axios";
import env from "../../config/env.js";
import { getCachedRate, setCachedRate } from "./currency.cache.js";

export const convertCurrency = async (amount, from, to) => {
  if (from === to) return amount;

  const cached = await getCachedRate(from, to);
  if (cached) return amount * cached;

  const res = await axios.get(`${env.apis.exchangeRate}/${from}`);
  const rate = res.data?.rates?.[to];

  if (!rate) {
    throw new Error("Currency conversion failed");
  }

  await setCachedRate(from, to, rate);

  return amount * rate;
};