import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const order = await prisma.order.create({
    data: {
      customerId: body.customerId,
      total: body.total,
    },
  });

  return NextResponse.json(order, { status: 201 });
}
