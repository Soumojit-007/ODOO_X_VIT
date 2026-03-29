import bcrypt from "bcryptjs";
import * as userRepo from "./user.repository.js";

export const createUser = async (data, currentUser) => {
  if (currentUser.role !== "ADMIN") {
    throw new Error("Only admin can create users");
  }

  const password = await bcrypt.hash("Temp@123", 10);

  return userRepo.createUser({
    email: data.email,
    password,
    role: data.role,
    managerId: data.managerId || null,
    companyId: currentUser.companyId,
    isActive: false,
  });
};

export const updateUserRole = async (userId, role, currentUser) => {
  if (currentUser.role !== "ADMIN") {
    throw new Error("Only admin can update roles");
  }

  return userRepo.updateUser(userId, { role });
};

export const assignManager = async (userId, managerId, currentUser) => {
  if (currentUser.role !== "ADMIN") {
    throw new Error("Only admin can assign manager");
  }

  return userRepo.updateUser(userId, { managerId });
};

export const getUsers = async (currentUser) => {
  return userRepo.getUsersByCompany(currentUser.companyId);
};