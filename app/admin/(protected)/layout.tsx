import AdminShell from "@/components/admin/AdminShell";
import AdminTransitions from "@/components/admin/AdminTransitions";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <AdminTransitions>{children}</AdminTransitions>
    </AdminShell>
  );
}
