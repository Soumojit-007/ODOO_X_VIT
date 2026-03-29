export const tenantMiddleware = (req, res, next) => {
  if (!req.user?.companyId) {
    return res.status(400).json({
      message: "Tenant not found",
    });
  }

  next();
};