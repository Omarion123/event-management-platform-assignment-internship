import React from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoMdCall } from "react-icons/io";

function CTA() {
  return (
    <div className="bg-white py-10 px-6 flex flex-col items-center justify-center">
      <p className="text-[25px] text-primary mb-6 text-center font-bold ">
        Can’t find what you are looking for ?
      </p>
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-24">
        <div className="flex gap-3">
          <div className="w-[48px] h-[48px] bg-secondary rounded-[50%] border-solid border-black border-[1px] flex items-center justify-center">
            <HiOutlineEnvelope className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-xl">Contact us</p>
            <p>info@hova.ai</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-[48px] h-[48px] bg-secondary rounded-[50%] border-solid border-black border-[1px] flex items-center justify-center">
            <IoMdCall className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-xl">Call us</p>
            <p>+250793090500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
