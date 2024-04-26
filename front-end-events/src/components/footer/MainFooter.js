import React from "react";
import Icon from "../../assets/images/Image 384.svg";
import Brand from "../../assets/images/YourEvent.svg";
import { FaEnvelope } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
function MainFooter() {
  return (
    <div className="bg-someBlack text-white p-5 md:pr-40 md:pl-40">
      <div className="min-h-60 md:flex justify-between gap-10">
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
          <p className="pt-5">
            For product announcements and exclusive insights
          </p>
          <div>
            <div className="h-[35px] w-[285px] flex justify-start items-center border border-green-500 pl-4 rounded-md mt-2">
              <FaEnvelope className="h-[15px]" />
              <CustomInput
                type="text"
                placeholder="Input your email"
              />
            </div>
            <CustomButton style="mt-2 mb-2 w-[114px]">Subscribe</CustomButton>
          </div>
        </div>
      </div>
      <div className="min-h-[60px] border-t-2 flex flex-col items-center md:flex-row md:justify-between">
        <select
          name="languages"
          id="languages"
          className="bg-transparent h-[35px] w-[199px] flex justify-between items-center border border-green-500 pl-4 rounded-md mt-2"
        >
          <option className="bg-transparent text-primary" value="volvo">
            English
          </option>
          <option className="bg-transparent text-primary" value="saab">
            French
          </option>
          <option className="bg-transparent text-primary" value="mercedes">
            Kinyarwanda
          </option>
          <option className="bg-transparent text-primary" value="audi">
            Swahili
          </option>
        </select>
        <ul className="mt-3 md:flex justify-between gap-3">
          <li>© 2022 Brand, Inc.</li>
          <li className="flex items-center gap-3">
            <div>
              <FaStar />
            </div>
            <div>Privacy</div>
          </li>
          <li className="flex items-center gap-3">
            <div>
              <FaStar />
            </div>
            <div>Terms</div>
          </li>
          <li className="flex items-center gap-3">
            <div>
              <FaStar />
            </div>
            <div>Sitemap</div>
          </li>
        </ul>

        <div className="flex mt-5 md:w-[120px]">
          <div className="h-5 w-20 flex justify-center items-center">
            <FaTwitter />
          </div>
          <div className="h-5 w-20 flex justify-center items-center">
            <FaFacebook />
          </div>
          <div className="h-5 w-20 flex justify-center items-center">
            <FaLinkedin />
          </div>
          <div className="h-5 w-20 flex justify-center items-center">
            <FaYoutube />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
