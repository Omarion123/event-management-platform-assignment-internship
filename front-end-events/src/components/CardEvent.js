import React from 'react';
import { FaCalendar, FaLocationArrow } from 'react-icons/fa'; 

const Card = ({ RunImage, title, availableTickets, date, location }) => {
  return (
    <div className="md:w-[376px] h-[353px] rounded-md border cursor-pointer">
      <img src={RunImage} className="h-[207px] w-full" alt={title} />
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-base">{title}</h1>
          <h1 className="text-sm text-primary">Available Tickets: {availableTickets}</h1>
        </div>
        <div className="flex justify-start items-center mt-4 gap-3 text-primary font-bold">
          <FaCalendar />
          <h1>{date}</h1>
        </div>
        <div className="flex justify-start items-center mt-4 gap-3 text-grey">
          <FaLocationArrow />
          <h1>{location}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
