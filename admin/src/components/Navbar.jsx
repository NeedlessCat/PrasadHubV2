import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        {/* Show logo image on larger devices */}
        <img
          className="w-36 sm:w-40 cursor-pointer hidden sm:block"
          src={assets.logo}
          alt="Logo"
        />
        {/* Show devi image on smaller devices */}
        <img
          className="w-8 sm:w-40 cursor-pointer sm:hidden"
          src={assets.devi}
          alt="Devi"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          Admin
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;