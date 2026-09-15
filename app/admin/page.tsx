import Footer from "@/components/footer";
import Header from "@/components/header";

const Admin = () => {
  return (
    <div className="flex min-h-screen w-screen flex-row">
      <aside className="flex flex-3 flex-col">
        <div className="flex w-full justify-center">KUT</div>
        <button>Inventory</button>
        <button>Orders</button>
        <button>Analytics</button>
      </aside>
      <main className="flex flex-7 flex-col px-[5%]">
        <div className="flex h-[5vh] flex-row items-center">
          <p>Admin Portal</p>
        </div>
        <div className="flex h-[10vh] flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl">Order Management</h1>
            <p>Review, approve, and manage customer orders.</p>
          </div>
          <div className="flex flex-row gap-4">
            <button className="rounded-md hover:cursor-pointer">Filter</button>
            <button>Export Report</button>
          </div>
        </div>
        <div className="flex h-[15vh] w-full flex-row items-center justify-evenly">
          <div className="flex flex-1">
            <p>Pending Approval</p>
          </div>
          <div className="flex flex-1">Awaiting Payment</div>
          <div className="flex flex-1">Ready to Ship</div>
          <div className="flex flex-1">Completed Orders</div>
        </div>

        <div>
          <h2>Recent Orders</h2>
          <input type="text" placeholder="Search order id or customer..." />
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
      </main>
    </div>
  );
};

export default Admin;
