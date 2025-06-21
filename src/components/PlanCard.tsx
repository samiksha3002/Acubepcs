"use client";
import Image from "next/image";

const PlanCard = ({
  title,
  image,
  investment,
  dailyReturn,
  days,
  totalIncome,
  level,
}: {
  title: string;
  image: string;
  investment: number;
  dailyReturn: number;
  days: number;
  totalIncome: number;
  level: number;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-start gap-4">
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
        className="rounded-md object-cover"
      />
      <div className="flex-1 text-sm text-gray-800">
        <h3 className="text-center font-bold italic text-base mb-1 border border-gray-400 inline-block px-2 py-1 rounded">
          {title}
        </h3>
        <p>
          Investment:{" "}
          <span className="text-blue-600 font-semibold">₹{investment}</span>
        </p>
        <p>
          Daily Return:{" "}
          <span className="text-blue-600 font-semibold">₹{dailyReturn}</span>
        </p>
        <p>
          Income Days: <span className="text-blue-600">{days}</span>
        </p>
        <p>
          Total Income: <span className="text-blue-600">₹{totalIncome}</span>
        </p>
        <p>
          Invest Limit: <span className="text-gray-600">1</span> &nbsp;&nbsp;
          Level: <span className="text-blue-600">{level}</span>
        </p>

        <button className="mt-3 bg-blue-500 text-white font-semibold px-6 py-1.5 rounded-full w-full">
          Invest
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
