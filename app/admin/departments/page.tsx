import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminDepartmentForm from "@/app/components/admin/AdminDepartmentForm";
import AdminDepartmentTable from "@/app/components/admin/AdminDepartmentTable";

export default async function DepartmentsPage() {
  const supabase = await supabaseServer();

  const { data: departments } = await supabase
    .from("departments")
    .select("*");

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  // Always pass valid { name, role }
  const safeUser = {
    name: user?.user_metadata?.name ?? "Guest",
    role: user?.user_metadata?.role ?? "guest",
  };

  return (
    <div>
      <Navbar user={safeUser} />

      <div className="max-w-4xl mx-auto p-6">
        <AdminDepartmentForm />
        <AdminDepartmentTable departments={departments ?? []} />
      </div>

      <Footer />
    </div>
  );
}
