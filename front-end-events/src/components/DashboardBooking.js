import React, { useState, useEffect } from 'react';
import CustomButton from "./CustomButton";
import { Table, Button, Space, Modal } from 'antd';

const Bookings = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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

  const handleUpdate = (record) => {
    setSelectedBooking(record);
    setIsUpdateModalVisible(true);
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

  return (
    <div className="mt-10">
      <Table columns={columns} dataSource={bookingsData} className="overflow-hidden"/>

      <Modal
        title="Update Booking"
        visible={isUpdateModalVisible}
        onOk={handleUpdateConfirm}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        {/* Add form or input fields for updating booking */}
        {/* For example: */}
        {/* <input type="text" value={selectedBooking.numberOfTickets} onChange={(e) => setSelectedBooking({ ...selectedBooking, numberOfTickets: e.target.value })} /> */}
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
