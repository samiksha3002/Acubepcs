"use client";

import { FaAndroid, FaUserPlus, FaRupeeSign, FaWallet } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";

const steps = [
  {
    icon: <FaAndroid size={28} />,
    title: "Download the App",
    description: "Download the VoltHive app from our Website",
  },
  {
    icon: <FaUserPlus size={28} />,
    title: "Create an Account",
    description: "Sign up and complete your profile to start investing.",
  },
  {
    icon: <MdTouchApp size={28} />,
    title: "Choose an Investment",
    description: "Select from a range of renewable energy products.",
  },
  {
    icon: <FaRupeeSign size={28} />,
    title: "Earn Daily Returns",
    description: "Receive daily income directly to your account.",
  },
  {
    icon: <FaWallet size={28} />,
    title: "Withdraw Earnings",
    description:
      "Easily withdraw your profits at the end of the investment period.",
  },
];

const HowItWorks = () => {
  return (
    <section
      className="py-20 px-4 sm:px-6 md:px-20 bg-cover bg-center text-white relative"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/2.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-12">
          HOW IT WORKS
        </h2>

        <div className="flex flex-col items-center space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start items-center text-center sm:text-left w-full max-w-xl mx-auto space-y-3 sm:space-y-0 sm:space-x-6"
            >
              {/* Icon */}
              <div className="bg-blue-600 text-white p-4 rounded-full text-2xl shadow-lg">
                {step.icon}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-xl sm:text-2xl font-semibold text-white">
                  {step.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-300 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
