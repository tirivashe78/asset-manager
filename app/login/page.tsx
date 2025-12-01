"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  setError("");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) setError(error.message);
  else {
    // Fetch role
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", data.user?.id)
      .single();

    if (profile?.role === "admin") window.location.href = "/admin/dashboard";
    else window.location.href = "/dashboard";
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
      {/* Animate the form container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-120 h-50 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Login
        </h1>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-600 font-medium text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Input fields with labels */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
          >
            Login
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} className="flex-1 w-full">
            <Link
              href="/signup"
              className="block text-center py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Signup
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
