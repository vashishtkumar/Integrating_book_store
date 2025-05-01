import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth"

const Sidebar = ({ data }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const role=useSelector((state)=>state.auth.role);

  return (
    <div className="bg-yellow-800 p-4 rounded flex flex-col items-center justify-between lg:h-[100%]">
      <div className="flex flex-col items-center justify-center ">
        {" "}
        <img src={data.avatar} alt="" className="h-[12vh] " />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {role==="user" && <div className="w-full flex flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>}

{role==="admin" &&( <div className="w-full flex flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          All Order
        </Link>
        <Link
          to="/profile/add-book"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Add Book
        </Link>
      </div>)}


      <button className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center p-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300" 
      onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        navigate("/");
    }}
    
      >
        Log Out <IoIosLogOut className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
