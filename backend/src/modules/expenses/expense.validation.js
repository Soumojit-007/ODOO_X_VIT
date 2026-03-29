import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().positive(),
  currency: z.string(),
  category: z.string(),
  description: z.string(),
  date: z.string(),
  paidBy: z.string(),
  remarks: z.string().optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();