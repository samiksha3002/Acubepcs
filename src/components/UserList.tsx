"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const approveUser = async (id: string, investedAmount: number) => {
    const dailyReturn = investedAmount >= 15000 ? 100 : 50;
    try {
      await updateDoc(doc(db, "users", id), {
        approved: true,
        investedAmount,
        dailyReturn,
        balance: investedAmount,
      });
      fetchUsers(); // refresh the user list
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow p-4 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{user.email}</p>
            <p>Status: {user.approved ? "✅ Approved" : "⏳ Pending"}</p>
            <p>Investment: ₹{user.investedAmount || 0}</p>
            <p>Daily Return: ₹{user.dailyReturn || 0}</p>
          </div>

          {!user.approved && (
            <div className="flex gap-2">
              <button
                className="bg-green-600 text-white px-4 py-1 rounded"
                onClick={() => approveUser(user.id, 10000)}
              >
                Approve ₹10,000
              </button>
              <button
                className="bg-green-800 text-white px-4 py-1 rounded"
                onClick={() => approveUser(user.id, 15000)}
              >
                Approve ₹15,000
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
