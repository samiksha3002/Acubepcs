"use client";

import { motion } from "framer-motion";
import { FaDownload, FaAndroid } from "react-icons/fa";

const DownloadAppSection = () => {
  return (
    <section
      className="bg-cover bg-center py-20 px-6 text-center"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/1.jpg')",
      }}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-400 mb-10">
        DOWNLOAD APP
      </h2>

      <div className="bg-white max-w-2xl mx-auto rounded-2xl shadow-xl p-8 flex items-center justify-center gap-6">
        <FaAndroid className="text-green-500 text-6xl" />
        <span className="text-4xl font-light text-black">Android</span>
      </div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-10 inline-block"
      >
        <a
          href="/your-app.apk"
          download
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition-all"
        >
          <FaDownload />
          Download
        </a>
      </motion.div>
    </section>
  );
};

export default DownloadAppSection;
