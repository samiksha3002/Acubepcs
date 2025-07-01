"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WithdrawPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
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

  const handleWithdraw = () => {
    alert(`Withdrawal request of ₹${amount} submitted.`);
    setAmount("");
  };

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">Withdraw Funds</h1>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-blue-600 hover:underline"
        >
          ⬅ Back to Dashboard
        </button>
      </header>

      <main className="p-6 flex justify-center">
        <div className="bg-white rounded shadow p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Withdraw Your Earnings
          </h2>

          <p className="text-gray-600 text-sm mb-6 text-center">
            Available Profit: ₹
            {userData?.dailyReturn *
              Math.floor(
                (new Date().getTime() -
                  userData?.startDate?.toDate().getTime()) /
                  (1000 * 60 * 60 * 24)
              ) || 0}
          </p>

          <label className="block text-sm mb-2">Enter Amount (₹)</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Eg. 500"
          />

          <button
            onClick={handleWithdraw}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
          >
            Submit Withdrawal
          </button>
        </div>
      </main>
    </div>
  );
}
