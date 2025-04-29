import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-yellow-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
    
      <div className="flex flex-col items-center justify-center mt-4 w-full">
      <img src={data.avatar} alt="" className="h-[12vh] rounded-full" />
        <p className="text-xl text-zinc-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500"></div>
      </div>

      {/* LINKS AT THE BOTTOM */}
      <div className="w-full flex flex-col items-center justify-center mt-auto">
        <Link to="/profile">
          <div className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Profile
          </div>
        </Link>
        <Link to="/profile/orderHistory">
          <div className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Order History
          </div>
        </Link>
        <Link to="/profile/settings">
          <div className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Settings
          </div>
        </Link>
      </div>
      <button className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center p-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
      Log Out <IoIosLogOut className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
