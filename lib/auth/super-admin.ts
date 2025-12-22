import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireSuperAdmin() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) redirect("/admin/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .single();

  if (error || profile?.role !== "super_admin") {
    redirect("/");
  }

  return { user, profile };
}
