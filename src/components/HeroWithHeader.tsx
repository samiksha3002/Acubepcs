"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const HeroWithHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      className="relative min-h-screen bg-black text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/1.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 z-50">
            <Image
              src="/white.png"
              alt="Acube Logo"
              width={130}
              height={130}
              className="object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {[
              "HOME",
              "ABOUT",
              "INVESTMENT",
              "HOW IT WORKS",
              "INVEST & EARN",
              "REWARDS",
            ].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="hover:text-blue-400 transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-50 text-white"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-90 absolute w-full top-[72px] left-0 flex flex-col items-center space-y-5 py-6 text-sm z-40"
          >
            {[
              "HOME",
              "ABOUT",
              "INVESTMENT",
              "HOW IT WORKS",
              "INVEST & EARN",
              "REWARDS",
            ].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="hover:text-blue-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link
              href="/login"
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        )}
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 pt-40 pb-20 gap-10">
        {/* Left Image */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="md:w-1/2 flex justify-center"
        >
          <Image
            src="/ev.png"
            alt="Mobile App"
            width={250}
            height={280}
            className="rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow text-glow leading-tight">
            Invest in Renewable Energy with{" "}
            <span className="text-blue-400">ACUBEpcs</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg font-light">
            Empower your future with sustainable investments and daily profits.
          </p>
          <Link
            href="/plans"
            className="mt-6 inline-block bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition"
          >
            Invest Now
          </Link>
        </motion.div>
      </div>

      {/* Glow Styles */}
      <style jsx>{`
        .text-glow {
          color: #fff;
          text-shadow: 0 0 2px #00f, 0 0 4px #00f, 0 0 6px #80f, 0 0 8px #80f;
        }
      `}</style>
    </section>
  );
};

export default HeroWithHeader;
