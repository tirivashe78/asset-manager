import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminCategoryForm from "@/app/components/admin/AdminCategoryForm";
import AdminCategoryTable from "@/app/components/admin/AdminCategoryTable";

export default async function CategoriesPage() {
  const supabase = await supabaseServer();

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  // Fetch user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <p className="text-center text-red-600 mt-10">
        Not authenticated
      </p>
    );
  }

  return (
    <div>
      <Navbar
        user={{
          name: user.user_metadata?.name ?? "Unknown",
          role: user.user_metadata?.role ?? "user",
        }}
      />

      <div className="max-w-4xl mx-auto p-6">
        <AdminCategoryForm />
        <AdminCategoryTable categories={categories ?? []} />
      </div>

      <Footer />
    </div>
  );
}
