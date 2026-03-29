import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"]),
  managerId: z.string().optional(),
});

export const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"]),
});