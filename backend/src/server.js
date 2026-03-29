import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { connectDB } from "./config/db.js";
import initRedis from "./config/redis.js";

// ---- Import Workers (IMPORTANT: initializes them) ----
import "./jobs/ocr.worker.js";
import "./jobs/email.worker.js";
import "./jobs/currency.worker.js";

// ----------------------
// Graceful Shutdown
// ----------------------
const shutdown = async (signal) => {
  logger.info(`⚠️ Received ${signal}. Shutting down gracefully...`);
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// ----------------------
// Bootstrap Server
// ----------------------
const startServer = async () => {
  try {
    // DB Connection
    await connectDB();

    // Redis Init
    initRedis();

    // Start Server
    app.listen(env.app.port, () => {
      logger.info(
        `🚀 Server running on port ${env.app.port} [${env.app.nodeEnv}]`
      );
    });
  } catch (err) {
    logger.error("❌ Server startup failed", err);
    process.exit(1);
  }
};

startServer();