"use client";

import { useState, useRef } from "react";
import { ContextMenu } from "./context-menu";
import { TipoDocumento } from "@/lib/documento-types";

export type SortKey = "nombre" | "fecha" | "tamaño";
export type ViewMode = "lista" | "cuadricula";

type ToolbarProps = {
  onCreateFolder: () => void;
  onCreateFile: (tipo: TipoDocumento) => void;
  onDeleteSelected: () => void;
  haySeleccion: boolean;
  sortKey: SortKey;
  onChangeSort: (key: SortKey) => void;
  viewMode: ViewMode;
  onChangeView: (mode: ViewMode) => void;
};

export function Toolbar({
  onCreateFolder, onCreateFile, onDeleteSelected, haySeleccion,
  sortKey, onChangeSort, viewMode, onChangeView,
}: ToolbarProps) {
  const [menuAbierto, setMenuAbierto] = useState<"nuevo" | "orden" | "vista" | null>(null);
  const nuevoBtnRef = useRef<HTMLButtonElement>(null);
  const ordenBtnRef = useRef<HTMLButtonElement>(null);
  const vistaBtnRef = useRef<HTMLButtonElement>(null);

  function posicionDe(ref: React.RefObject<HTMLButtonElement | null>) {
    const rect = ref.current?.getBoundingClientRect();
    return { x: rect?.left ?? 0, y: (rect?.bottom ?? 0) + 4 };
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200">
      <button
        ref={nuevoBtnRef}
        onClick={() => setMenuAbierto("nuevo")}
        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
      >
        + Nuevo <span>›</span>
      </button>

      <button
        ref={ordenBtnRef}
        onClick={() => setMenuAbierto("orden")}
        className="px-3 py-1.5 rounded text-sm border border-gray-300 hover:bg-gray-50"
      >
        ↕ Ordenar
      </button>

      <button
        ref={vistaBtnRef}
        onClick={() => setMenuAbierto("vista")}
        className="px-3 py-1.5 rounded text-sm border border-gray-300 hover:bg-gray-50"
      >
        ⊞ Vista
      </button>

      {haySeleccion && (
        <button
          onClick={onDeleteSelected}
          className="px-3 py-1.5 rounded text-sm border border-red-300 text-red-600 hover:bg-red-50"
        >
          🗑 Eliminar
        </button>
      )}

      {menuAbierto === "nuevo" && (
        <ContextMenu
          {...posicionDe(nuevoBtnRef)}
          onClose={() => setMenuAbierto(null)}
          items={[
            { label: "Carpeta", icon: "📁", onClick: onCreateFolder },
            { label: "Documento Word", icon: "📘", onClick: () => onCreateFile("word") },
            { label: "Hoja de cálculo Excel", icon: "📗", onClick: () => onCreateFile("excel") },
            { label: "Presentación PowerPoint", icon: "📙", onClick: () => onCreateFile("powerpoint") },
          ]}
        />
      )}

      {menuAbierto === "orden" && (
        <ContextMenu
          {...posicionDe(ordenBtnRef)}
          onClose={() => setMenuAbierto(null)}
          items={[
            { label: `Nombre${sortKey === "nombre" ? " ✓" : ""}`, onClick: () => onChangeSort("nombre") },
            { label: `Fecha${sortKey === "fecha" ? " ✓" : ""}`, onClick: () => onChangeSort("fecha") },
            { label: `Tamaño${sortKey === "tamaño" ? " ✓" : ""}`, onClick: () => onChangeSort("tamaño") },
          ]}
        />
      )}

      {menuAbierto === "vista" && (
        <ContextMenu
          {...posicionDe(vistaBtnRef)}
          onClose={() => setMenuAbierto(null)}
          items={[
            { label: `Lista${viewMode === "lista" ? " ✓" : ""}`, onClick: () => onChangeView("lista") },
            { label: `Cuadrícula${viewMode === "cuadricula" ? " ✓" : ""}`, onClick: () => onChangeView("cuadricula") },
          ]}
        />
      )}
    </div>
  );
}