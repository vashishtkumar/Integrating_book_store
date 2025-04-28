import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  // const isLoggedIn = useSelector(); // (still ignored as you said)

  const [profile, setProfile] = useState(null);  // <-- lowercase name and initial null

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="bg-zinc-800 px-2 md:px-12 flex md:flex-row h-screen py-8 gap-8 text-white">
      {!profile && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
      {profile && (
        <>
          <div className=" w-full md:w-1/6">
            <Sidebar data={profile}/>
          </div>

          <div className=" w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
