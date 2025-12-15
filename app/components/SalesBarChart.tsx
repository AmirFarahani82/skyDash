"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { SalesData } from "../lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
type Props = {
  sales: SalesData;
};
export function SalesBarChart({ sales }: Props) {
  return (
    <Bar
      options={{
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: false } },
        },

        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "monthly sales",
            align: "start",
            font: {
              size: 24,
            },
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: "sales",
            data: sales.map((s) => s.sellsCount),
            backgroundColor: "#00A6F4",
            hoverBackgroundColor: "#155dfc",
            barThickness: 10,
            borderRadius: 50,
          },
        ],
      }}
    />
  );
}
