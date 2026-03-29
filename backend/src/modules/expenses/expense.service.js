import axios from "axios";
import prisma from "../../config/db.js";
import * as expenseRepo from "./expense.repository.js";
import * as approvalEngine from "../approvals/rule.engine.js";
import env from "../../config/env.js";

const convertCurrency = async (amount, from, to) => {
  if (from === to) return amount;

  const res = await axios.get(`${env.apis.exchangeRate}/${from}`);
  const rate = res.data.rates[to];

  return amount * rate;
};

export const createExpense = async (data, user) => {
  const convertedAmount = await convertCurrency(
    data.amount,
    data.currency,
    user.company.baseCurrency
  );

  return expenseRepo.createExpense({
    ...data,
    convertedAmount,
    userId: user.id,
    companyId: user.companyId,
    status: "DRAFT",
  });
};

export const updateExpense = async (id, data, user) => {
  const expense = await expenseRepo.getExpenseById(id);

  if (expense.userId !== user.id || expense.status !== "DRAFT") {
    throw new Error("Cannot edit this expense");
  }

  return expenseRepo.updateExpense(id, data);
};

export const submitExpense = async (id, user) => {
  return prisma.$transaction(async (tx) => {
    const expense = await tx.expense.findUnique({ where: { id } });

    if (!expense || expense.userId !== user.id) {
      throw new Error("Expense not found");
    }

    if (expense.status !== "DRAFT") {
      throw new Error("Already submitted");
    }

    const steps = await approvalEngine.generateApprovalSteps(
      expense,
      user
    );

    await tx.expense.update({
      where: { id },
      data: { status: "WAITING_APPROVAL" },
    });

    for (const step of steps) {
      await tx.approvalTransaction.create({
        data: {
          expenseId: id,
          approverId: step.approverId,
          level: step.level,
          status: "APPROVED", // placeholder until action
        },
      });
    }

    return { message: "Submitted for approval" };
  });
};

export const getMyExpenses = (user) => {
  return expenseRepo.getUserExpenses(user.id);
};