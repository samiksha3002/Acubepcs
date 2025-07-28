"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WithdrawPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    ifscCode: "",
  });

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
          setUserData({ ...userSnap.data(), uid: user.uid });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const availableProfit =
    userData?.dailyReturn *
      Math.floor(
        (new Date().getTime() - userData?.startDate?.toDate().getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 0;

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 2000) {
      alert("❌ Minimum withdrawal amount is ₹2000.");
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async () => {
    // ✅ Validation
    if (
      !form.bankName ||
      !form.accountNumber ||
      !form.accountHolder ||
      !form.ifscCode
    ) {
      alert("❌ Please fill in all the bank details.");
      return;
    }

    try {
      await addDoc(collection(db, "withdrawRequests"), {
        uid: userData.uid,
        email: userData.email,
        amount: parseFloat(amount),
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        accountHolder: form.accountHolder,
        ifscCode: form.ifscCode,
        status: "pending",
        timestamp: Timestamp.now(),
      });

      alert("✅ Withdrawal request submitted.");
      setAmount("");
      setForm({
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        ifscCode: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving withdrawal request:", error);
      alert("❌ Failed to submit request.");
    }
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
        <div className="bg-white rounded shadow-2xl p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Withdraw Your Profits
          </h2>

          <p className="text-gray-600 text-sm mb-6 text-center">
            Available Profit: ₹{availableProfit}
          </p>

          <label className="block text-sm mb-2">Enter Amount (₹)</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Eg. 2000"
          />

          {!showForm && (
            <button
              onClick={handleWithdraw}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
            >
              Continue
            </button>
          )}

          {showForm && (
            <div className="mt-6 space-y-4">
              <select
                value={form.bankName}
                onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="Punjab National Bank">
                  Punjab National Bank
                </option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="Union Bank of India">Union Bank of India</option>
                <option value="Bank of India">Bank of India</option>
                <option value="Indian Bank">Indian Bank</option>
                <option value="Central Bank of India">
                  Central Bank of India
                </option>
                <option value="UCO Bank">UCO Bank</option>
                <option value="Indian Overseas Bank">
                  Indian Overseas Bank
                </option>
              </select>

              <input
                type="text"
                placeholder="Account Number"
                value={form.accountNumber}
                onChange={(e) =>
                  setForm({ ...form, accountNumber: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Account Holder Name"
                value={form.accountHolder}
                onChange={(e) =>
                  setForm({ ...form, accountHolder: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                value={form.ifscCode}
                onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow"
              >
                Submit Request
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
