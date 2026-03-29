import initRedis from "../../config/redis.js";

const redis = initRedis();

const TTL = 60 * 60; // 1 hour

export const getCachedRate = async (from, to) => {
  const key = `rate:${from}:${to}`;
  const cached = await redis.get(key);

  return cached ? JSON.parse(cached) : null;
};

export const setCachedRate = async (from, to, rate) => {
  const key = `rate:${from}:${to}`;
  await redis.set(key, JSON.stringify(rate), "EX", TTL);
};