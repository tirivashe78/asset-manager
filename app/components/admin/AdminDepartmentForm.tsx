"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AdminDepartmentForm() {
  const supabase = supabaseBrowser();
  const [name, setName] = useState("");

  async function save() {
    await supabase.from("departments").insert({ name });
    window.location.reload();
  }

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="font-bold text-xl mb-3">Add Department</h2>

      <input
        className="border p-2 rounded w-full mb-4 text-black"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-indigo-600 text-white p-2 rounded w-full"
      >
        Save
      </button>
    </div>
  );
}
