import React, { useState } from "react";
import Hero from "../assets/images/loginBack.jpg";
import { FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // Assuming role is a string input
    profile: null, // File input for profile picture
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profile", formData.profile);
    formDataToSend.append("role", "user"); // Default role as "user"

    try {
      const response = await fetch(
        "https://event-management-platform-assignment.onrender.com/auth/register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        // Registration successful, show a success toast
        toast.success("Registration successful!");
        // You can also navigate to another page if needed
      } else {
        // Registration failed, show an error toast
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

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
        <div className="min-w-[320px] max-h-[600px] md:w-[551px] h-[561px] bg-white rounded-md relative flex flex-col items-center pt-5">
          <Link to={"/"}>
            <div class="w-11 h-11 bg-someWhite text-black absolute top-[-25px] right-[-22px] flex justify-center items-center  rounded-full text-1xl cursor-pointer">
              x
            </div>
          </Link>
          <div className="md:w-96">
            <div className="flex flex-col items-center">
              <p className="font-bold text-5xl">Welcome.</p>
              <p className="text-grey text-lg">Please Register</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="border-b-2 md:w-96 mt-10">
                <p className="font-bold text-sm">Profile Picture</p>
                <input
                  type="file"
                  name="profile"
                  className="w-full outline-none border-none"
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 md:w-96 mt-5">
                <p className="font-bold text-sm">Username</p>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full outline-none border-none"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 md:w-96 mt-5">
                <p className="font-bold text-sm">Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="example.email@gmail.com"
                  className="w-full outline-none border-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b-2 md:w-96 mt-5">
                <p className="font-bold text-sm">Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter at least 8+ characters"
                  className="w-full outline-none border-none"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center mt-5">
                <FaCheckSquare />
                <p>I agree with Terms & Conditions</p>
              </div>
              <div>
                <button
                  className={
                    "w-full mt-5 md:h-[44px] h-[35px] bg-primary text-white cursor-pointer flex justify-center items-center rounded-md text-sm"
                  }
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex flex-col md:flex-row md:justify-center items-center mt-5">
              <p className="text-sm text-someBlack">Already have an account?</p>
              <Link to={"/login"} className="font-bold text-sm text-primary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
