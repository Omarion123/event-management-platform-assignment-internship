import React, { Component } from "react";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import HeaderAfterLogin from "./HeaderAfterLogin";

class HeroSectionSingle extends Component {
  render() {
    const sessionToken = localStorage.getItem("sessionToken");
    // Check if sessionToken is available
    const isLoggedIn = sessionToken !== null;
    return (
      <div>{isLoggedIn ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}</div>
    );
  }
}

export default HeroSectionSingle;
