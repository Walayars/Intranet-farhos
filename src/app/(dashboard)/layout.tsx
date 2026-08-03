import { SelectorUsuario } from "@/components/selector-usuario";
import { Sidebar } from "@/components/sidebar";
import { Buscador } from "@/components/buscador";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <header style={{ display: "flex", justifyContent: "flex-end", padding: "12px 24px", borderBottom: "1px solid #eee" }}> 
          <Buscador />
          <SelectorUsuario />
        </header>
        <main style={{ padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
