"use client";

import React from "react";
import { FaUser } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";

interface RewardItem {
  teamSize: number;
  reward: string;
  level: number;
  directReferrals: number;
}

const rewardData: RewardItem[] = [
  {
    teamSize: 25,
    reward: "Uniform & Name Badge",
    level: 5,
    directReferrals: 10,
  },
  {
    teamSize: 50,
    reward: "Smartwatch & Power Bank",
    level: 7,
    directReferrals: 20,
  },
  {
    teamSize: 100,
    reward: "Smartphone Worth Upto 25 Thousand INR",
    level: 9,
    directReferrals: 40,
  },
  {
    teamSize: 150,
    reward: "Tablet or Smart TV",
    level: 10,
    directReferrals: 50,
  },
  {
    teamSize: 200,
    reward: "Electric Scooter",
    level: 12,
    directReferrals: 60,
  },
  {
    teamSize: 300,
    reward: "Motorbike or Laptop",
    level: 14,
    directReferrals: 80,
  },
  {
    teamSize: 500,
    reward: "Trip to Dubai or Premium EV",
    level: 18,
    directReferrals: 100,
  },
];

const RewardsSection: React.FC = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat text-white py-16 px-4 sm:px-6"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/2.jpg')",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-6">
          REWARDS
        </h2>
        <p className="text-lg sm:text-xl mb-3 text-gray-300 font-medium">
          Earn Exclusive Benefits for Team Building and Referrals!
        </p>
        <p className="text-base sm:text-lg font-semibold mb-12 text-white">
          Grow your team and unlock incredible rewards at every level! From
          gadgets to EVs, each milestone brings exclusive benefits. Start
          referring today and enjoy the perks of building a successful network!
        </p>

        <div className="space-y-6">
          {rewardData.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-black/40 p-6 rounded-xl backdrop-blur-sm shadow-md"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-purple-600 p-5 rounded-full text-white text-3xl">
                <FaUser />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-2xl font-bold">
                  Team Size: {item.teamSize}
                </h4>
                <p className="text-xl font-medium mt-1">{item.reward}</p>
              </div>

              <div className="flex flex-col items-center sm:items-end text-lg">
                <div className="text-4xl text-purple-400">
                  <BsArrowLeft />
                </div>
                <div className="mt-2 text-white text-center sm:text-right">
                  <strong>LV. {item.level}</strong>
                  <br />
                  {item.directReferrals} Direct Referral
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
