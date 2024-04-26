import React from "react";
import HeroSection from "../components/header/HeroSection";
import MainFooter from "../components/footer/MainFooter";
import Body from "../components/main/Body";

const HomeLayout = () => {
  return (
    <div>
      <HeroSection />
      <div>
        <Body />
      </div>
      <MainFooter />
    </div>
  );
};

export default HomeLayout;
