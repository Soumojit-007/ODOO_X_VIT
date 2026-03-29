import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "../../config/env.js";
import {
  findUserByEmail,
  createCompanyWithAdmin,
} from "./auth.repository.js";

const getCurrencyFromCountry = async (country) => {
  const res = await axios.get(`${env.apis.restCountries}/${country}`);
  const data = res.data?.[0];

  if (!data || !data.currencies) {
    throw new Error("Invalid country for currency detection");
  }

  return Object.keys(data.currencies)[0]; // e.g. "USD"
};

const generateTokens = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    companyId: user.companyId,
  };

  const accessToken = jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry,
  });

  const refreshToken = jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry,
  });

  return { accessToken, refreshToken };
};

export const signup = async (data) => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const currency = await getCurrencyFromCountry(data.country);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const { admin, company } = await createCompanyWithAdmin({
    email: data.email,
    password: hashedPassword,
    companyName: data.companyName,
    country: data.country,
    currency,
  });

  const tokens = generateTokens(admin);

  return {
    user: admin,
    company,
    tokens,
  };
};

export const login = async (data) => {
  const user = await findUserByEmail(data.email);

  if (!user) throw new Error("Invalid credentials");
  if(!user.isActive) throw new Error("User not active..")

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const tokens = generateTokens(user);

  return { user, tokens };
};