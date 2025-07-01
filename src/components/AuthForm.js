"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Admin Login Shortcut
      if (email === "admin@pcs.com" && password === "admin123") {
        router.push("/admin/dashboard");
        return;
      }

      if (isSignup) {
        // ✅ Create new user
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          name,
          email,
          role: "user",
          approved: false,
          investedAmount: 0,
          dailyReturn: 0,
          balance: 0,
          createdAt: new Date(),
        });
        router.push("/user/dashboard");
      } else {
        // ✅ Login existing user
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", res.user.uid));

        if (userDoc.exists()) {
          const user = userDoc.data();
          if (user.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/dashboard");
          }
        } else {
          setError("User record not found in database.");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 text-sm underline"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
