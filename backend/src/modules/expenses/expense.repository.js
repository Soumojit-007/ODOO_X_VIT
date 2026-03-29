import prisma from "../../config/db.js";

export const createExpense = (data) => {
  return prisma.expense.create({ data });
};

export const updateExpense = (id, data) => {
  return prisma.expense.update({
    where: { id },
    data,
  });
};

export const getExpenseById = (id) => {
  return prisma.expense.findUnique({
    where: { id },
    include: {
      approvals: true,
    },
  });
};

export const getUserExpenses = (userId) => {
  return prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};