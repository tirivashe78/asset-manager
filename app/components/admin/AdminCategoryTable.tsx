"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

interface Category {
  id: number;
  name: string;
}

interface AdminCategoryTableProps {
  categories: Category[];
}

export default function AdminCategoryTable({ categories }: AdminCategoryTableProps) {
  const supabase = supabaseBrowser();

  async function remove(id: number) {
    await supabase.from("categories").delete().eq("id", id);
    window.location.reload();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded p-4 mt-4"
    >
      <h2 className="font-bold text-xl mb-4">Categories</h2>

      <table className="min-w-full table-auto text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{c.name}</td>

              <td className="p-3 text-center">
                <button
                  onClick={() => remove(c.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
