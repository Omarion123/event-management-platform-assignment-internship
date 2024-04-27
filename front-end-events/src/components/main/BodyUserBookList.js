import React, { useState, useEffect } from "react";
import Hero from "../../assets/images/hero.png";
import CustomButton from "../CustomButton";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FaCalendar, FaLocationArrow } from "react-icons/fa";

function BodyUserBookList() {
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken) {
      console.error("Session token not found.");
      return;
    }

    fetch("https://event-management-platform-assignment.onrender.com/bookings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setBookingList(data.bookings);
        // Here you can use the fetched data directly
        // console.log("Fetched bookings:", data.bookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
    }, []);
    console.log("Fetched bookings:", bookingList);

  return (
    <div className="p-5 md:pr-40 md:pl-40">
      <div className="">
        <p className="font-bold text-3xl">My Tickets</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-[340px] h-[409px] bg-someWhite p-5 flex flex-col items-center rounded-lg mt-10">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full">
            <img src={Hero} className="w-full h-full rounded-full" />
          </div>
          <div className="mt-7">
            <p className="font-bold text-2xl text-primary">Amanda Smith</p>
            <p className="text-sm text-someBlack">Amanda@email.com</p>
          </div>
          <div className="w-full flex flex-col items-center md:flex-row md:justify-between mt-5">
            <CustomButton style={"bg-grey text-primary text-xs"}>
              24 Purchase
            </CustomButton>
            <CustomButton style={"bg-grey text-primary text-xs"}>
              4 Following
            </CustomButton>
            <CustomButton style={"bg-grey text-primary text-xs"}>
              10 likes
            </CustomButton>
          </div>
          <div className="w-full mt-5">
            <CustomButton style={"w-full gap-3"}>
              <FaEdit className="text-white" />
              Edit Profile
            </CustomButton>
          </div>
        </div>
        <div className="w-[350px] md:w-[759px] mt-10">
          <div>
            <CustomButton style={"bg-grey text-white text-xs"}>
              Upcoming
            </CustomButton>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5">
            <p>
              <span className="font-bold">4</span>events
            </p>
            <div className="w-full md:w-[381px] h-[35px] bg-someWhite rounded-lg flex items-center pl-3 gap-2">
              <FaSearch />
              <input
                type="text"
                placeholder="Search Event..."
                className="w-full h-full bg-transparent outline-none border-none"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col md:flex-row">
            <div className="w-[350px] md:w-[383px] h-[221px] bg-grey rounded-md">
              <img src={Hero} className="w-full h-full rounded-md" />
            </div>
            <div className="border border-someWhite w-full md:w-[383px] h-[300px] md:h-auto pl-5 flex flex-col justify-evenly">
              <div className="border-b-2 border-b-someWhite">
                <p className="font-bold text-primary text-[20px]">
                  February 20 | 08:00 PM
                </p>
                <p className="font-bold">
                  <span className="text-primary mt-3">2 Tickets</span> total
                  $162
                </p>
              </div>
              <div className="border-b-2 border-b-someWhite">
                <p className="font-bold text-sm text-someBlack mt-2">
                  Rock Revolt: Power and Passion Unite
                </p>
                <div className="flex items-center gap-3">
                  <FaCalendar className="text-grey" />
                  <p className="text-grey text-sm">
                    Saturday, February 20 | 08:00 PM
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FaLocationArrow className="text-grey" />
                  <p className="text-grey text-sm">New York, NY</p>
                </div>
              </div>
              <div>
                <CustomButton style={"bg-colorTwo text-xs w-[100px]"}>
                  Cancel Ticket
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyUserBookList;
