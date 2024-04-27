import React, { useState, useEffect } from "react";
import Hero from "../../assets/images/hero.png";
import image5 from "../../assets/images/hero3.jpeg";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaHeart,
  FaShare,
  FaCalendar,
  FaLocationArrow,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";

function BodySingle() {
  const { eventId } = useParams(); // Extract eventId from params
  console.log("eventId is: ", eventId);
  const [eventData, setEventData] = useState(null);
  const [count, setCount] = useState(1); // Initial count is 1
  const pricePerTicket = 90;
  const bookingDate = new Date().toISOString();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://event-management-platform-assignment.onrender.com/events/${eventId}`, // Use eventId from params in the URL
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setEventData(data.event);
        } else {
          console.error("Failed to fetch event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]); // Add eventId to the dependency array

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      eventId: eventId, // Use eventId from params
      numberOfTickets: count,
      bookingDate: bookingDate,
    };

    try {
      const sessionToken = localStorage.getItem("sessionToken");

      if (!sessionToken) {
        // Handle case where sessionToken is not available
        console.error("Session token not found");
        toast.error("Session token not found");
        return;
      }
      console.log(sessionToken);
      const response = await fetch(
        "https://event-management-platform-assignment.onrender.com/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`, // Include the sessionToken in the Authorization header
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        // Handle success
        console.log("Booking successful");
        toast.success("Booking successful");
      } else {
        // Handle error
        console.error("Booking failed now");
        toast.error("Booking failed now");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:", error);
    }
  };
  

  return (
    <div className="w-full">
      {eventData && (
        <div>
          <div className="h-[300px] md:h-[469px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center object-cover"
              style={{ backgroundImage: `url(${Hero})` }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-center items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="w-[350px] md:min-w-[1176px] h-[260px] md:h-[250px] bg-white rounded-md flex flex-col items-center">
                <p className="font-bold text-sm mt-5 md:mt-10">
                  {new Date(eventData.date).toLocaleDateString()}
                </p>
                <p className="font-bold text-3xl md:text-4xl text-primary mt-2 md:mt-5">
                  {eventData.title}
                </p>
                <p className="text-grey text-sm mt-2 md:mt-5">
                  {eventData.description}
                </p>
                <div className="flex justify-center items-center gap-5 mt-2 md:mt-5">
                  <div className="w-24 h-9 rounded-xl flex justify-center items-center gap-1 bg-colorTwo">
                    <FaHeart className="text-white" />{" "}
                    <p className="text-white">
                      {eventData.likes ? eventData.likes : "345"}
                    </p>
                  </div>
                  <div className="w-24 h-9 rounded-xl flex justify-center items-center gap-1 bg-primary">
                    <FaShare className="text-white" />{" "}
                    <p className="text-white">
                      {eventData.shares ? eventData.shares : "124"}
                    </p>
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
                      <p className="text-grey text-sm">
                        {new Date(eventData.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-20 flex gap-3 mt-5">
                  <div className="bg-someWhite w-20 h-full flex justify-center items-center rounded-md">
                    <FaLocationArrow />
                  </div>
                  <div className="w-15 h-full flex flex-col justify-between">
                    <p className="font-semibold text-base text-someBlack">
                      Place
                    </p>
                    <div>
                      <p className="text-grey text-sm">{eventData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[730px] h-[279px] bg-green-500 mt-5">
                <img
                  src={eventData.profile || image5}
                  alt="Event Profile"
                  className="w-full h-full"
                />
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
                      <p className="text-grey text-sm">
                        {eventData.duration ? eventData.duration : "5 hours"}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-20 flex gap-3 mt-5">
                  <div className="bg-someWhite w-20 h-full flex justify-center items-center rounded-md">
                    <FaTicketAlt />
                  </div>
                  <div className="w-15 h-full flex flex-col justify-around">
                    <p className="font-semibold text-base text-someBlack">
                      Ticket Available
                    </p>
                    <div>
                      <p className="text-grey text-sm">
                        {eventData.ticketAvailability
                          ? eventData.ticketAvailability
                          : "50 Tickets"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[730px] flex flex-col md:flex-row justify-between mt-5">
                <p className="text-base text-grey">{eventData.description}</p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[398px] h-[258px] bg-someWhite rounded-xl p-5 flex flex-col justify-evenly"
            >
              <div className="w-full h-[118px] bg-white px-5 flex flex-col justify-around">
                <p className="font-bold text-someBlack">Price</p>
                <div className="flex justify-between">
                  <p>
                    <span className="font-bold">
                      {eventData.price
                        ? eventData.price * count
                        : pricePerTicket * count}
                    </span>{" "}
                    {/* <span className="font-bold">{eventData.price * count}</span>{" "}
                    <span className="font-bold">{pricePerTicket * count}$</span>{" "} */}
                    <span className="font-normal">$/ Ticket</span>
                  </p>
                  <div className="flex">
                    <div
                      className="w-9 h-9 text-white rounded-full bg-grey flex justify-center items-center cursor-pointer"
                      onClick={handleDecrement}
                    >
                      -
                    </div>
                    <div className="w-9 h-9 flex justify-center items-center">
                      {count}
                    </div>
                    <div
                      className="w-9 h-9 text-white rounded-full bg-primary flex justify-center items-center cursor-pointer"
                      onClick={handleIncrement}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type={"submit"}
                  className={
                    "w-full h-[35px] bg-primary text-white cursor-pointer flex justify-center items-center rounded-md text-sm"
                  }
                >
                  Get ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BodySingle;
