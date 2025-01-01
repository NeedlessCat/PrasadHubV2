import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <div className="hidden md:inline-flex bg-[#f5f5f0] py-2 px-4 rounded-full gap-6 text-sm">
        <NavLink
          to="/"
          className="text-gray-600 hover:text-[#CC5500] transition-colors"
        >
          HOME
        </NavLink>
        <NavLink
          to={"/about"}
          className="text-gray-600 hover:text-[#CC5500] transition-colors"
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/update-form"
          className="text-gray-600 hover:text-[#CC5500] transition-colors"
        >
          UPDATE FORM
        </NavLink>
        <NavLink
          to="/contact"
          className="text-gray-600 hover:text-[#CC5500] transition-colors"
        >
          CONTACT
        </NavLink>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-2 cursor-pointer group relative">
          <img
            className="w-8 rounded-full mr-3"
            src={assets.profile}
            alt="Donate & Help"
          />
        </div>
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/update-form">
              <p className="px-4 py-2 rounded inline-block">UPDATE FORM </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
