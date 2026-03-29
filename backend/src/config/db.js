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
  try {
    await prisma.$connect();
    logger.info("✅ Database connected successfully");
  } catch (error) {
    logger.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

export default prisma;