"use client";
import PlanCard from "./PlanCard";
import Image from "next/image";

const plans = [
  {
    title: "Acube Grid",
    image: "/plans/grid.jpg",
    investment: 30000,
    dailyReturn: 670,
    days: 90,
    totalIncome: 60300,
    level: 1,
  },
  {
    title: "Acube Core",
    image: "/plans/core.jpg",
    investment: 45000,
    dailyReturn: 760,
    days: 120,
    totalIncome: 91200,
    level: 1,
  },
  {
    title: "Acube Edge",
    image: "/plans/edge.jpg",
    investment: 70000,
    dailyReturn: 1100,
    days: 129,
    totalIncome: 141900,
    level: 3,
  },
  {
    title: "Acube Prime",
    image: "/plans/prime.jpg",
    investment: 120000,
    dailyReturn: 1520,
    days: 180,
    totalIncome: 273600,
    level: 4,
  },
  {
    title: "Acube Prime",
    image: "/plans/prime.jpg",
    investment: 120000,
    dailyReturn: 1520,
    days: 180,
    totalIncome: 273600,
    level: 4,
  },
  {
    title: "Acube Prime",
    image: "/plans/prime.jpg",
    investment: 120000,
    dailyReturn: 1520,
    days: 180,
    totalIncome: 273600,
    level: 4,
  },
];

const PlansSection = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with centered logo */}
      <header className="w-full py-4 bg-white shadow-md flex justify-center items-center">
        <Image
          src="/logi.png" // Update this path to your actual logo file
          alt="Acube Logo"
          width={160}
          height={60}
          className="object-contain"
        />
      </header>

      {/* Plans Section */}
      <section className="px-4 py-6">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </section>
    </div>
  );
};

export default PlansSection;
