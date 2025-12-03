export const dynamic = "force-dynamic";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import UserForm from "@/app/components/UserForm";
import CategoryForm from "@/app/components/CategoryForm";
import DepartmentForm from "@/app/components/DepartmentForm";
import AssetTable from "@/app/components/AssetTable";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();

  // 🔥 Redirect if not logged in
  if (!user) return redirect("/login");

  // Extract metadata safely
  const name = user.user_metadata?.name ?? "Unknown";
  const role = user.user_metadata?.role ?? "User";

  // 🔒 Ensure only admins can access this page
  if (role !== "admin") return redirect("/dashboard");

  const { data: assets } = await supabase
    .from("assets")
    .select("*, users(email)");

  return (
    <div>
      <Navbar user={{ name, role }} />

      <main className="p-6 space-y-6">
        <UserForm />
        <CategoryForm />
        <DepartmentForm />
        <AssetTable assets={assets || []} />
      </main>

      <Footer />
    </div>
  );
}
