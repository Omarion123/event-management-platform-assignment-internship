import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { Space, Table, Tag, Button, Modal } from "antd";

function DashboardEvents() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("https://event-management-platform-assignment.onrender.com/events")
      .then((response) => response.json())
      .then((data) => {
        setEventsData(data.events);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (record) => {
    // Logic to delete the event
    console.log("Deleting event:", record);
  };

  const handleUpdate = (record) => {
    // Logic to update the event
    console.log("Updating event:", record);
    setSelectedEvent(record);
    setShowModal(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <a href={record.profile}>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Ticket Availability",
      dataIndex: "ticketAvailability",
      key: "ticketAvailability",
    },
    {
      title: "Organizer",
      dataIndex: ["organizer", "username"],
      key: "organizer",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="pl-5 pr-5 mt-10">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-3xl">Events</p>
        <div>
          <CustomButton style={"w-[150px !px-5]"}>New Event</CustomButton>
        </div>
      </div>
      <div className="mt-10">
        <Table columns={columns} dataSource={eventsData} className="overflow-hidden" />
      </div>
      <Modal
        title="Update Event"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {selectedEvent && <p>Event ID: {selectedEvent._id}</p>}
      </Modal>
    </div>
  );
}

export default DashboardEvents;
