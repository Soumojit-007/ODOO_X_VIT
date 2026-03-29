import prisma from "../../config/db.js";

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createCompanyWithAdmin = async ({
  email,
  password,
  companyName,
  country,
  currency,
}) => {
  return prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: companyName,
        country,
        baseCurrency: currency,
      },
    });

    const admin = await tx.user.create({
      data: {
        email,
        password,
        role: "ADMIN",
        companyId: company.id,
        isActive: true,
      },
    });

    return { company, admin };
  });
};