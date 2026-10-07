"use client";

import { useState } from "react";
import { DocumentoItem, getIcono, getNombreTipo, formatSize } from "@/lib/documento-types";

type DetailsPanelProps = {
  item: DocumentoItem | null;
};

export function DetailsPanel({ item }: DetailsPanelProps) {
  const [copiado, setCopiado] = useState(false);

  if (!item) {
    return (
      <div className="border-b border-gray-200 p-4 text-gray-400 text-center text-sm">
        Selecciona un archivo para ver sus detalles
      </div>
    );
  }

  function handleCompartir() {
    navigator.clipboard.writeText(item!.webUrl ?? "");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="border-b border-gray-200 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{getIcono(item.tipo)}</span>
        <div className="min-w-0">
          <div className="font-medium truncate">{item.nombreCasual}</div>
          <div className="text-xs text-gray-400 truncate">
            {item.nombreEstandar || "(sin nombre estándar aún)"}
          </div>
        </div>
      </div>

      <dl className="text-sm space-y-1.5">
        <div className="flex justify-between">
          <dt className="text-gray-500">Tipo</dt>
          <dd>{getNombreTipo(item.tipo)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Tamaño</dt>
          <dd>{formatSize(item.size)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Creado</dt>
          <dd>{item.fechaCreacion ? new Date(item.fechaCreacion).toLocaleDateString("es-CL") : "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Creado por</dt>
          <dd>{item.creadoPor ?? "—"}</dd>
        </div>
      </dl>

      <button
        onClick={handleCompartir}
        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        {copiado ? "✓ Link copiado" : "🔗 Compartir"}
      </button>
    </div>
  );
}