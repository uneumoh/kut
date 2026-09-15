import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  length: z.number().int().positive(),
  texture: z.string().min(1),
  color: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().nonnegative().default(0),
  imageUrl: z.string().url().optional(),
});
