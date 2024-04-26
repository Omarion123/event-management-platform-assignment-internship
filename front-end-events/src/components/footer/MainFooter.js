import React from "react";
import Icon from "../../assets/images/Image 384.svg";
import Brand from "../../assets/images/YourEvent.svg";
import { FaEnvelope  } from "react-icons/fa";
import CustomButton from "../CustomButton";
function MainFooter() {
  return (
    <div className="bg-someBlack text-white">
      <div className="min-h-96">
        <div>
          <div className="flex items-center">
            <img src={Icon} className="h-[30px]" alt="Icon" />
            <img src={Brand} className="h-[17px]" alt="Brand" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-1xl text-2xl">Categories</h1>
          <p className="pt-5 text-sm md:text-md">All</p>
          <p className=" text-sm md:text-md">Music</p>
          <p className=" text-sm md:text-md">Politics</p>
          <p className=" text-sm md:text-md">Sport</p>
          <p className=" text-sm md:text-md">Exibition</p>
        </div>
        <div>
          <h1 className="font-bold text-1xl text-2xl">Resources</h1>
          <p className="pt-5 text-sm md:text-md">User guides</p>
          <p className=" text-sm md:text-md">Help Center</p>
          <p className=" text-sm md:text-md">Partners</p>
          <p className=" text-sm md:text-md">Taxes</p>
        </div>
        <div>
          <h1 className="font-bold text-1xl text-2xl">Company</h1>
          <p className="pt-5 text-sm md:text-md">About us</p>
          <p className=" text-sm md:text-md">Join us</p>
          <p className=" text-sm md:text-md">Politics</p>
          <p className=" text-sm md:text-md">Sport</p>
          <p className=" text-sm md:text-md">Exibition</p>
        </div>
        <div>
          <h1 className="font-bold text-1xl text-2xl">Stay in the loop</h1>
          <p className="pt-5">For product announcements and exclusive insights</p>
          <div>
            <div className="h-[35px] w-[285px] flex justify-start items-center border border-green-500 pl-4 rounded-md mt-2">
              <FaEnvelope className="h-[15px]" />
              <input type="text" placeholder="Input your email" className="bg-transparent h-[15px] outline-none border-none pl-2 " />
            </div>
            <CustomButton style="mt-2 mb-2">Subscribe</CustomButton>
          </div>
        </div>
      </div>
      <div className="bg-yellow-500 h-[95px]"></div>
    </div>
  );
}

export default MainFooter;
