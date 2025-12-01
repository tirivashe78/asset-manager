"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function UserForm() {
  const supabase = supabaseBrowser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function createUser() {
    setMessage("");

    const { data: signUp, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone, role },
    });

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    // Insert into user_profiles table
    await supabase.from("user_profiles").insert({
      id: signUp.user.id,
      name,
      phone,
      role,
    });

    setMessage("User created successfully.");
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded shadow"
    >
      <h2 className="font-semibold mb-3">Create New User</h2>

      <div className="grid gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={createUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create User
        </button>
      </div>

      {message && (
        <p className="text-sm mt-2 text-green-600 animate-pulse">{message}</p>
      )}
    </motion.div>
  );
}
