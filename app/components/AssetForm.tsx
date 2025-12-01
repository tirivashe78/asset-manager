"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

interface AssetFormProps {
  userId: string; // or number, depending on your DB
}

export default function AssetForm({ userId }: AssetFormProps) {
  const supabase = supabaseBrowser();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
  const [cost, setCost] = useState("");

  async function submit() {
    await supabase.from("assets").insert({
      user_id: userId,
      name,
      category,
      date_purchased: datePurchased,
      cost,
      department,
    });

    window.location.reload();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-black text-center">Create Asset</h2>

      <div className="grid gap-4">
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          placeholder="Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="date"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          value={datePurchased}
          onChange={(e) => setDatePurchased(e.target.value)}
        />

        <input
          type="number"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Save Asset
        </button>
      </div>
    </motion.div>
  );
}
