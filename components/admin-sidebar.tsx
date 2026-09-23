import React from "react";

const AdminSidebar = () => {
  return (
    <aside className="flex flex-2 flex-col bg-[#f9f9f7]">
      <div className="flex w-full justify-center">
        <p className="text-3xl">KUT Admin</p>
      </div>
      <div className="w-full p-2">
        <button className="w-full rounded-lg py-1 hover:bg-[#7c4b8b] hover:text-white">
          Inventory
        </button>
      </div>
      <div className="w-full p-2">
        <button className="w-full rounded-lg py-1 hover:bg-[#7c4b8b] hover:text-white">
          Orders
        </button>
      </div>
      <div className="w-full p-2">
        <button className="w-full rounded-lg py-1 hover:bg-[#7c4b8b] hover:text-white">
          Analytics
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
