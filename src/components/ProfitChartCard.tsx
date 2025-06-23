"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Daily Profit",
      data: [50, 70, 60, 80, 90],
      borderColor: "rgb(59, 130, 246)",
      tension: 0.3,
    },
  ],
};

export default function ProfitChartCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h4 className="mb-4 font-semibold text-gray-700">Profit Chart</h4>
      <Line data={chartData} />
    </div>
  );
}
