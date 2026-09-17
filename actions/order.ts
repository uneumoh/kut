// actions/orders.ts
"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createOrderSchema } from "@/lib/validations/order";
import { generateOrderReference } from "@/lib/utils/order-reference";

export async function createOrder(input: unknown) {
  const data = createOrderSchema.parse(input);

  const itemMap = new Map<string, number>();

  for (const item of data.items) {
    itemMap.set(
      item.productId,
      (itemMap.get(item.productId) ?? 0) + item.quantity,
    );
  }

  const normalizedItems = Array.from(itemMap.entries()).map(
    ([productId, quantity]) => ({
      productId,
      quantity,
    }),
  );

  const productIds = normalizedItems.map((item) => item.productId);
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

export async function markOrderPaid(id: string, _formData: FormData) {
  const result = await prisma.order.updateMany({
    where: {
      id,
      status: "PENDING_PAYMENT",
    },
    data: {
      status: "PAID",
    },
  });

  if (result.count !== 1) {
    throw new Error("Order not found or is no longer awaiting payment");
  }

  revalidatePath("/admin/orders");

  return { success: true };
}

export async function markOrderFulfilled(id: string, _formData: FormData) {
  const result = await prisma.order.updateMany({
    where: {
      id,
      status: "PAID",
    },
    data: {
      status: "FULFILLED",
    },
  });
  if (result.count !== 1) {
    throw new Error("Order not found or is not in a fulfillable state");
  }

  revalidatePath("/admin/orders");
  return { success: true };
}

export async function markOrderCancelled(id: string, _formData: FormData) {
  const result = await prisma.order.updateMany({
    where: {
      id,
      status: {
        in: ["PENDING_PAYMENT", "PAID"],
      },
    },
    data: {
      status: "CANCELLED",
    },
  });
  if (result.count !== 1) {
    throw new Error("Order not found or is not in a cancellable state");
  }
  revalidatePath("/admin/orders");
  return { success: true };
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

export async function getOrderByReference(reference: string) {
  const order = await prisma.order.findUnique({
    where: { reference },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

export async function listOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
}

export async function listPendingOrder() {
  const orders = await prisma.order.findMany({
    where: {
      status: "PENDING_PAYMENT",
    },
  });
  if (orders.length === 0) {
    throw new Error("No pending orders found");
  }
  return orders;
}
