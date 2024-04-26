import React from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";

function DashboardMain() {
  return (
    <div className="grid grid-col-1 lg:grid-cols-4 md:grid-cols-2  gap-5">
      <DashCard
        icon={<PiCurrencyDollarBold />}
        amount="$ 5,000"
        desc="Revenue"
      />
      <DashCard
        icon="cash"
        amount="$ 5,000"
        desc="Tickets Sold"
        iconbg="#FFC107"
      />
      <DashCard
        icon="cash"
        amount="$ 5,000"
        desc="Tickets Sold"
        styles="bg-[#FFEBB0] border-[#FFC107]"
        iconbg="bg-[#FFC107]"
        textStyle="text-white"
      />
      <DashCard icon="cash" amount="$ 5,000" desc="Revenue" />
    </div>
  );
}

const DashCard = ({ styles, icon, amount, desc, iconbg, textStyle }) => {
  return (
    <div
      className={`${styles}  bg-[#F4F5FB] border-2 border-[#C5CBEB] rounded-md  py-5`}
    >
      <div className="flex items-center justify-center flex-col gap-3">
        <div>
          <div
            className={`${iconbg} w-10 h-10 bg-primary rounded-full text-white flex items-center justify-center size-5 `}
          >
            {icon}
          </div>
        </div>
        <div>
          <h1
            className={`${textStyle} text-3xl font-semibold text-[#3F51B5] text-center`}
          >
            {amount}
          </h1>
        </div>
        <div>
          <h2 className="font-bold text-[#323743] text-center">{desc}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
