import React from "react";
import { Outlet } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import MainFooter from "../components/footer/MainFooter";

const HomeLayout = () => {
  return (
    <div>
      <HeroSection />
      <div>
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};

export default HomeLayout;
