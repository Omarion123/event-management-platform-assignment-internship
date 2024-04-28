import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { Space, Table } from "antd";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";

function DashboardEvents() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    ticketAvailability: "",
    organizer: "",
    profile: null, // File will be stored here
    description: "",
  });
  // console.log("formData are: ", formData);
  console.log("Event id is: ", eventId);

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

  const showModalDelete = () => {
    setOpen(true);
  };
  const hideModalDeleteWithoutDelete = () => {
    setOpen(false);
  };
  const hideModalDelete = async (e) => {
    e.preventDefault();
    const sessionToken = localStorage.getItem("sessionToken"); // Get sessionToken from localStorage

    try {
      const response = await fetch(
        `https://event-management-platform-assignment.onrender.com/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionToken}`, // Include Authorization header with Bearer token
          },
        }
      );

      if (response.ok) {
        // Handle successful deletion
        toast.success("Event deleted successfully!");
        setOpen(false); // Close modal
        window.location.reload();
      } else {
        // Handle deletion failure
        const data = await response.json();
        console.error("Error deleting event:", data.message);
        toast.error("Error deleting event");
        setOpen(false); // Close modal
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
      setOpen(false); // Close modal
    }
  };

  const handleDelete = (record) => {
    // Logic to delete the event
    setEventId(record._id);
    showModalDelete();
  };

  const handleUpdate = (record) => {
    // Logic to update the event
    console.log("Updating event:", record);
    setSelectedEvent(record);
    setEventId(record._id);
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
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile: file,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const url =
      "https://event-management-platform-assignment.onrender.com/events";
    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const sessionToken = localStorage.getItem("sessionToken");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${sessionToken}`, // Add Authorization header with Bearer token
        },
      });

      if (response.ok) {
        // Handle success
        console.log("Event created successfully!");
        toast.success("Event created successfully!");
        setIsModalOpen(false);
        window.location.reload();
      } else {
        // Handle error
        console.error("Error creating event");
        toast.error("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const handleFormSubmitEdit = async (e) => {
    e.preventDefault();

    const url = `https://event-management-platform-assignment.onrender.com/events/${eventId}`;
    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const sessionToken = localStorage.getItem("sessionToken");

    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${sessionToken}`, // Add Authorization header with Bearer token
        },
      });

      if (response.ok) {
        // Handle success
        console.log("Event created successfully!");
        toast.success("Event created successfully!");
        setIsModalOpen(false);
        window.location.reload();
      } else {
        // Handle error
        console.error("Error creating event");
        toast.error("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="pl-5 pr-5 mt-10">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-3xl">Events</p>
        <div className="inline-block" onClick={showModalCreateEvent}>
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
        <form onSubmit={handleFormSubmitEdit} className="max-w-md mx-auto">
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
              value={formData.title}
              onChange={handleInputChange}
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
              value={formData.date}
              onChange={handleInputChange}
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
              value={formData.location}
              onChange={handleInputChange}
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
              value={formData.ticketAvailability}
              onChange={handleInputChange}
              placeholder="Enter ticket availability"
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
              onChange={handleFileChange}
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
              value={formData.description}
              onChange={handleInputChange}
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
              value={formData.title}
              onChange={handleInputChange}
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
              value={formData.date}
              onChange={handleInputChange}
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
              value={formData.location}
              onChange={handleInputChange}
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
              value={formData.ticketAvailability}
              onChange={handleInputChange}
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
              value={formData.organizer}
              onChange={handleInputChange}
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
              onChange={handleFileChange}
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
              value={formData.description}
              onChange={handleInputChange}
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
      <Modal
        title="Deleting Event!"
        open={open}
        onOk={hideModalDelete}
        onCancel={hideModalDeleteWithoutDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure to delete this event?</p>
      </Modal>
    </div>
  );
}

export default DashboardEvents;
