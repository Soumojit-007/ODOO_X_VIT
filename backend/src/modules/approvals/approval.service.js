import prisma from "../../config/db.js";
import * as approvalRepo from "./approval.repository.js";

export const getPending = (user) => {
  return approvalRepo.getPendingApprovals(user.id);
};

export const approve = async (expenseId, user, comment) => {
  return prisma.$transaction(async (tx) => {
    const record = await tx.approvalTransaction.findFirst({
      where: {
        expenseId,
        approverId: user.id,
      },
    });

    if (!record) throw new Error("No approval found");

    await tx.approvalTransaction.update({
      where: { id: record.id },
      data: {
        status: "APPROVED",
        comment,
      },
    });

    return { message: "Approved" };
  });
};

export const reject = async (expenseId, user, comment) => {
  return prisma.$transaction(async (tx) => {
    const record = await tx.approvalTransaction.findFirst({
      where: {
        expenseId,
        approverId: user.id,
      },
    });

    if (!record) throw new Error("No approval found");

    await tx.approvalTransaction.update({
      where: { id: record.id },
      data: {
        status: "REJECTED",
        comment,
      },
    });

    await tx.expense.update({
      where: { id: expenseId },
      data: { status: "REJECTED" },
    });

    return { message: "Rejected" };
  });
};