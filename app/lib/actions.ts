"use server";

import { revalidatePath } from "next/cache";
import { getCollection } from "./data";
import { Tour } from "./types";

export async function addTour(formData: FormData) {
  const name = formData.get("name")! as string;
  const price = Number(formData.get("price")!);
  const newTour: Tour = { name, price };

  const tours = await getCollection("tours");
  tours.insertOne(newTour);
  revalidatePath("/");
}
export async function insert() {
  const tours = await getCollection<Tour>("tours");
  return tours.insertOne({
    name: "amir",
    cart: [
      {
        item: "phone",
        qty: 6,
      },
      {
        item: "phone",
        qty: 6,
      },
    ],
  });
}
