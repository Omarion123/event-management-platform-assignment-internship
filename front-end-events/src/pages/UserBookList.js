import React from "react";
import HeroSectionSingle from "../components/header/HeroSectionSingle";
import MainFooter from "../components/footer/MainFooter";
import BodyUserBookList from "../components/main/BodyUserBookList";

const UserBookList = () => {
  return (
    <div>
      <HeroSectionSingle />
      <div>
        <BodyUserBookList />
      </div>
      <MainFooter />
    </div>
  );
};

export default UserBookList;
