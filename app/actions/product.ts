"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";
// TODO: import { requireAdmin } from '../lib/auth' once auth is implemented,
// and call it at the top of createProduct / updateProduct / deleteProduct

export async function listProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function createProduct(input: unknown) {
  const data = productSchema.parse(input);
  const product = await prisma.product.create({ data });
  revalidatePath("/admin/products");
  return product;
}

export async function updateProduct(id: string, input: unknown) {
  const data = productSchema.partial().parse(input);
  const product = await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
