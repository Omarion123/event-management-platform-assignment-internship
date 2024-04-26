import React from 'react';

const CustomInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-transparent h-[15px] outline-none border-none pl-2"
    />
  );
};

export default CustomInput;
