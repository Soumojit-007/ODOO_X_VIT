import { signupSchema, loginSchema } from "./auth.validation.js";
import * as authService from "./auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const parsed = signupSchema.parse(req.body);

    const result = await authService.signup(parsed);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const parsed = loginSchema.parse(req.body);

    const result = await authService.login(parsed);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};