"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvestMore() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    // You can integrate Firestore update logic here
    alert(`Investment of ₹${amount} submitted successfully!`);
    router.push("/dashboard"); // or wherever you want to redirect after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Invest More
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Investment Amount (₹)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={1000}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold shadow"
          >
            Submit Investment
          </button>
        </form>

        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-gray-600 hover:underline block text-center"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
