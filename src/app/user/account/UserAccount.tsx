"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

  const chartData = Array.from({ length: daysPassed })
    .map((_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);
      return {
        date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        amount: (userData?.dailyReturn || 0) * (index + 1),
      };
    })
    .slice(-7); // Show only last 7 days

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-lg">
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
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded border p-4 z-50">
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
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl text-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            📊 Investment Summary
          </h2>

          {userData?.approved ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded p-4 shadow-xl border">
                  <p className="text-2xl text-gray-600">💰 Invested Amount</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{userData.investedAmount || 0}
                  </p>

                  <p className="mt-4 text-sm text-gray-600">💹 Total Profit</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹{totalReturn}
                  </p>
                </div>

                <div className="bg-white rounded p-4 shadow-xl border">
                  <p className="text-sm text-gray-600">📅 Days Passed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {daysPassed} Days
                  </p>

                  <p className="mt-4 text-sm text-gray-600">📈 Daily Return</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹{userData.dailyReturn || 0}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      fontSize={10}
                    />
                    <Tooltip
                      cursor={{ fill: "#f0f0f0" }}
                      contentStyle={{ fontSize: "12px" }}
                      formatter={(value: number) => [
                        `₹${value}`,
                        "Total Profit",
                      ]}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3B82F6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center mt-6 gap-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
                  onClick={() => router.push("/withdraw")}
                >
                  Withdraw Profits
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
                  onClick={() => router.push("/invest")}
                >
                  Invest More
                </button>
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
