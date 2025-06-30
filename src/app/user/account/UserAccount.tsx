"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function UserAccount() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-600">Loading account...</p>;
  }

  const displayName =
    userData?.name || auth.currentUser?.email?.split("@")[0] || "User";

  const startDate = userData?.startDate?.toDate?.() || new Date();
  const today = new Date();
  const daysPassed = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalReturn = (userData?.dailyReturn || 0) * daysPassed;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">ACUBEpcs</h1>
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <User size={20} />
            <span className="font-medium">{displayName}</span>
            <ChevronDown size={18} />
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded border p-4 z-50">
              <div className="flex items-center gap-2 mb-4">
                <User size={20} />
                <span>{auth.currentUser?.email}</span>
              </div>
              <button
                className="flex items-center gap-2 text-red-500 hover:underline"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="p-6 flex justify-center">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-2xl text-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            📊 Investment Summary
          </h2>

          {userData?.approved ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center mb-8">
                <div className="bg-blue-100 rounded p-4 shadow">
                  <p className="text-sm text-gray-600">💰 Invested Amount</p>
                  <p className="text-2xl font-bold text-blue-800">
                    ₹{userData.investedAmount || 0}
                  </p>
                </div>
                <div className="bg-green-100 rounded p-4 shadow">
                  <p className="text-sm text-gray-600">📈 Daily Return</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹{userData.dailyReturn || 0}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm">
                📅 Days Passed: {daysPassed} — 📥 Total Return: ₹{totalReturn}
              </p>

              {/* Half-circle graph with arrow */}
              <div className="flex justify-center mt-10">
                <div className="relative w-48 h-24 border-t-4 border-blue-400 rounded-b-full">
                  <motion.div
                    className="absolute top-[-10px] left-1/2 w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-transparent border-b-blue-500"
                    animate={{ rotate: [0, 180, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "bottom center" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-yellow-600 font-medium">
              Your account is pending admin approval.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
