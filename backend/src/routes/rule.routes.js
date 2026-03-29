import express from "express";
import prisma from "../config/db.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(allowRoles("ADMIN"));

router.post("/", async (req, res, next) => {
  try {
    const rule = await prisma.approvalRule.create({
      data: {
        ...req.body,
        companyId: req.user.companyId,
      },
    });

    res.json({ success: true, data: rule });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const rules = await prisma.approvalRule.findMany({
      where: { companyId: req.user.companyId },
      include: { steps: true },
    });

    res.json({ success: true, data: rules });
  } catch (err) {
    next(err);
  }
});

export default router;