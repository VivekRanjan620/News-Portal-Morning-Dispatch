import React from "react";
import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function BottomNavBar() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t
     border-x-gray-300 p-2 flex justify-around"
    >
      <Link to="/" className="flex flex-col items-center text-slate-800">
        <FaHome size={20} />
        <span className="text-xs">Home</span>
      </Link>

      <Link
        to="dashboard?tab=profile"
        className="flex flex-col items-center text-slate-800"
      >
        <FaUser size={20} />
        <span className="text-xs">Profile</span>
      </Link>

      <button className="flex flex-col items-center text-slate-800">
        <FaSignOutAlt size={20} />
        <span className="text-xs">Logout</span>
      </button>
    </nav>
  );
}

export default BottomNavBar;
