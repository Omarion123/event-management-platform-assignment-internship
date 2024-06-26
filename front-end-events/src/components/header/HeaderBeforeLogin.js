import React from 'react';
import Icon from "../../assets/images/Image 384.svg";
import Brand from "../../assets/images/YourEvent.svg";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";


const HeaderBeforeLogin = () => {
  return (
    <div className="h-14 bg-secondaryWhite flex justify-between items-center pr-2 pl-2 md:pr-5 md:pl-5">
      <Link to="/">
        <div className="flex items-center">
          <img src={Icon} className="h-[35px]" alt="Icon" />
          <img src={Brand} className="h-[20px]" alt="Brand" />
        </div>
      </Link>
      <div className="flex gap-2 md:gap-5">
        <CustomButton to="/register" style="bg-white !text-black border-2 border-primary">
          Register
        </CustomButton>
        <CustomButton to="/login">Login</CustomButton>
      </div>
    </div>
  );
};

export default HeaderBeforeLogin;
