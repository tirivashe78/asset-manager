import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AssetForm from "@/app/components/AssetForm";
import AssetTable from "@/app/components/AssetTable";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function UserDashboard() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-600">
        Not authenticated
      </p>
    );
  }

  const { data: assets } = await supabase
    .from("assets")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div>
      <Navbar
        user={{
          name: user.user_metadata.name,
          role: user.user_metadata.role,
        }}
      />

      <div className="max-w-4xl mx-auto p-6">
        <AssetForm userId={user.id} />
        <AssetTable assets={assets ?? []} /> {/* FIXED */}
      </div>

      <Footer />
    </div>
  );
}
