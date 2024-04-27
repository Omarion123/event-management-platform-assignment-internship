import React from "react";
import { FaBell } from "react-icons/fa";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

const HeaderAfterLogin = () => {
  // Retrieve username, profile, and sessionToken from localStorage
  const username = localStorage.getItem("username");
  const profile = localStorage.getItem("profile");
  const sessionToken = localStorage.getItem("sessionToken");

  // Get navigate function from react-router-dom
  const navigate = useNavigate();

  // Check if sessionToken is available
  const isLoggedIn = sessionToken !== null;

  // Function to handle logout
  const handleLogout = () => {
    // Clear items from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("profile");
    localStorage.removeItem("sessionToken");
    navigate("/");
    window.location.reload();
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Settings
        </a>
      ),
      disabled: true,
    },
    {
      key: "2",
      label: (
        <Link to="/userlist">
          My booked events
        </Link>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "4",
      danger: true,
      label: (
        <Link onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <div className="h-14 bg-secondaryWhite flex justify-between items-center pr-2 pl-2 md:pr-5 md:pl-5">
      <Link to="/">
        <div className="flex items-center">
          {/* Display Brand and Icon */}
        </div>
      </Link>
      <div className="flex gap-2 md:gap-5 items-center">
        <FaBell className="cursor-pointer text-grey" />
        <div className="w-9 h-9 rounded-full">
          {/* Display Profile Image */}
          {profile && <img src={profile} alt="profile" className="w-full h-full rounded-full cursor-pointer" />}
        </div>
        <Dropdown
          menu={{
            items,
          }}
          className="cursor-pointer"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {isLoggedIn ? (
                // Display Username if logged in
                <>{username}</>
              ) : (
                // Display "Sign In" link if not logged in
                <Link to="/login">Sign In</Link>
              )}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderAfterLogin;
