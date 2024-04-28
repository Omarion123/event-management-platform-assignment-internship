import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Table, Button, Space, Modal } from "antd";

const Bookings = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [formData, setFormData] = useState({
    "numberOfTickets": "",
    "bookingDate": "",
    "status": "",
  });

  console.log(formData);
  

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");

    if (!sessionToken) {
      console.error("Session token not found in localStorage.");
      return;
    }

    fetch(
      "https://event-management-platform-assignment.onrender.com/bookingsadmin",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBookingsData(data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (record) => {
    setSelectedBooking(record);
    setIsUpdateModalVisible(true);
    setBookingId(record._id);
  };

  const handleDelete = (record) => {
    setSelectedBooking(record);
    setIsDeleteModalVisible(true);
  };

  const handleUpdateConfirm = () => {
    // Add code to handle update logic here
    setIsUpdateModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    // Add code to handle delete logic here
    setIsDeleteModalVisible(false);
  };

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

  const handleFormSubmitEdit = async (e) => {
    e.preventDefault();

    const url = `https://event-management-platform-assignment.onrender.com/bookings/${bookingId}`;
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
        console.log("Booking updated successfully!");
        toast.success("Booking updated successfully!");
        isUpdateModalVisible(false);
        window.location.reload();
      } else {
        // Handle error
        console.error("Error updating booking");
        toast.error("Error updating booking");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="mt-10">
      <Table
        columns={columns}
        dataSource={bookingsData}
        className="overflow-hidden"
      />

      <Modal
        title="Update Booking"
        visible={isUpdateModalVisible}
        footer={null}
        onOk={handleUpdateConfirm}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        {/* Add form or input fields for updating booking */}
        {/* For example: */}
        {/* <input type="text" value={selectedBooking.numberOfTickets} onChange={(e) => setSelectedBooking({ ...selectedBooking, numberOfTickets: e.target.value })} /> */}
        <form onSubmit={handleFormSubmitEdit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              numberOfTickets
            </label>
            <input
              type="text"
              id="numberOfTickets"
              name="numberOfTickets"
              value={formData.numberOfTickets}
              onChange={handleInputChange}
              placeholder="Enter numberOfTickets"
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
              id="bookingDate"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ticketAvailability"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
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
        title="Delete Booking"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okButtonProps={{ danger: true }}
      >
        Are you sure you want to delete this booking?
      </Modal>
    </div>
  );
};

export default Bookings;
