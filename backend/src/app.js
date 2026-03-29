import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import env from "./config/env.js";
import logger from "./config/logger.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import approvalRoutes from "./routes/approval.routes.js";
import ruleRoutes from "./routes/rule.routes.js";

// Middlewares
import { errorMiddleware } from "./middlewares/error.middleware.js";

// App Init
const app = express();

// ----------------------
// Global Middlewares
// ----------------------
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (env.app.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// ----------------------
// Health Check
// ----------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

// ----------------------
// Routes
// ----------------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/approvals", approvalRoutes);
app.use("/api/v1/rules", ruleRoutes);

// ----------------------
// 404 Handler
// ----------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ----------------------
// Error Handler
// ----------------------
app.use(errorMiddleware);

export default app;