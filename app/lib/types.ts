import { ObjectId } from "mongodb";

export type Product = {
  _id?: ObjectId;
  title: string;
  price: number;
  soldCount: number;
  images: string[];
};

export type OrderItem = { productId: ObjectId; qty: number; unitPrice: number };

export type Order = {
  _id?: ObjectId;
  purchasedBy: ObjectId;
  status: "pending" | "paid" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  orderTime: Date;
};

export type Customer = {
  _id?: ObjectId;
  name: string;
  email: string;
};
export type CustomerOrder = { customer: Customer[] } & Order;

export type SalesRecord = {
  _id: number;
  sellsCount: number;
};

export type SalesData = SalesRecord[];

export type BestSellingRecord = {
  title: string;
  soldCount: number;
};

export type Statistics = {
  _id: number;
  revenue: number;
  totalOrder: number;
};
export type RevenueAndOrder = {
  _id: number;
  revenue: number;
  totalOrder: number;
};
