import { CustomerOrder } from "../lib/types";
import Pagination from "./Pagination";

type Props = {
  orders: CustomerOrder[];
  ordersCount: number;
};
function OrdersTable({ orders, ordersCount }: Props) {
  const totalPage = Math.ceil(ordersCount / 10);

  return (
    <div>
      <div className="flex justify-center items-center align-middle mt-10 max-w-full">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-4 px-3 border-b border-gray-300">
                Customer Name
              </th>
              <th className="py-4 px-3 border-b border-gray-300">
                Total Items
              </th>
              <th className="py-4 px-3 border-b border-gray-300">
                Total Price
              </th>
              <th className="py-4 px-3 border-b border-gray-300">Order Date</th>
              <th className="py-4 px-3 border-b border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {orders.map((order) => (
              <tr key={order._id!.toString()}>
                <td className="py-4 px-3 text-center ">
                  {order.customer.map((c) => c.name)}
                </td>
                <td className="py-4 px-3 text-center ">{order.items.length}</td>
                <td className="py-4 px-3 text-center ">
                  ${order.subtotal.toFixed(2)}
                </td>
                <td className="py-4 px-3 text-center ">
                  {order.orderTime.toISOString().split("T")[0]}
                </td>
                <td className={`py-4 px-3 text-center flex justify-center `}>
                  <p
                    className={`w-20 rounded-full font-semibold ${
                      order.status === "paid"
                        ? "bg-green-400 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-400 text-yellow-700"
                        : "bg-red-400 text-red-700"
                    }`}
                  >
                    {order.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPage} />
    </div>
  );
}

export default OrdersTable;
