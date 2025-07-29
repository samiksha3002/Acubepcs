"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 py-16 text-white relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/2.jpg')",
      }}
    >
      {/* Left Text Block */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 text-center md:text-left z-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-400">
          ABOUT ACUBEpcs
        </h2>
        <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
          ACUBEpcs is a cutting-edge investment platform that enables users to
          invest in renewable energy products and earn daily returns. Our
          mission is to make sustainable investing accessible and profitable for
          everyone.
        </p>
        <a
          href="#"
          className="mt-6 inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition"
        >
          Join Now
        </a>
      </motion.div>

      {/* Right Animated Image */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="mt-10 md:mt-0 w-full md:w-1/2 flex flex-col items-center z-10"
      >
        <img
          src="ev2.png"
          alt="About App"
          className="rounded-xl shadow-lg max-w-[220px] sm:max-w-[240px] md:max-w-[260px] max-h-[3600px] h-auto"
        />
        <p className="text-xs text-gray-300 mt-2 italic text-center">
          *Image is for illustration only
          <br />
          For actual profits, refer to profit charts
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
