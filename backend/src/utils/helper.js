export const pick = (obj, fields) => {
  return fields.reduce((acc, field) => {
    if (obj[field] !== undefined) {
      acc[field] = obj[field];
    }
    return acc;
  }, {});
};

export const omit = (obj, fields) => {
  const clone = { ...obj };
  fields.forEach((field) => delete clone[field]);
  return clone;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateRandomToken = (length = 32) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  return token;
};