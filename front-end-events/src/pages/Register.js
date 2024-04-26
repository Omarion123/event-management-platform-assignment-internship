import React from "react";
import Hero from "../assets/images/loginBack.jpg";
import { FaCheckSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import CustomButton from "../components/CustomButton";
function Register() {
  const heroStyle = {
    backgroundImage: `url(${Hero})`,
    backgroundSize: "cover",
    filter: "brightness(30%) contrast(70%)",
  };
  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity as needed
  };
  return (
    <div className="">
      <div
        style={heroStyle}
        className="absolute inset-0 bg-cover bg-center object-cover"
      />
      <div
        style={overlayStyle}
        className="absolute inset-0 flex flex-col justify-center items-center"
      >
        <div class="min-w-[320px] max-h-[600px] md:w-[551px] h-[561px] bg-white rounded-md relative flex flex-col items-center pt-5">
          <div class="w-11 h-11 bg-someWhite text-black absolute top-[-25px] right-[-22px] flex justify-center items-center  rounded-full text-1xl cursor-pointer">
            x
          </div>
          <div className="md:w-96">
            <div className="flex flex-col items-center">
              <p className="font-bold text-5xl">Welcome.</p>
              <p className="text-grey text-lg">Please Register</p>
            </div>

            <div className="border-b-2 md:w-96 mt-10">
              <p className="font-bold text-sm">Profile Picture</p>
              <input
                type="file"
                className="w-full outline-none border-none"
              />
            </div>
            <div className="border-b-2 md:w-96 mt-5">
              <p className="font-bold text-sm">Username</p>
              <input
                type="text"
                placeholder="example.email@gmail.com"
                className="w-full outline-none border-none"
              />
            </div>
            <div className="border-b-2 md:w-96 mt-5">
              <p className="font-bold text-sm">Email</p>
              <input
                type="text"
                placeholder="example.email@gmail.com"
                className="w-full outline-none border-none"
              />
            </div>
            <div className="border-b-2 md:w-96 mt-5">
              <p className="font-bold text-sm">Password</p>
              <input
                type="password"
                placeholder="Enter at least 8+ characters"
                className="w-full outline-none border-none"
              />
            </div>

            <div className="flex items-center mt-5">
              <FaCheckSquare />
              <p>I agree with Terms & Conditions</p>
            </div>
            <div>
              <CustomButton style={"w-full mt-5 md:h-[44px]"}>
                Sign Up
              </CustomButton>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center items-center mt-5">
              <p className="text-sm text-someBlack">
                Already have an account?
              </p>
              <Link to={"/login"} className="font-bold text-sm text-primary">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
