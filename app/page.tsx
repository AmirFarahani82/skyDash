import Image from "next/image";

import DashboardOverview from "./components/DashboardOverview";

export default async function Home() {
  return (
    <div className="">
      <DashboardOverview />
    </div>
  );
}
