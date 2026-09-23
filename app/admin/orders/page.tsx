import {
  getOrders,
  markOrderPaid,
  markOrderFulfilled,
  markOrderCancelled,
  cancelStaleOrders,
} from "@/actions/order";
import AdminSidebar from "@/components/admin-sidebar";

const statusLabels: Record<Orderstatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAID: "Paid",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
};
const AdminOrdersPage = async () => {
  const orders = await getOrders();

  return (
    <div className="flex min-h-screen w-screen flex-row">
      <AdminSidebar />
      <main className="flex flex-7 flex-col">
        <h1>Order Requests & Bank Transfers</h1>
        <div className="flex w-full flex-row justify-between">
          <div className="w-1/2">
            <p className="text-wrap">
              Review manual order submissions, verify bank transfers, and update
              fulfillment statuses
            </p>
          </div>
          <div className="flex gap-2 px-2">
            <button className="rounded-lg bg-[#E8E8E6] p-2 hover:bg-[#7c4b8b] hover:text-white">
              Export Orders
            </button>
            <button className="rounded-lg bg-[#E8E8E6] p-2 hover:bg-[#7c4b8b] hover:text-white">
              Create Manual Order
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Placed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.reference}</td>
                <td>
                  {order.customerName}
                  {!order.customerId && (
                    <span className="ml-1 rounded bg-gray-100 px-1 text-xs text-gray-500">
                      Guest
                    </span>
                  )}
                </td>
                <td>{order.customerPhone}</td>
                <td>₦{order.total.toString()}</td>
                <td>{statusLabels[order.status]}</td>
                <td>{order.createdAt.toLocaleDateString()}</td>
                <td className="flex gap-2">
                  {order.status === "PENDING_PAYMENT" && (
                    <>
                      <form action={markOrderPaid.bind(null, order.id)}>
                        <button
                          type="submit"
                          className="rounded bg-green-100 px-2 py-1 text-sm"
                        >
                          Mark Paid
                        </button>
                      </form>
                      <form action={markOrderCancelled.bind(null, order.id)}>
                        <button
                          type="submit"
                          className="rounded bg-red-100 px-2 py-1 text-sm"
                        >
                          Cancel
                        </button>
                      </form>
                    </>
                  )}
                  {order.status === "PAID" && (
                    <>
                      <form action={markOrderFulfilled.bind(null, order.id)}>
                        <button
                          type="submit"
                          className="rounded bg-blue-100 px-2 py-1 text-sm"
                        >
                          Mark Fulfilled
                        </button>
                      </form>
                      <form action={markOrderCancelled.bind(null, order.id)}>
                        <button
                          type="submit"
                          className="rounded bg-red-100 px-2 py-1 text-sm"
                        >
                          Cancel
                        </button>
                      </form>
                    </>
                  )}
                  {(order.status === "FULFILLED" ||
                    order.status === "CANCELLED") && (
                    <span className="text-sm text-gray-400">No actions</span>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-400">
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <form action={cancelStaleOrders.bind(null, 24)}>
          <button type="submit">Cancel orders pending 24h+</button>
        </form>
      </main>
    </div>
  );
};

export default AdminOrdersPage;
