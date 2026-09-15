"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createOrder(data: { customerId: string; total: number }) {
  const order = await prisma.order.create({
    data: {
      customerId: data.customerId,
      total: data.total,
    },
  });

  revalidatePath("/orders");

  return order;
}

export async function getOrders() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: {
      id,
    },
  });
}

export async function updateOrder(
  id: string,
  data: {
    customerId?: string;
    total?: number;
    status?: OrderStatus;
  },
) {
  const order = await prisma.order.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/orders");

  return order;
}

export async function deleteOrder(id: string) {
  await prisma.order.delete({
    where: {
      id,
    },
  });

  revalidatePath("/orders");
}
