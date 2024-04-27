import React, { Component } from "react";
import Hero from "../../assets/images/hero.png";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import HeaderAfterLogin from "./HeaderAfterLogin";

class HeroSection extends Component {
  render() {
    const heroStyle = {
      backgroundImage: `url(${Hero})`,
      backgroundSize: "cover",
      filter: "brightness(30%) contrast(70%)",
    };
    const overlayStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity as needed
    };
    const sessionToken = localStorage.getItem("sessionToken");
    // Check if sessionToken is available
  const isLoggedIn = sessionToken !== null;

    return (
      <div>
        {isLoggedIn?<HeaderAfterLogin />:<HeaderBeforeLogin />}
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
