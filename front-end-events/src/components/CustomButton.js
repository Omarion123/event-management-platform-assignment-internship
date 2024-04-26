import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({ to, style, children }) => {
  return (
    <Link to={to} className={`${style} w-[71px] h-[35px] bg-primary text-white cursor-pointer flex justify-center items-center rounded-md text-sm`}>
      {children}
    </Link>
  );
};

export default CustomButton;
