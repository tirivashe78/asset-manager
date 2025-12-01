"use client";
import { motion } from "framer-motion";
import { LogOut, UserCircle } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: {
    name: string;
    role: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const supabase = supabaseBrowser();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-indigo-600 text-white p-4 flex justify-between items-center shadow"
    >
      <h1 className="text-xl font-bold">Asset Manager</h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <UserCircle size={20} />
          <span className="font-medium">{user?.name}</span>
          <span className="text-sm opacity-80">({user?.role})</span>
        </div>

        <button
          onClick={logout}
          className="flex items-center bg-white text-indigo-700 px-3 py-1 rounded shadow hover:bg-gray-200 transition"
        >
          <LogOut size={18} className="mr-1" />
          Logout
        </button>
      </div>
    </motion.nav>
  );
}
