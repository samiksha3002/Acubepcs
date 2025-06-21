"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Admin login bypass
      if (email === "admin@pcs.com" && password === "admin123") {
        router.push("/admin/dashboard");
        return;
      }

      if (isSignup) {
        // ✅ Sign up as user
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
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
        // ✅ Login as user
        const res = await signInWithEmailAndPassword(auth, email, password);
        router.push("/user/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignup ? "Create an Account" : "Login"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 underline text-sm"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
