"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createOrderSchema } from "@/lib/validations/order";
import { generateOrderReference } from "@/lib/utils/order-reference";

export async function createOrder(input: unknown) {
  const data = createOrderSchema.parse(input);

  const productIds = [...new Set(data.items.map((item) => item.productId))];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const productMap = new Map(products.map((product) => [product.id, product]));

  const items = data.items.map((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Insufficient stock for ${product.name}. Available: ${product.stock}`,
      );
    }

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const order = await prisma.$transaction(async (tx) => {
    let reference: string;

    do {
      reference = generateOrderReference();

      const existing = await tx.order.findUnique({
        where: { reference },
        select: { id: true },
      });

      if (!existing) break;
    } while (true);

    const order = await tx.order.create({
      data: {
        reference,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        address: data.address,
        total,
        items: {
          create: items,
        },
      },
    });

    for (const item of items) {
      const updated = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: {
            gte: item.quantity,
          },
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      if (updated.count !== 1) {
        throw new Error("Stock changed while placing the order");
      }
    }

    return order;
  });

  revalidatePath("/admin/orders");

  return {
    orderId: order.id,
    orderReference: order.reference,
    accountNumber: process.env.BANK_ACCOUNT_NUMBER,
  };
}
