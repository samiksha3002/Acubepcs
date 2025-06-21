"use client";

import { motion } from "framer-motion";

const InvestEarnSection = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center text-white px-4 sm:px-6 md:px-20"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/1.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Mobile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-0"
        >
          <img
            src="https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2025/06/AcubeI3.jpg"
            alt="App UI"
            className="w-[220px] sm:w-[260px] md:w-[300px] rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-400 tracking-wide">
            INVEST & EARN
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white font-light max-w-md mx-auto md:mx-0">
            Get 100% Investment Income & Referral Income in Our App
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestEarnSection;
