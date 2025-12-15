import { Document, ObjectId, WithId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import {
  BestSellingData,
  BestSellingRecord,
  Order,
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
