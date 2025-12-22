import { requireSuperAdmin } from "../../../lib/auth/super-admin";
import SuperAdminShell from "../../../components/admin/SuperAdminShell";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { profile, user } = await requireSuperAdmin();

  return (
    <SuperAdminShell displayName={profile?.full_name ?? user.email ?? ""}>
      {children}
    </SuperAdminShell>
  );
}
