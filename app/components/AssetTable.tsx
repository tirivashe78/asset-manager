"use client";
import { Trash2 } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { motion } from "framer-motion";

// Define the expected shape of an asset row
interface Asset {
  id: string;
  name: string;
  category: string;
  department: string;
  date_purchased: string;
  cost: number;
  users?: {
    email: string;
  };
}

interface AssetTableProps {
  assets: Asset[];
  admin?: boolean;
}

export default function AssetTable({ assets, admin = false }: AssetTableProps) {
  const supabase = supabaseBrowser();

  async function deleteAsset(id: string) {
    await supabase.from("assets").delete().eq("id", id);
    window.location.reload();
  }

  if (!assets?.length) {
    return (
      <p className="text-gray-600 italic mt-4">No assets found.</p>
    );
  }

 return (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="overflow-x-auto bg-white shadow rounded-lg mt-6"
  >
    <table className="min-w-full table-auto text-left text-black">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th className="p-3 ">Name</th>
          <th className="p-3">Category</th>
          <th className="p-3">Department</th>
          <th className="p-3">Date Purchased</th>
          <th className="p-3">Cost</th>
          {admin && <th className="p-3 text-center">Actions</th>}
        </tr>
      </thead>

      <tbody>
        {assets.map((a: any, i: number) => (
          <tr
            key={a.id}
            className={`border-b hover:bg-gray-50 transition ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="p-3 text-black">{a.name}</td>
            <td className="p-3 text-black">{a.category}</td>
            <td className="p-3 text-black">{a.department}</td>
            <td className="p-3 text-black">{a.date_purchased}</td>
            <td className="p-3 text-black">{a.cost}</td>

            {admin && (
              <td className="p-3 text-center">
                <button
                  onClick={() => deleteAsset(a.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);
}
