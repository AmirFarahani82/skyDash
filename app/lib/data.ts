import { Document, WithId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import {
  BestSellingRecord,
  CustomerOrder,
  RevenueAndOrder,
  SalesData,
  SalesRecord,
} from "./types";

export async function getCollection<T extends Document>(
  name: "products" | "orders" | "customers"
) {
  const client = await connectToDatabase();

  const db = client.db(process.env.MONGODB_DB);
  return db.collection<T>(name);
}
export async function overallStats() {
  const orders = await getCollection("orders");
  const data = await orders
    .aggregate([
      { $match: { status: "paid" } },

      {
        $facet: {
          orderStats: [
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$subtotal" },
                totalOrders: { $sum: 1 },
              },
            },
          ],
          itemsStats: [
            { $unwind: "$items" },
            {
              $group: {
                _id: null,
                totalSold: { $sum: "$items.qty" },
              },
            },
          ],
        },
      },
    ])
    .toArray();
  return {
    totalRevenue: data[0].orderStats[0]?.totalRevenue || 0,
    totalOrders: data[0].orderStats[0]?.totalOrders || 0,
    totalItemsSold: data[0].itemsStats[0]?.totalSold || 0,
  };
}
export async function getSalesPerMonth(): Promise<SalesData> {
  try {
    const orders = await getCollection("orders");
    const sales = await orders
      .aggregate<SalesRecord>([
        { $unwind: "$items" },
        {
          $group: {
            _id: { $month: "$orderTime" },

            sellsCount: {
              $sum: { $cond: [{ $eq: ["$status", "paid"] }, 1, 0] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return sales;
  } catch (error) {
    throw error;
  }
}
export async function getBestSellingProducts(): Promise<BestSellingRecord[]> {
  try {
    const products = await getCollection<WithId<BestSellingRecord>>("products");
    const data = await products
      .find({})
      .sort({ soldCount: -1 })
      .project<BestSellingRecord>({ _id: 0, title: 1, soldCount: 1 })
      .limit(3)
      .toArray();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function renevueAndOrderStats(): Promise<RevenueAndOrder[]> {
  const orders = await getCollection("orders");
  const data = await orders
    .aggregate<RevenueAndOrder>([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $group: {
          _id: {
            $month: "$orderTime",
          },
          revenue: {
            $sum: "$subtotal",
          },
          totalOrder: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    .toArray();
  return data;
}

export async function getOrders(
  status: string,
  page: string = "1"
): Promise<{ data: CustomerOrder[]; ordersCount: number }> {
  const orders = await getCollection("orders");
  const filter = status ? { $match: { status } } : { $match: {} };
  const limit = 10;

  const data: CustomerOrder[] = await orders
    .aggregate<CustomerOrder>([
      filter,
      { $sort: { orderTime: -1 } },
      { $skip: (Number(page) - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: "customers",
          localField: "purchasedBy",
          foreignField: "_id",
          as: "customer",
        },
      },
    ])
    .toArray();

  const ordersCount = status
    ? await orders.countDocuments({ status: status })
    : await orders.countDocuments();

  return { data, ordersCount };
}
