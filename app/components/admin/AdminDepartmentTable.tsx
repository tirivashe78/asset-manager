"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

interface Department {
  id: number;
  name: string;
}

interface AdminDepartmentTableProps {
  departments: Department[];
}

export default function AdminDepartmentTable({
  departments,
}: AdminDepartmentTableProps) {
  const supabase = supabaseBrowser();

  async function remove(id: number) {
    await supabase.from("departments").delete().eq("id", id);
    window.location.reload();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded p-4 mt-4"
    >
      <h2 className="font-bold text-xl mb-4">Departments</h2>

      <table className="min-w-full text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((d: Department) => (
            <tr key={d.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{d.name}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => remove(d.id)}
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
