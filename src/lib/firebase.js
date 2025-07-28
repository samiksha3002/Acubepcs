// Import necessary modules
"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // adjust path if different
import { onAuthStateChanged } from "firebase/auth";

export default function WithdrawForm() {
  const [formData, setFormData] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    amount: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit withdrawal request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Wait for auth to be ready
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setStatus("You must be logged in.");
          setLoading(false);
          return;
        }

        const withdrawalData = {
          uid: user.uid,
          email: user.email,
          ...formData,
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "withdrawRequests"), withdrawalData);
        setStatus("Withdrawal request submitted successfully!");
        setFormData({
          accountHolder: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          amount: "",
        });
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Withdrawal Request</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="accountHolder"
          placeholder="Account Holder Name"
          value={formData.accountHolder}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Withdrawal Request"}
        </button>
      </form>
      {status && <p className="mt-2 text-sm text-green-600">{status}</p>}
    </div>
  );
}
