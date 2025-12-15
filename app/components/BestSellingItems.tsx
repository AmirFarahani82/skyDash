"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { BestSellingRecord } from "../lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  plugins,
  Legend
);
type Props = {
  bestSelling: BestSellingRecord[];
};
function BestSellingItems({ bestSelling }: Props) {
  return (
    <Doughnut
      options={{
        cutout: "70%",
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "monthly sales",
            align: "start",
            font: {
              size: 18,
            },
          },
        },
      }}
      data={{
        labels: bestSelling.map((p) => p.title),
        datasets: [
          {
            label: "sells amount",
            data: bestSelling.map((p) => p.soldCount),
            hoverOffset: 6,
            backgroundColor: ["#0ea5e9", "#38bdf8", "#5bcbff"],
            hoverBackgroundColor: ["#0284c7", "#0ea5e9", "#38bdf8"],
          },
        ],
      }}
    />
  );
}

export default BestSellingItems;
