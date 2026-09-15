// types/orders.ts
enum Orderstatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PAID = "PAID",
  FULFILLED = "FULFILLED",
  CANCELLED = "CANCELLED",
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  total: number;
  status: Orderstatus;
  createdAt: Date;
  updatedAt: Date;
}
