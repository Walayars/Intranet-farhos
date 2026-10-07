"use client";

import { useState } from "react";
import { TipoDocumento } from "@/lib/documento-types";

type NuevoItemModalProps = {
  tipo: "carpeta" | TipoDocumento;
  onConfirm: (nombre: string) => void;
  onCancel: () => void;
};

export function NuevoItemModal({ tipo, onConfirm, onCancel }: NuevoItemModalProps) {
  const [nombre, setNombre] = useState("");

  const titulo = tipo === "carpeta" ? "Nueva carpeta" : `Nuevo documento ${tipo}`;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-5 w-96">
        <h3 className="font-medium mb-3">{titulo}</h3>
        <input
          autoFocus
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && nombre.trim() && onConfirm(nombre.trim())}
          placeholder="Nombre"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            Cancelar
          </button>
          <button
            onClick={() => nombre.trim() && onConfirm(nombre.trim())}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}