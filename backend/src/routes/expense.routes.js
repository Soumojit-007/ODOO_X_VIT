import express from "express";
import * as expenseController from "../modules/expenses/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.post("/:id/submit", expenseController.submitExpense);
router.get("/my", expenseController.getMyExpenses);

export default router;