"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const supabase = supabaseBrowser();

  async function submit() {
    await supabase.from("asset_categories").insert({ name });
    setName("");
    window.location.reload();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded shadow"
    >
      <h2 className="font-semibold mb-3">Create Category</h2>

      <div className="flex gap-3">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Save
        </button>
      </div>
    </motion.div>
  );
}
