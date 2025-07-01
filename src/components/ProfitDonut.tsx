"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfitDonut({ earned = 60 }: { earned: number }) {
  const remaining = 100 - earned;

  const data = {
    labels: ["Earned", "Remaining"],
    datasets: [
      {
        data: [earned, remaining],
        backgroundColor: ["#3b82f6", "#e5e7eb"], // blue-500 and gray-200
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    rotation: Math.PI,
    circumference: Math.PI,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Doughnut data={data} options={options} />
      <p className="text-center mt-2 font-medium text-gray-600">
        {earned}% of profit goal achieved
      </p>
    </div>
  );
}
