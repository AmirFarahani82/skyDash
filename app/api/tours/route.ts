import { getTours } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getTours();

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { status: 500, error: error.message },
      { status: 500 }
    );
  }
}
