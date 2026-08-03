"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDatos } from "@/lib/datos-context";
import { rutaDeCarpeta } from "@/lib/mock-data";



export function Buscador() {
  const { carpetas, archivos } = useDatos();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const resultados = useMemo(() => {
    if (query.trim() === "") return [];

    const texto = query.toLowerCase();

    const carpetasEncontradas = carpetas
      .filter((c) => c.nombre.toLowerCase().includes(texto))
      .map((c) => ({
        tipo: "carpeta" as const,
        id: c.id,
        nombre: c.nombre,
        rutaId: c.id, // a dónde navegar al hacer clic
        ruta: rutaDeCarpeta(c.id, carpetas).map((r) => r.nombre).join(" / "),
      }));

    const archivosEncontrados = archivos
      .filter((a) => a.nombre.toLowerCase().includes(texto))
      .map((a) => ({
        tipo: "archivo" as const,
        id: a.carpetaId,
        nombre: a.nombre,
        rutaId: a.carpetaId, // los archivos no tienen página propia, navega a su carpeta
        ruta: rutaDeCarpeta(a.carpetaId, carpetas).map((r) => r.nombre).join(" / "),
      }));

    return [...carpetasEncontradas, ...archivosEncontrados];
  }, [query]);

  function irAResultado(rutaId: string) {
    router.push(`/carpetas/${rutaId}`);
    setQuery(""); // limpia el buscador al navegar
  }

  return (
    <div style={{ position: "relative", width: "280px" }}>
      <input
        type="text"
        placeholder="Buscar carpetas o archivos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px" }}
      />

      {resultados.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            zIndex: 50,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {resultados.map((r) => (
            <div
              key={`${r.tipo}-${r.id}`}
              onClick={() => irAResultado(r.rutaId)}
              style={{ padding: "10px 12px", cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}
            >
              <div style={{ fontSize: "13.5px" }}>
                {r.tipo === "carpeta" ? "📁" : "📄"} {r.nombre}
              </div>
              <div style={{ fontSize: "11.5px", color: "#999" }}>{r.ruta}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}