import React from "react";
import HeroSectionSingle from "../components/header/HeroSectionSingle";
import MainFooter from "../components/footer/MainFooter";
import BodySingle from "../components/main/BodySingle";

const Article = () => {
  return (
    <div>
      <HeroSectionSingle />
      <div>
        <BodySingle />
      </div>
      <MainFooter />
    </div>
  );
};

export default Article;
