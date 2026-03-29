import express from "express";
import * as approvalController from "../modules/approvals/approval.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/pending", approvalController.getPending);
router.post("/:expenseId/approve", approvalController.approve);
router.post("/:expenseId/reject", approvalController.reject);

export default router;