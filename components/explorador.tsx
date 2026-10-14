"use client";

import { useState, useEffect, useCallback } from "react";
import { DocumentoItem, TipoDocumento } from "@/lib/documento-types";
import * as repo from "@/lib/repositorio-documentos";
import { Sidebar } from "./sidebar";
import { Breadcrumb } from "./breadcrumb";
import { SearchBar } from "./search-bar";
import { FileRow } from "./file-row";
import { DetailsPanel } from "./details-panel";
import { PreviewPanel } from "./preview-panel";
import { Toolbar, SortKey, ViewMode } from "./toolbar";
import { ContextMenu, MenuItem } from "./context-menu";
import { NuevoItemModal } from "./nuevo-item-modal";
import { UserMenu } from "./user-menu";

type ExploradorProps = {
  usuario: { nombre: string; rol: "admin" | "trabajador" };
};

export function Explorador({ usuario }: ExploradorProps) {
  const [carpetaActual, setCarpetaActual] = useState<string | null>(null);
  const [carpetasRaiz, setCarpetasRaiz] = useState<DocumentoItem[]>([]);
  const [contenido, setContenido] = useState<DocumentoItem[]>([]);
  const [ruta, setRuta] = useState<DocumentoItem[]>([]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<DocumentoItem | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [viewMode, setViewMode] = useState<ViewMode>("lista");
  const [menuContextual, setMenuContextual] = useState<{ item: DocumentoItem; x: number; y: number } | null>(null);
  const [modalNuevo, setModalNuevo] = useState<"carpeta" | TipoDocumento | null>(null);
  const [cargando, setCargando] = useState(true);

  const recargar = useCallback(async () => {
    setCargando(true);
    const [raiz, hijos, rutaActual] = await Promise.all([
      repo.listarHijos(null),
      repo.listarHijos(carpetaActual),
      repo.obtenerRuta(carpetaActual),
    ]);
    setCarpetasRaiz(raiz);
    setContenido(ordenar(hijos, sortKey));
    setRuta(rutaActual);
    setCargando(false);
  }, [carpetaActual, sortKey]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  function irACarpeta(id: string | null) {
    setCarpetaActual(id);
    setArchivoSeleccionado(null);
  }

  async function confirmarCreacion(nombre: string) {
    if (modalNuevo === "carpeta") {
      await repo.crearCarpeta(nombre, carpetaActual);
    } else if (modalNuevo) {
      await repo.crearArchivo(nombre, modalNuevo, carpetaActual);
    }
    setModalNuevo(null);
    await recargar();
  }

  async function eliminarItem(id: string) {
    if (usuario.rol !== "admin") {
      window.alert("Solo un administrador puede eliminar.");
      return;
    }
    if (!window.confirm("¿Eliminar este elemento? Esta acción no se puede deshacer.")) return;
    await repo.eliminar(id);
    if (archivoSeleccionado?.id === id) setArchivoSeleccionado(null);
    await recargar();
  }

  async function renombrarItem(id: string, nombreActual: string) {
    const nuevo = window.prompt("Nuevo nombre:", nombreActual);
    if (!nuevo?.trim()) return;
    await repo.renombrar(id, nuevo.trim());
    await recargar();
  }

  const itemsDelMenuContextual: MenuItem[] = menuContextual
    ? [
        {
          label: "Abrir",
          icon: "📂",
          onClick: () =>
            menuContextual.item.tipo === "carpeta"
              ? irACarpeta(menuContextual.item.id)
              : setArchivoSeleccionado(menuContextual.item),
        },
        {
          label: "Renombrar",
          icon: "✏️",
          onClick: () => renombrarItem(menuContextual.item.id, menuContextual.item.nombreCasual),
        },
        { label: "Eliminar", icon: "🗑", danger: true, onClick: () => eliminarItem(menuContextual.item.id) },
      ]
    : [];

  return (
    <div className="flex h-screen bg-white text-sm">
      <Sidebar carpetasRaiz={carpetasRaiz} carpetaActual={carpetaActual} onSelect={irACarpeta} />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between gap-4 px-4 py-2">
          <div className="flex-1 flex flex-col justify-center gap-2">
            <SearchBar />
            <Breadcrumb ruta={ruta} onNavigate={irACarpeta} />
          </div>
          <UserMenu nombre={usuario.nombre} rol={usuario.rol} />
        </header>

        <Toolbar
          onCreateFolder={() => setModalNuevo("carpeta")}
          onCreateFile={(tipo) => setModalNuevo(tipo)}
          onDeleteSelected={() => archivoSeleccionado && eliminarItem(archivoSeleccionado.id)}
          haySeleccion={!!archivoSeleccionado}
          sortKey={sortKey}
          onChangeSort={setSortKey}
          viewMode={viewMode}
          onChangeView={setViewMode}
        />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {cargando && <div className="text-gray-400 text-center mt-16">Cargando...</div>}
            {!cargando && contenido.length === 0 && (
              <div className="text-gray-400 text-center mt-16">Esta carpeta está vacía.</div>
            )}
            {!cargando &&
              contenido.map((item) => (
                <FileRow
                  key={item.id}
                  item={item}
                  seleccionado={archivoSeleccionado?.id === item.id}
                  onOpenFolder={irACarpeta}
                  onSelectFile={(id) => setArchivoSeleccionado(contenido.find((i) => i.id === id) ?? null)}
                  onContextMenu={(item, x, y) => setMenuContextual({ item, x, y })}
                />
              ))}
          </main>

          <aside className="w-80 border-l border-gray-200 flex flex-col">
            <DetailsPanel item={archivoSeleccionado} />
            <PreviewPanel item={archivoSeleccionado} />
          </aside>
        </div>
      </div>

      {menuContextual && (
        <ContextMenu
          x={menuContextual.x}
          y={menuContextual.y}
          items={itemsDelMenuContextual}
          onClose={() => setMenuContextual(null)}
        />
      )}

      {modalNuevo && (
        <NuevoItemModal tipo={modalNuevo} onConfirm={confirmarCreacion} onCancel={() => setModalNuevo(null)} />
      )}
    </div>
  );
}

function ordenar(items: DocumentoItem[], sortKey: SortKey): DocumentoItem[] {
  return [...items].sort((a, b) => {
    if (sortKey === "nombre") return a.nombreCasual.localeCompare(b.nombreCasual);
    if (sortKey === "fecha") return (b.fechaCreacion ?? "").localeCompare(a.fechaCreacion ?? "");
    return (b.size ?? 0) - (a.size ?? 0);
  });
}