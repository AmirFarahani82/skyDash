"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function OrdersFilter() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "all") {
      params.delete("status");
    } else {
      params.set("status", e.target.value);
    }
    route.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="absolute right-10">
      <select
        name="status"
        id="status"
        className="bg-stone-300 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-stone-500"
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}

export default OrdersFilter;
