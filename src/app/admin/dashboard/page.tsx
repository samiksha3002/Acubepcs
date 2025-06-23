"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [dailyReturn, setDailyReturn] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleApproval = async (userId: string, currentStatus: boolean) => {
    await updateDoc(doc(db, "users", userId), { approved: !currentStatus });
    fetchUsers();
  };

  const startEditing = (user: any) => {
    setEditingUser(user.id);
    setInvestedAmount(user.investedAmount || 0);
    setDailyReturn(user.dailyReturn || 0);
  };

  const saveChanges = async (userId: string) => {
    const now = Timestamp.now();
    await updateDoc(doc(db, "users", userId), {
      investedAmount,
      dailyReturn,
      startDate: now,
    });
    setEditingUser(null);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approvedUsers = users.filter((u) => u.approved);
  const pendingUsers = users.filter((u) => !u.approved);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-blue-700">Admin Panel</h1>
        </div>
        <p className="text-sm text-gray-500">Total Users: {users.length}</p>
      </header>

      {/* Dashboard Stats */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={users.length} color="blue" />
        <StatCard title="Approved" value={approvedUsers.length} color="green" />
        <StatCard title="Pending" value={pendingUsers.length} color="yellow" />
        <StatCard title="Admin Controls" value="✔️" color="gray" />
      </div>

      {/* User Table */}
      <div className="p-6 overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Invested</th>
              <th className="py-2 px-4 border">Daily Return</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{user.name || "Unnamed"}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {user.approved ? "✅ Approved" : "⏳ Pending"}
                </td>
                <td className="border px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="number"
                      value={investedAmount}
                      onChange={(e) =>
                        setInvestedAmount(Number(e.target.value))
                      }
                      className="w-24 border rounded p-1 text-sm"
                    />
                  ) : (
                    `₹${user.investedAmount || 0}`
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="number"
                      value={dailyReturn}
                      onChange={(e) => setDailyReturn(Number(e.target.value))}
                      className="w-24 border rounded p-1 text-sm"
                    />
                  ) : (
                    `₹${user.dailyReturn || 0}`
                  )}
                </td>
                <td className="border px-4 py-2 space-x-1">
                  {editingUser === user.id ? (
                    <>
                      <button
                        onClick={() => saveChanges(user.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleApproval(user.id, user.approved)}
                        className={`px-2 py-1 text-sm rounded text-white ${
                          user.approved ? "bg-red-500" : "bg-blue-600"
                        }`}
                      >
                        {user.approved ? "Reject" : "Approve"}
                      </button>
                      <button
                        onClick={() => startEditing(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-700",
    green: "text-green-600",
    yellow: "text-yellow-600",
    gray: "text-gray-700",
  };
  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-xl font-bold ${colorMap[color]}`}>{value}</h2>
    </div>
  );
}
