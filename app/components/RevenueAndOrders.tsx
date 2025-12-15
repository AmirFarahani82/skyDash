"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
type Props = {
  revenueAndOrders: { _id: number; revenue: number; totalOrder: number }[];
};
function RevenueAndOrders({ revenueAndOrders }: Props) {
  return (
    <Bar
      options={{
        responsive: true,
        scales: {
          x: { grid: { display: false } },
          "y-revenue": {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Revenue",
            },
            grid: { display: false },
          },
          "y-orders": {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Orders",
            },
            grid: { display: false },
          },
        },
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "statistics",
            align: "start",
            font: {
              size: 24,
            },
          },
          subtitle: {
            display: true,
            text: "Revenue/Orders",
            align: "start",
            font: {
              size: 18,
            },
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueAndOrders.map((r) => r.revenue),
            backgroundColor: "#22C55E",
            hoverBackgroundColor: "#15803D",
            barThickness: 10,
            borderRadius: 50,
            yAxisID: "y-revenue",
          },
          {
            label: "Orders",
            data: revenueAndOrders.map((r) => r.totalOrder),
            backgroundColor: "#7C3AED",
            hoverBackgroundColor: "#5B21B6",
            barThickness: 10,
            borderRadius: 50,
            yAxisID: "y-orders",
          },
        ],
      }}
    />
  );
}

export default RevenueAndOrders;
