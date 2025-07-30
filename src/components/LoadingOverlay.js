"use client";
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
