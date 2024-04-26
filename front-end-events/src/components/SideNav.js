import React from "react";
import {
  FaAssistiveListeningSystems,
  FaFile,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="pl-5 mt-10">
      <Link to="/dashboard" className="cursor-pointer flex items-center gap-3">
        <FaAssistiveListeningSystems />
        <p className="font-bold text-sm">Dashboard</p>
      </Link>
      <Link
        to="/dashboard/event"
        className="cursor-pointer flex items-center gap-3 mt-5"
      >
        <FaFile />
        <p className="font-bold text-sm">Events</p>
      </Link>
      <Link to="/dashboard/booking" className="cursor-pointer flex items-center gap-3 mt-5">
        <FaBook />
        <p className="font-bold text-sm">Booking</p>
      </Link>
      <Link to="/dashboard/users" className="cursor-pointer flex items-center gap-3 mt-5">
        <FaUsers />
        <p className="font-bold text-sm">Users</p>
      </Link>
    </div>
  );
}

export default SideNav;
