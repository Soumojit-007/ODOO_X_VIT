import prisma from "../../config/db.js";

export const getPendingApprovals = (userId) => {
  return prisma.approvalTransaction.findMany({
    where: {
      approverId: userId,
    },
    include: {
      expense: true,
    },
  });
};

export const updateApproval = (id, data) => {
  return prisma.approvalTransaction.update({
    where: { id },
    data,
  });
};