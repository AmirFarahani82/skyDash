import OrdersFilter from "../components/OrdersFilter";
import OrdersTable from "../components/OrdersTable";
import { getOrders } from "../lib/data";
type Props = {
  searchParams: Promise<{ status: string }>;
};
async function page({ searchParams }: Props) {
  const { status } = await searchParams;

  const orders = await getOrders(status);
  return (
    <div className="h-full relative">
      <h2 className="text-2xl">All orders between 2025-01-01 and 2025-12-31</h2>
      <OrdersFilter />
      <OrdersTable orders={orders} />
    </div>
  );
}

export default page;
