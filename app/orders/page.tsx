import { createOrder } from "@/actions/order";

export default function TestOrderPage() {
  return (
    <form
      action={async (formData) => {
        "use server";

        const order = await createOrder({
          customerId: formData.get("customerId") as string,
          total: Number(formData.get("total")),
        });

        console.log(order);
      }}
    >
      <input name="customerId" placeholder="Customer ID" />

      <input name="total" type="number" placeholder="Total" />

      <button type="submit">Create Order</button>
    </form>
  );
}
