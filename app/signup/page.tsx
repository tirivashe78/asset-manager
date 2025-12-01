"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SignupPage() {
  const supabase = supabaseBrowser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- toggle state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone }, // save metadata
      },
    });

    if (error) setError(error.message);
    else setSuccess("Account created. Check your email to verify.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-100 h-70bject-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Create Account
        </h1>

        {/* Error / Success messages */}
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
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-green-600 font-medium text-center"
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Input fields */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
             className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
             className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Password with show/hide */}
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // <-- toggle type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
             className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <motion.button
            onClick={handleSignup}
            whileHover={{ scale: 1.05 }}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
          >
            Sign Up
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} className="flex-1 w-full">
            <Link
              href="/login"
              className="block text-center py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Back to Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
