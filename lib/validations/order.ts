// lib/validations/order.ts
import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Name is required"),
  customerPhone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,14}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Address is required"),

  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "At least one item is required"),
});
