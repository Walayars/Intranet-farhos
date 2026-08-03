"use client";

import { useUsuarioActual } from "@/lib/usuario-actual-context";
import { useDatos } from "@/lib/datos-context";
import { carpetasVisiblesParaUsuario } from "@/lib/mock-data";
import Link from "next/link";

export function Sidebar() {
  const { usuarioActualId } = useUsuarioActual();
  const { carpetas } = useDatos();
  const visibles = carpetasVisiblesParaUsuario(usuarioActualId, carpetas);

  return (
    <nav style={{ width: "220px", padding: "16px", borderRight: "1px solid #eee" }}>
      <Link href="/inicio" style={{ fontWeight: 600, marginBottom: "16px", display: "block", color: "#333", textDecoration: "none" }}>
        Sistema interno
      </Link>
      {visibles.map((c) => (
        <Link key={c.id} href={`/carpetas/${c.id}`} style={{ display: "block", padding: "8px 0", color: "#333", textDecoration: "none" }}>
          {c.nombre}
        </Link>
      ))}
    </nav>
  );
}