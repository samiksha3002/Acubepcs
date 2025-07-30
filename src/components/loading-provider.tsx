"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[9999] bg-white/80 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    const handlePushState = () => {
      handleStart();
      setTimeout(handleComplete, 800); // simulate slight delay
    };

    window.addEventListener("popstate", handlePushState);
    const originalPush = history.pushState;

    history.pushState = function (...args) {
      originalPush.apply(this, args);
      handlePushState();
    };

    return () => {
      window.removeEventListener("popstate", handlePushState);
      history.pushState = originalPush;
    };
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      {children}
    </>
  );
}
