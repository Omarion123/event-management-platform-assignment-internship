import React from "react";
import Icon from "../../assets/images/Image 384.svg";
import Brand from "../../assets/images/YourEvent.svg";
import image2 from "../../assets/images/hero.png";
import { FaBell } from "react-icons/fa";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const HeaderAfterLogin = () => {
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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          My booked events
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "4",
      danger: true,
      label: "Logout",
    },
  ];
  return (
    <div className="h-14 bg-secondaryWhite flex justify-between items-center pr-2 pl-2 md:pr-5 md:pl-5">
      <div className="flex items-center">
        <img src={Icon} className="h-[35px]" alt="Icon" />
        <img src={Brand} className="h-[20px]" alt="Brand" />
      </div>
      <div className="flex gap-2 md:gap-5 items-center">
        <FaBell className="cursor-pointer text-grey"/>
        <div className="w-9 h-9 rounded-full">
          <img src={image2} alt="profile" className="w-full h-full rounded-full cursor-pointer" />
        </div>
        <Dropdown
          menu={{
            items,
          }}
          className="cursor-pointer"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Amanda M.
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderAfterLogin;
