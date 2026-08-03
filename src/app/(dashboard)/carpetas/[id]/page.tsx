"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useDatos } from "@/lib/datos-context";
import { useUsuarioActual } from "@/lib/usuario-actual-context";
import { usuarios, roles, subcarpetasDe, archivosDe, rutaDeCarpeta } from "@/lib/mock-data";

export default function CarpetaPage() {
  const { id } = useParams<{ id: string }>();
  const { carpetas, archivos, agregarCarpeta, renombrarCarpeta, eliminarCarpeta, agregarArchivo, eliminarArchivo } = useDatos();
  const { usuarioActualId } = useUsuarioActual();

  const usuario = usuarios.find((u) => u.id === usuarioActualId);
  const rol = roles.find((r) => r.id === usuario?.rolId);
  const puedeEditar = rol?.puedeEditar ?? false;

  const ruta = rutaDeCarpeta(id, carpetas);
  if (ruta.length === 0) notFound();

  const subcarpetas = subcarpetasDe(id, carpetas);
  const archivosAqui = archivosDe(id, archivos);

  function handleRenombrar(carpetaId: string, nombreActual: string) {
    const nuevo = window.prompt("Nuevo nombre:", nombreActual);
    if (nuevo && nuevo.trim()) renombrarCarpeta(carpetaId, nuevo.trim());
  }

  function handleNuevaCarpeta() {
    const nombre = window.prompt("Nombre de la nueva carpeta:");
    if (nombre && nombre.trim()) agregarCarpeta(nombre.trim(), id);
  }

  function handleNuevoArchivo() {
    const nombre = window.prompt("Nombre del archivo (ej: contrato.pdf):");
    if (nombre && nombre.trim()) agregarArchivo(nombre.trim(), id, "pdf");
  }

  return (
    <div>
      <div style={{ marginBottom: "20px", fontSize: "14px", color: "#666" }}>
        {ruta.map((c, i) => (
          <span key={c.id}>
            <Link href={`/carpetas/${c.id}`} style={{ color: "#333" }}>{c.nombre}</Link>
            {i < ruta.length - 1 && " / "}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <h1>{ruta[ruta.length - 1].nombre}</h1>
        {puedeEditar && (
          <button onClick={() => handleRenombrar(id, ruta[ruta.length - 1].nombre)}>✏️</button>
        )}
      </div>

      {puedeEditar && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <button onClick={handleNuevaCarpeta} style={{ padding: "6px 12px", border: "1px solid #ddd", borderRadius: "4px" }}>+ Nueva carpeta</button>
          <button onClick={handleNuevoArchivo} style={{ padding: "6px 12px", border: "1px solid #ddd", borderRadius: "4px" }}>+ Nuevo archivo</button>
        </div>
      )}

      {subcarpetas.map((c) => (
        <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", border: "1px solid #eee", marginBottom: "6px" }}>
          <Link href={`/carpetas/${c.id}`} style={{ flex: 1 }}>📁 {c.nombre}</Link>
          {puedeEditar && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleRenombrar(c.id, c.nombre)}>✏️</button>
              <button onClick={() => { if (window.confirm("¿Eliminar esta carpeta y su contenido?")) eliminarCarpeta(c.id); }}>🗑️</button>
            </div>
          )}
        </div>
      ))}

      {archivosAqui.map((a) => (
        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", border: "1px solid #eee", marginBottom: "6px" }}>
          <span>📄 {a.nombre}</span>
          {puedeEditar && <button onClick={() => { if (window.confirm("¿Eliminar este archivo?")) eliminarArchivo(a.id); }}>🗑️</button>}
        </div>
      ))}

      {subcarpetas.length === 0 && archivosAqui.length === 0 && <p style={{ color: "#999" }}>Esta carpeta está vacía.</p>}
    </div>
  );
}