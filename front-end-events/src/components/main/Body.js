import React from "react";
import CustomButton from "../CustomButton";
import RunImage from "../../assets/images/hero2.jpg";
import image1 from '../../assets/images/hero.jpeg'
import image2 from '../../assets/images/hero.png'
import image3 from '../../assets/images/hero1.jpg'
import image4 from '../../assets/images/hero2.jpg'
import image5 from '../../assets/images/hero3.jpeg'
import Card from "../CardEvent";

function Body() {
  return (
    <div className="p-5 md:pr-40 md:pl-40">
      <div className="flex justify-between">
        <p className="font-bold text-3xl">Events</p>
        <CustomButton style="bg-white text-someBlack border text-[13px]">
          View more
        </CustomButton>
      </div>
      <div className="flex flex-col gap-5 mt-5 md:flex-row md:justify-between md:flex-wrap">
        <Card
          RunImage={RunImage}
          title="Urban Marathon"
          availableTickets="100"
          date="Saturday, July 15 | 5:00 PM"
          location="Central Park, NY"
        />
        <Card
          RunImage={image1}
          title="Art Auction Gala"
          availableTickets="50"
          date="Friday, August 10 | 7:00 PM"
          location="Metropolitan Museum, NY"
        />
        <Card
          RunImage={image2}
          title="Outdoor Movie Night"
          availableTickets="200"
          date="Sunday, September 5 | 8:00 PM"
          location="Downtown Square, LA"
        />
        <Card
          RunImage={image3}
          title="Rock Concert Series"
          availableTickets="80"
          date="Saturday, October 20 | 6:30 PM"
          location="Hollywood Bowl, CA"
        />
        <Card
          RunImage={image4}
          title="Vintage Cars Auction"
          availableTickets="30"
          date="Thursday, November 15 | 6:00 PM"
          location="Convention Center, Miami"
        />
        <Card
          RunImage={image5}
          title="Classic Movie Marathon"
          availableTickets="150"
          date="Sunday, December 10 | 4:00 PM"
          location="City Park Amphitheater, Chicago"
        />
      </div>
    </div>
  );
}

export default Body;
