import * as companyService from "./company.service.js";

export const getCompany = async (req, res, next) => {
  try {
    const data = await companyService.getCompany(req.user);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const data = await companyService.updateCompany(req.body, req.user);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};