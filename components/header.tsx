import React from "react";

const Header = () => {
  return (
    <div className="flex h-[10vh] w-full flex-row bg-[#E2E3E1] px-[5%]">
      <div className="flex flex-1 flex-row items-center">
        <h1>KUT</h1>
      </div>
      <div className="flex flex-1 flex-row items-center justify-center gap-5">
        <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
          Home
        </button>
        <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
          Shop Bundles
        </button>
        <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
          My Orders
        </button>
        <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
          Admin Portal
        </button>
      </div>
      <div className="flex flex-1 flex-row">{/* Cart Image */}</div>
    </div>
  );
};

export default Header;
