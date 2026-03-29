import { PrismaClient } from "@prisma/client";
import env from "./env.js";
import logger from "./logger.js";

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.app.nodeEnv === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (env.app.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}

export const connectDB = async () => {
  let retries = 5;

  while (retries) {
    try {
      await prisma.$connect();
      console.log("✅ DB connected");
      break;
    } catch (err) {
      console.error("DB connection failed, retrying...", err);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};;

export default prisma;