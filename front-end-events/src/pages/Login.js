import React, { useState } from "react";
import Hero from "../assets/images/loginBack.jpg";
import { FaCheckSquare } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the POST request to your API
    const response = await fetch(
      "https://event-management-platform-assignment.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json(); // Parse the response JSON
      const { user, cookie } = data; // Assuming your API returns a 'cookie' field

      // Save sessionToken to localStorage
      localStorage.setItem("sessionToken", user.authentication.sessionToken);
      localStorage.setItem("userId", user._id);

      // Handle cookie if needed (not recommended for security reasons, see note below)
      if (cookie) {
        document.cookie = `GHOST-AUTH=${cookie}`;
      }

      toast.success("Successfully Logged!");
      navigate("/");
    } else {
      toast.error("Can't log in!");
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
        <div class="min-w-[320px] max-h-[490px] md:w-[551px] h-[561px] bg-white rounded-md relative flex flex-col items-center pt-10">
          <Link to={"/"}>
            <div class="w-11 h-11 bg-someWhite text-black absolute top-[-25px] right-[-22px] flex justify-center items-center  rounded-full text-1xl cursor-pointer">
              x
            </div>
          </Link>
          <div className="md:w-96">
            <div className="flex flex-col items-center">
              <p className="font-bold text-5xl">Welcome.</p>
              <p className="text-grey text-lg">Please Login</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="border-b-2 md:w-96 mt-10">
                <p className="font-bold text-sm">Email</p>
                <input
                  type="text"
                  placeholder="example.email@gmail.com"
                  className="w-full outline-none border-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="border-b-2 md:w-96 mt-5">
                <p className="font-bold text-sm">Password</p>
                <input
                  type="password"
                  placeholder="Enter at least 8+ characters"
                  className="w-full outline-none border-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Sign In
                </button>
              </div>
            </form>
            <div className="flex flex-col md:flex-row md:justify-center items-center mt-5">
              <p className="text-sm text-someBlack">
                You don’t have an account?
              </p>
              <Link to={"/register"} className="font-bold text-sm text-primary">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
