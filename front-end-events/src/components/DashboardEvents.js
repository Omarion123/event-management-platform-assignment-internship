import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { Space, Table, Tag } from "antd";
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { toast } from "react-toastify";

function DashboardEvents() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { TextArea } = Input;
  const [form] = useForm();

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

  const showModalCreateEvent = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
    // Logic to handle form submission (e.g., API call to create a new event)
  };

  const handleOk = async () => {
    try {
      const formData = new FormData(); // Create a new FormData object

      // Append form data to the FormData object
      formData.append("title", form.getFieldValue("title"));
      formData.append("date", form.getFieldValue("date"));
      formData.append("location", form.getFieldValue("location"));
      formData.append(
        "ticketAvailability",
        form.getFieldValue("ticketAvailability")
      );
      formData.append("organizer", form.getFieldValue("organizer"));
      formData.append("profile", form.getFieldValue("profile").file);
      formData.append("description", form.getFieldValue("description"));

      const sessionToken = localStorage.getItem("sessionToken");

      const response = await fetch(
        "https://event-management-platform-assignment.onrender.com/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
          body: formData, // Pass the FormData object as the body
        }
      );

      if (response.ok) {
        console.log("Event created successfully");
        toast.success("Event created successfully");
        handleCancel(); // Close the modal after successful creation
      } else {
        console.error("Failed to create event");
        toast.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:", error.message || "Something went wrong");
    }
  };

  return (
    <div className="pl-5 pr-5 mt-10">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-3xl">Events</p>
        <div onClick={showModalCreateEvent}>
          <CustomButton style={"w-[150px !px-5]"}>New Event</CustomButton>
        </div>
      </div>
      <div className="mt-10">
        <Table
          columns={columns}
          dataSource={eventsData}
          className="overflow-hidden"
        />
      </div>
      <Modal
        title="Update Event"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {selectedEvent && <p>Event ID: {selectedEvent._id}</p>}
      </Modal>
      <Modal
        title="Event creation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} //
      >
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter event title"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter event location"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ticketAvailability"
              className="block text-sm font-medium text-gray-700"
            >
              Ticket Availability
            </label>
            <input
              type="number"
              id="ticketAvailability"
              name="ticketAvailability"
              placeholder="Enter ticket availability"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="organizer"
              className="block text-sm font-medium text-gray-700"
            >
              Organizer
            </label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              placeholder="Enter organizer name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profile"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profile"
              name="profile"
              accept="image/*"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter event description"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default DashboardEvents;
