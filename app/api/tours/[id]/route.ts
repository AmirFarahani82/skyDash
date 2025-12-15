import { getCollection } from "@/app/lib/data";
import { Tour } from "@/app/lib/types";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const tours = await getCollection<Tour>("tours");
  const tour = await tours.findOne({ _id: new ObjectId(id) });
  return NextResponse.json({ status: "success", data: tour }, { status: 200 });
}
