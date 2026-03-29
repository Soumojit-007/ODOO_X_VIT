//the main core logic to generate approval steps based on the rules defined in the database
import prisma from "../../config/db.js";

export const generateApprovalSteps = async (expense, user) => {
  const rule = await prisma.approvalRule.findFirst({
    where: {
      companyId: user.companyId,
      minAmount: { lte: expense.amount },
      maxAmount: { gte: expense.amount },
    },
    include: {
      steps: true,
    },
  });

  if (!rule) throw new Error("No approval rule found");

  const steps = [];

  for (const step of rule.steps) {
    let approvers = [];

    if (step.approverRole === "MANAGER") {
      if (!user.managerId) throw new Error("Manager not assigned");
      approvers.push(user.managerId);
    }

    if (step.approverRole === "ADMIN") {
      const admins = await prisma.user.findMany({
        where: {
          companyId: user.companyId,
          role: "ADMIN",
        },
      });

      approvers = admins.map((a) => a.id);
    }

    approvers.forEach((id) => {
      steps.push({
        approverId: id,
        level: step.level,
      });
    });
  }

  return steps;
};