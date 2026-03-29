import logger from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};