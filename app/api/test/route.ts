import { getCollection } from "@/app/lib/data";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getCollection("orders");
    const data = await products
      .aggregate([
        { $match: { status: "paid" } },
        {
          $group: {
            _id: { $month: "$ordertTime" },
            Revenue: { $sum: "subtotal" },
          },
        },
        // { $sort: { _id: 1 } },
      ])
      .toArray();
    // const sales = data.reduce((cur, acc) => cur + acc.soldCount, 0);
    // console.log(sales);
    //   const data = await tours
    //     .find({ year: { $gte: 2000 }, "imdb.rating": { $gte: 8 } })
    //     .project({ title: 1, "imdb.rating": 1 })
    //     .toArray();
    // const data = await tours
    //   .find({ genres: { $all: ["Drama"] } })
    //   .limit(20)
    //   .toArray();
    // const data = await tours.find({}).toArray();

    // const data = await products
    //   .aggregate([
    //   {
    //     $match: {
    //       "imdb.rating": { $gte: 8 },
    //       year: { $gte: 1990, $lte: 2000 },
    //     },
    //   },
    //   {
    //     $match: {
    //       $or: [{ "imdb.rating": 8 }, { "imdb.rating": 9 }],
    //       year: { $gte: 1990, $lte: 2000 },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$imdb.rating",
    //       count: { $sum: 1 },
    //       movies: {
    //         $push: {
    //           title: "$title",
    //           year: "$year",
    //           rating: "$imdb.rating",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $sort: { title: 1 },
    //   },
    //   {
    //     $group: {
    //       _id: "$rated",
    //       rating: { $first: "$rated" },
    //       totalRuntime: { $sum: "$runtime" },
    //       count: { $sum: 1 },
    //       movies: {
    //         $push: "$title",
    //       },
    //     },
    //   },
    //   {
    //     $limit: 2,
    //   },
    //   {
    //     $lookup: {
    //       from: "comments",
    //       localField: "_id",
    //       foreignField: "movie_id",
    //       as: "comments",
    //     },
    //   },
    // {
    //   $unwind: "$genres",
    // },
    //   {
    //     $match: {
    //       user_id: "u1234",
    //     },
    //   },
    //   { $unwind: "$items" },
    //   {
    //     $group: {
    //       _id: "$user_id",
    //       totalQty: { $sum: "$items.qty" },
    //     },
    //   },
    // ])

    // .toArray();
    //   const all = data[0].count + data[1].count;

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error", error: error.message },
        { status: 500 }
      );
    }
  }
}

// export async function POST() {
//   const products = await getCollection("orders");
//   const data = products.insertMany(ordersData);

//   return NextResponse.json({ status: "success", data }, { status: 201 });
// }
