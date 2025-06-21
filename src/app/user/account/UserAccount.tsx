"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";

export default function UserAccount() {
  const [userData, setUserData] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (!user) return router.push("/");

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUserData(userSnap.data());
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) return <p className="p-6">Loading account...</p>;

  const totalAmount =
    (userData.investedAmount || 0) + (userData.totalReturn || 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">AcubePCS</h1>
        </div>

        {/* Right - Navbar */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <User size={20} />
            <span className="font-medium">
              {auth.currentUser?.email?.split("@")[0]}
            </span>
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

      {/* Main Content */}
      <main className="p-6 flex justify-center">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-6">📊 Investment Summary</h2>

          {userData?.approved ? (
            <>
              <div className="text-lg mb-3">
                💰 <span className="font-semibold">Investment:</span> ₹
                {userData.investedAmount}
              </div>
              <div className="text-lg">
                🧮 <span className="font-semibold">Total Balance:</span> ₹
                {totalAmount}
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
