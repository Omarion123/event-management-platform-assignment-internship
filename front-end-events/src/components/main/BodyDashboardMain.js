import React from "react";
import SideNav from "../SideNav";
import { Outlet } from "react-router-dom";

function BodyDashboardMain() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[10%] h-screen bg-someWhite">
        <SideNav />
      </div>
      <div className="w-[90%] bg-white border-t-2">
        <Outlet />
      </div>
    </div>
  );
}

export default BodyDashboardMain;
