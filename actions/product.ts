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

export async function createProduct(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const data = productSchema.parse(raw);

  const existingProduct = await prisma.product.findFirst({
    where: {
      name: data.name,
      length: data.length,
      texture: data.texture,
      color: data.color,
    },
  });

  if (existingProduct) {
    await prisma.product.update({
      where: { id: existingProduct.id },
      data: {
        stock: {
          increment: data.stock,
        },
      },
    });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/admin/products");
}

export async function updateProduct(id: string, input: unknown) {
  const data = productSchema.partial().parse(input);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string, _formData: FormData) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
