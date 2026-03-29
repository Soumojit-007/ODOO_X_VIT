import prisma from "../../config/db.js";

export const getCompanyById = (id) => {
  return prisma.company.findUnique({
    where: { id },
  });
};

export const updateCompany = (id, data) => {
  return prisma.company.update({
    where: { id },
    data,
  });
};