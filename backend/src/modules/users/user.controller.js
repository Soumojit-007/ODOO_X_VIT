import {
  createUserSchema,
  updateRoleSchema,
} from "./user.validation.js";

import * as userService from "./user.service.js";

export const createUser = async (req, res, next) => {
  try {
    const parsed = createUserSchema.parse(req.body);

    const user = await userService.createUser(parsed, req.user);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const parsed = updateRoleSchema.parse(req.body);

    const user = await userService.updateUserRole(
      req.params.id,
      parsed.role,
      req.user
    );

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const assignManager = async (req, res, next) => {
  try {
    const { managerId } = req.body;

    const user = await userService.assignManager(
      req.params.id,
      managerId,
      req.user
    );

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.user);

    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};