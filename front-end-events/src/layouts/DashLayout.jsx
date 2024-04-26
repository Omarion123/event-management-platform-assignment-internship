import React from "react";
import MainFooter from "../components/footer/MainFooter";
import BodyDashboardMain from "../components/main/BodyDashboardMain";
import HeroSectionSingle from "../components/header/HeroSectionSingle";

const DashLayout = () => {
  return (
    <div>
      <HeroSectionSingle />
      <div>
        <BodyDashboardMain />
      </div>
      <MainFooter />
    </div>
  );
};

export default DashLayout;
