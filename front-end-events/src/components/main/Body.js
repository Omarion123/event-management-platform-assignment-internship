import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import Card from "../CardEvent";

function Body() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://event-management-platform-assignment.onrender.com/events",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);
  const handleCardClick = (eventId) => {
    // Construct the URL with the event._id as a parameter
    const url = `http://localhost:3000/single/${eventId}`;
    
    // Redirect to the constructed URL
    window.location.href = url;
  };
  

  return (
    <div className="p-5 md:pr-40 md:pl-40">
      <div className="flex justify-between">
        <p className="font-bold text-3xl">Events</p>
        <CustomButton style="bg-white text-someBlack border text-[13px]">
          View more
        </CustomButton>
      </div>
      <div className="flex flex-col gap-5 mt-5 md:flex-row md:justify-between md:flex-wrap">
        {events.map((event) => (
          <Card
            key={event._id}
            RunImage={event.profile} // Assuming profile field contains the event image
            title={event.title}
            availableTickets={event.ticketAvailability}
            date={new Date(event.date).toLocaleDateString()} // Format date as needed
            location={event.location}
            onClick={() => handleCardClick(event._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
