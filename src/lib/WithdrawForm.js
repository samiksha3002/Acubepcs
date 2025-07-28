"use client";

import React, { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function WithdrawForm() {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      setMessage("Please login to make a withdrawal request.");
      return;
    }

    try {
      await addDoc(collection(db, "withdrawRequests"), {
        uid: user.uid,
        email: user.email,
        accountNumber,
        ifscCode,
        amount: parseFloat(amount),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMessage("Withdrawal request submitted successfully.");
      setAccountNumber("");
      setIfscCode("");
      setAmount("");
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage("Error submitting request. Try again later.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Withdraw Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Account Number"
          className="w-full border p-2 rounded"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="IFSC Code"
          className="w-full border p-2 rounded"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
