import { FaDollarSign } from "react-icons/fa";
import Card from "./Card";
import { FiBox } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { SalesBarChart } from "./SalesBarChart";
import { BestSellingRecord, SalesData } from "../lib/types";
import { getBestSellingProducts, getSalesPerMonth } from "../lib/data";
import BestSellingItems from "./BestSellingItems";

async function DashboardOverview() {
  const sales: SalesData = await getSalesPerMonth();
  const bestSelling: BestSellingRecord[] = await getBestSellingProducts();
  console.log(bestSelling, Array.isArray(bestSelling));
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
          amount={30000}
        />
        <Card title="Total orders" icon={<FiBox />} amount={480} />
        <Card title="Total Items Sold" icon={<MdSell />} amount={800} />
      </div>
      <div className="flex mt-3.5">
        <div className="w-[600px]">
          <SalesBarChart sales={sales} />
        </div>
        <div className="w-[350px] h-[350px]">
          <BestSellingItems bestSelling={bestSelling} />
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
