import React from "react";
import Hero from "../../assets/images/hero.png";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import {
  FaCalendar,
  FaLocationArrow,
  FaClock,
  FaTicketAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import image5 from "../../assets/images/hero3.jpeg";
import CustomButton from "../CustomButton";

function BodySingle() {
  const heroStyle = {
    backgroundImage: `url(${Hero})`,
    backgroundSize: "cover",
    filter: "brightness(30%) contrast(70%)",
  };
  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity as needed
  };
  return (
    <div className="w-full">
      <div>
        <div className="h-[300px] md:h-[469px] relative">
          <div
            style={heroStyle}
            className="absolute inset-0 bg-cover bg-center object-cover"
          />
          <div
            style={overlayStyle}
            className="absolute inset-0 flex flex-col justify-center items-center"
          >
            <div className="w-[350px] md:min-w-[1176px] h-[260px] md:h-[250px] bg-white rounded-md flex flex-col items-center">
              <p className="font-bold text-sm mt-5 md:mt-10">February 20 </p>
              <p className="font-bold text-3xl md:text-4xl text-primary mt-2 md:mt-5">
                Rock Revolt: A Fusion of Power and Passion
              </p>
              <p className="text-grey text-sm mt-2 md:mt-5">
                Rock Revolt: A Fusion of Power and Passion" is an electrifying
                rock music event that brings together a diverse lineup of
                talented rock bands and artists
              </p>
              <div className="flex justify-center items-center gap-5 mt-2 md:mt-5">
                <div className="w-24 h-9 rounded-xl flex justify-center items-center gap-1 bg-colorTwo">
                  <FaHeart className="text-white" />{" "}
                  <p className="text-white">345</p>
                </div>
                <div className="w-24 h-9 rounded-xl flex justify-center items-center gap-1 bg-primary">
                  <FaShare className="text-white" />{" "}
                  <p className="text-white">124</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 md:pr-40 md:pl-40 flex flex-col md:flex md:flex-row md:justify-between">
        <div>
          <div>
            <p className="font-bold text-2xl">Timing and location</p>
          </div>
          <div className="w-full md:w-[730px] flex flex-col md:flex-row justify-between">
            <div className="h-20 flex gap-3 mt-5">
              <div className="bg-someWhite w-20 h-full flex justify-center items-center rounded-md">
                <FaCalendar />
              </div>
              <div className="w-15 h-full flex flex-col justify-between">
                <p className="font-semibold text-base text-someBlack">
                  Date and time
                </p>
                <div>
                  <p className="text-grey text-sm">Saturday, February 20</p>
                  <p className="text-grey text-sm">08:00 PM</p>
                </div>
              </div>
            </div>
            <div className="h-20 flex gap-3 mt-5">
              <div className="bg-someWhite w-20 h-full flex justify-center items-center rounded-md">
                <FaLocationArrow />
              </div>
              <div className="w-15 h-full flex flex-col justify-between">
                <p className="font-semibold text-base text-someBlack">Place</p>
                <div>
                  <p className="text-grey text-sm">Saturday, February 20</p>
                  <p className="text-grey text-sm">08:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[730px] h-[279px] bg-green-500 mt-5">
            <img src={image5} className="w-full h-full" />
          </div>
          <p className="font-bold text-2xl mt-5">About event</p>
          <div className="w-full md:w-[730px] flex flex-col md:flex-row justify-between">
            <div className="h-20 flex gap-3 mt-5">
              <div className="bg-someWhite w-20 h-full flex justify-center items-center rounded-md">
                <FaClock />
              </div>
              <div className="w-15 h-full flex flex-col justify-around">
                <p className="font-semibold text-base text-someBlack">
                  Duration
                </p>
                <div>
                  <p className="text-grey text-sm">5 hours</p>
                </div>
              </div>
            </div>
            <div className="h-20 flex gap-3 mt-5">
              <div className="bg-someWhite w-20 h-full flex justify-center items-center rounded-md">
                <FaTicketAlt />
              </div>
              <div className="w-15 h-full flex flex-col justify-around">
                <p className="font-semibold text-base text-someBlack">Ticket</p>
                <div>
                  <p className="text-grey text-sm">Email eTicket</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[730px] flex flex-col md:flex-row justify-between mt-5">
            <p className="text-base text-grey">//here should be description
              Rock Revolt: A Fusion of Power and Passion" is an electrifying
              rock music event that brings together a diverse lineup of talented
              rock bands and artists. The event aims to showcase the raw energy,
              intense power...
            </p>
          </div>
        </div>
        <div className="w-full md:w-[398px] h-[258px] bg-someWhite rounded-xl p-5 flex flex-col justify-evenly">
          <div className="w-full h-[118px] bg-white px-5 flex flex-col justify-around">
            <p className="font-bold text-someBlack">Price</p>
            <div className="flex justify-between">
                <p>
                  <span className="font-bold">$ 90</span>{" "}
                  <span className="font-normal">/ Ticket</span>
                </p>
                <div className="flex">
                    <div className="w-9 h-9 text-white rounded-full bg-grey flex justify-center items-center cursor-pointer">-</div>
                    <div className="w-9 h-9 flex justify-center items-center">2</div>
                    <div className="w-9 h-9 text-white rounded-full bg-primary flex justify-center items-center cursor-pointer">+</div>
                </div>
            </div>
          </div>
          <div>
            <CustomButton style={"w-full"}>Get ticket</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodySingle;