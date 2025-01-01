import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { useEffect } from "react";

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      console.log("going for useeffect");
      getDashData();
      console.log(dashData);
    }
  }, [aToken]);
  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.people_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.entries}
            </p>
            <p className="text-gray-400">Entries</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.delivery}
            </p>
            <p className="text-gray-400">Deliveries</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.add_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.takeaway}
            </p>
            <p className="text-gray-400">Takeaways</p>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments?.map((item, index) => (
            <div
              className="flex items-center px-6 py-3 hover:bg-gray-100"
              key={index}
            >
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.fullname}</p>
              </div>
              {item.category == "takeaway" ? (
                <p className="text-red-400 text-xs font-medium">
                  Takeaway | Rs. {item.amount}
                </p>
              ) : (
                <p className="text-green-500 text-xs font-medium">
                  Delivery | Rs. {item.amount}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
