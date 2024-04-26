import React, { Component } from "react";
import Icon from "../assets/images/Image 384.svg";
import Brand from "../assets/images/YourEvent.svg";
import CustomButton from "./CustomButton";
import Hero from "../assets/images/hero.png";

class HeroSection extends Component {
  render() {
    const heroStyle = {
      backgroundImage: `url(${Hero})`,
      backgroundSize: "cover",
      filter: "brightness(30%) contrast(70%)",
    };
    const overlayStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity as needed
    };

    return (
      <div>
        <div className="h-14 bg-secondaryWhite flex justify-between items-center pr-2 pl-2 md:pr-5 md:pl-5">
          <div className="flex items-center">
            <img src={Icon} className="h-[35px]" alt="Icon" />
            <img src={Brand} className="h-[20px]" alt="Brand" />
          </div>
          <div className="flex gap-2 md:gap-5">
            <CustomButton to="/register" style="bg-white text-blue-700 border">
              Register
            </CustomButton>
            <CustomButton to="/login">Login</CustomButton>
          </div>
        </div>
        <div className="h-[300px] md:h-[469px] relative">
          <div
            style={heroStyle}
            className="absolute inset-0 bg-cover bg-center object-cover"
          />
          <div
            style={overlayStyle}
            className="absolute inset-0 flex flex-col justify-center items-center"
          >
            <h1 className="font-bold text[40px] lg:text-[56px] text-white">
              Pick up your{" "}
            </h1>
            <h1 className="font-bold text[40px] lg:text-[56px] text-primary">
              wonderful plans
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default HeroSection;
