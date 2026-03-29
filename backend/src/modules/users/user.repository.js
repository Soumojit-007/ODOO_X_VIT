import prisma from "../../config/db.js";

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const getUsersByCompany = (companyId) => {
  return prisma.user.findMany({
    where: { companyId },
  });
};