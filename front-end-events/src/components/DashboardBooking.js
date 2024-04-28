import React, {useState, useEffect} from "react";
import CustomButton from "./CustomButton";
import { Space, Table, Tag } from "antd";

function DashboardBooking() {
  const [bookingsData, setBookingsData] = useState([]);
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');

    if (!sessionToken) {
      console.error("Session token not found in localStorage.");
      return;
    }

    fetch("https://event-management-platform-assignment.onrender.com/bookingsadmin", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookingsData(data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
  }, []);
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Number of Tickets",
      dataIndex: "numberOfTickets",
      key: "numberOfTickets",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div className="pl-5 pr-5 mt-10">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-3xl">Booking</p>
        <div>
          <CustomButton style={"!w-[150px] !h-10"}>New Booking</CustomButton>
        </div>
      </div>
      <div className="mt-10">
      <Table columns={columns} dataSource={bookingsData} className="overflow-hidden"/>
    </div>
    </div>
  );
}

export default DashboardBooking;
