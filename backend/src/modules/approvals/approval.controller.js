import * as approvalService from "./approval.service.js";

export const getPending = async (req, res, next) => {
  try {
    const data = await approvalService.getPending(req.user);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const approve = async (req, res, next) => {
  try {
    const { comment } = req.body;

    const data = await approvalService.approve(
      req.params.expenseId,
      req.user,
      comment
    );

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const reject = async (req, res, next) => {
  try {
    const { comment } = req.body;

    const data = await approvalService.reject(
      req.params.expenseId,
      req.user,
      comment
    );

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};