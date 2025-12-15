import { FaDollarSign } from "react-icons/fa";
import Card from "./Card";
import { FiBox } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { SalesBarChart } from "./SalesBarChart";
import { BestSellingRecord, SalesData } from "../lib/types";
import {
  getBestSellingProducts,
  getSalesPerMonth,
  overallStats,
  renevueAndOrderStats,
} from "../lib/data";
import BestSellingItems from "./BestSellingItems";
import RevenueAndOrders from "./RevenueAndOrders";

async function DashboardOverview() {
  const sales: SalesData = await getSalesPerMonth();
  const bestSelling: BestSellingRecord[] = await getBestSellingProducts();
  const { totalRevenue, totalOrders, totalItemsSold } = await overallStats();
  const revenueAndOrders = await renevueAndOrderStats();

  return (
    <div>
      <div className="flex justify-between items-center px-2.5 rounded-lg shadow-black/20 shadow-[0px_10px_20px]">
        <h2 className="text-2xl">Dashboard overview</h2>
        <p>from 2025-01-01 to 2025-12-30</p>
      </div>
      <div className="flex gap-4">
        <Card
          title="Total Revenue"
          icon={<FaDollarSign />}
          currency={true}
          data={totalRevenue}
        />
        <Card title="Total orders" icon={<FiBox />} data={totalOrders} />
        <Card
          title="Total Items Sold"
          icon={<MdSell />}
          data={totalItemsSold}
        />
      </div>
      <div className="flex mt-3.5">
        <div className="w-150">
          <SalesBarChart sales={sales} />
        </div>
        <div className="w-87.5 h-87.5">
          <BestSellingItems bestSelling={bestSelling} />
        </div>
      </div>
      <div>
        <RevenueAndOrders revenueAndOrders={revenueAndOrders} />
      </div>
    </div>
  );
}

export default DashboardOverview;
