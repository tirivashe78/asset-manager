"use client";

import { motion } from "framer-motion";

interface UserMeta {
  name?: string;
  role?: string;
}

interface AdminUser {
  id: string;
  email?: string;
  created_at: string;
  user_metadata: UserMeta;
}

interface AdminUserTableProps {
  users: AdminUser[];
}

export default function AdminUserTable({ users }: AdminUserTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg p-4 mt-4"
    >
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      <table className="min-w-full table-auto text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3">Email</th>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.email ?? "—"}</td>
              <td className="p-3">{u.user_metadata?.name ?? "—"}</td>
              <td className="p-3 capitalize">{u.user_metadata?.role ?? "—"}</td>
              <td className="p-3">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
