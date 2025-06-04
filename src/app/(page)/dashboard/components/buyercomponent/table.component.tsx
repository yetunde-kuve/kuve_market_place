import React from "react";
import { FaArrowRight } from "react-icons/fa";

const orders = [
  {
    id: "#96459761",
    status: "IN PROGRESS",
    date: "May 20, 2025",
    price: "$1,500 (5 Products)",
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "May 20, 2025",
    price: "$80 (11 Products)",
  },
  {
    id: "#95214362",
    status: "CANCELED",
    date: "May 20, 2025",
    price: "$160 (3 Products)",
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "May 20, 2025",
    price: "$80 (1 Products)",
  },
  {
    id: "#51746385",
    status: "COMPLETED",
    date: "May 20, 2025",
    price: "$2,300 (2 Products)",
  },
  {
    id: "#51746385",
    status: "CANCELED",
    date: "May 20, 2025",
    price: "$70 (1 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "May 20, 2025",
    price: "$220 (1 Products)",
  },
];

const statusStyles = {
  "IN PROGRESS": "text-orange-500",
  COMPLETED: "text-green-600",
  CANCELED: "text-red-500",
} as any;

export default function RecentOrdersTable() {
  return (
    <div className="w-full p-4 border rounded-lg border-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-dashed">
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Recent Order</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-[#000222]">
          View All <FaArrowRight className="text-xs" />
        </button>
      </div>

      {/* Stretch the table full-width, ignoring padding */}
      <div className="mt-4 -mx-4">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 uppercase border border-[#E4E7E9] bg-[#F7FCFC]">
            <tr className="text-[12px] font-[500] text-[#000222]">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-dashed">
                <td className="px-4 py-2 text-[#191C1F] text-[14px] font-[400]">{order.id}</td>
                <td className={`px-4 py-2 font-medium text-[14px] ${statusStyles[order.status]}`}>
                  {order.status}
                </td>
                <td className="px-4 py-2 text-[14px] text-[#5F6C72] font-[400]">{order.date}</td>
                <td className="px-4 py-2 text-[14px] text-[#5F6C72] font-[400]">{order.price}</td>
                <td className="px-4 py-2">
                  <button className="flex items-center gap-1 text-sm font-medium text-[#000222]">
                    View Details <FaArrowRight className="text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
