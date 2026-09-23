// prisma/seed.ts
import { prisma } from "../lib/prisma";
import { OrderStatus } from "@prisma/client";

const products = [
  {
    name: "Brazilian Straight",
    length: 18,
    texture: "Straight",
    color: "Natural Black",
    price: 25000,
    stock: 10,
  },
  {
    name: "Peruvian Body Wave",
    length: 20,
    texture: "Body Wave",
    color: "Natural Black",
    price: 28000,
    stock: 8,
  },
  {
    name: "Malaysian Curly",
    length: 16,
    texture: "Curly",
    color: "Natural Black",
    price: 22000,
    stock: 5,
  },
];

async function seedProducts() {
  const created = [];
  for (const product of products) {
    const result = await prisma.product.upsert({
      where: {
        name_length_texture_color: {
          name: product.name,
          length: product.length,
          texture: product.texture,
          color: product.color,
        },
      },
      update: {},
      create: product,
    });
    created.push(result);
  }
  console.log(`Seeded ${created.length} products`);
  return created;
}

async function seedOrders(
  seededProducts: Awaited<ReturnType<typeof seedProducts>>,
) {
  const [straight, bodyWave, curly] = seededProducts;

  const orderBlueprints = [
    {
      reference: "SEED-0001",
      customerName: "Ada Obi",
      customerPhone: "+2348012345678",
      address: "12 Allen Avenue, Ikeja, Lagos",
      status: OrderStatus.PENDING_PAYMENT,
      items: [{ product: straight, quantity: 1 }],
    },
    {
      reference: "SEED-0002",
      customerName: "Chidinma Eze",
      customerPhone: "+2348023456789",
      address: "5 Bode Thomas Street, Surulere, Lagos",
      status: OrderStatus.PAID,
      items: [
        { product: bodyWave, quantity: 2 },
        { product: curly, quantity: 1 },
      ],
    },
    {
      reference: "SEED-0003",
      customerName: "Fatima Bello",
      customerPhone: "+2348034567890",
      address: "9 Adeola Odeku Street, Victoria Island, Lagos",
      status: OrderStatus.FULFILLED,
      items: [{ product: straight, quantity: 3 }],
    },
    {
      reference: "SEED-0004",
      customerName: "Grace Nwosu",
      customerPhone: "+2348045678901",
      address: "21 Opebi Road, Ikeja, Lagos",
      status: OrderStatus.CANCELLED,
      items: [{ product: curly, quantity: 1 }],
    },
  ];

  for (const blueprint of orderBlueprints) {
    const items = blueprint.items.map(({ product, quantity }) => ({
      productId: product.id,
      quantity,
      price: product.price,
    }));
    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );

    await prisma.order.upsert({
      where: { reference: blueprint.reference },
      update: {},
      create: {
        reference: blueprint.reference,
        customerName: blueprint.customerName,
        customerPhone: blueprint.customerPhone,
        address: blueprint.address,
        status: blueprint.status,
        total,
        items: { create: items },
      },
    });
  }

  console.log(`Seeded ${orderBlueprints.length} orders`);
}

async function main() {
  const seededProducts = await seedProducts();
  await seedOrders(seededProducts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
