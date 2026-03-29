import * as companyRepo from "./company.repository.js";

export const getCompany = async (currentUser) => {
  return companyRepo.getCompanyById(currentUser.companyId);
};

export const updateCompany = async (data, currentUser) => {
  if (currentUser.role !== "ADMIN") {
    throw new Error("Only admin can update company");
  }

  return companyRepo.updateCompany(currentUser.companyId, data);
};