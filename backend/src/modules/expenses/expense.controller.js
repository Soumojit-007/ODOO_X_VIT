import {
  createExpenseSchema,
  updateExpenseSchema,
} from "./expense.validation.js";

import * as expenseService from "./expense.service.js";

export const createExpense = async (req, res, next) => {
  try {
    const parsed = createExpenseSchema.parse(req.body);

    const expense = await expenseService.createExpense(
      parsed,
      req.user
    );

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const parsed = updateExpenseSchema.parse(req.body);

    const expense = await expenseService.updateExpense(
      req.params.id,
      parsed,
      req.user
    );

    res.json({ success: true, data: expense });
  } catch (err) {
    next(err);
  }
};

export const submitExpense = async (req, res, next) => {
  try {
    const result = await expenseService.submitExpense(
      req.params.id,
      req.user
    );

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getMyExpenses = async (req, res, next) => {
  try {
    const data = await expenseService.getMyExpenses(req.user);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};