"use client";

import { useState } from "react";
import { DocumentoItem, esCarpeta, getIcono, getNombreTipo, formatSize, formatFecha } from "@/lib/documento-types";

const COLOR_ESTADO: Record<string, string> = {
  "Terminado": "bg-green-100 text-green-700",
  "En proceso": "bg-yellow-100 text-yellow-700",
  "Enviar cliente": "bg-blue-100 text-blue-700",
  "Revisar": "bg-red-100 text-red-700",
};

function CeldaFecha({ etiqueta, fecha }: { etiqueta: string; fecha?: string }) {
  return (
    <div className="w-24 leading-tight">
      <div className="text-[10px] text-gray-400">{etiqueta}</div>
      <div className="text-gray-600 text-xs">{formatFecha(fecha)}</div>
    </div>
  );
}

type FileRowProps = {
  item: DocumentoItem;
  seleccionado: boolean;
  onOpenFolder: (id: string) => void;
  onSelectFile: (id: string) => void;
  onContextMenu: (item: DocumentoItem, x: number, y: number) => void;
};

export function FileRow({ item, seleccionado, onOpenFolder, onSelectFile, onContextMenu }: FileRowProps) {
  const [versionesAbiertas, setVersionesAbiertas] = useState(false);
  const [comentarioAbierto, setComentarioAbierto] = useState(false);
  const [textoComentario, setTextoComentario] = useState(item.comentario ?? "");

  const tieneVersiones = item.versiones && item.versiones.length > 0;

  function handleClickFila() {
    if (esCarpeta(item)) {
      onOpenFolder(item.id);
    } else {
      onSelectFile(item.id);
    }
  }

  return (
    <div className="border-b border-gray-100">
      <div
        onClick={handleClickFila}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu(item, e.clientX, e.clientY);
        }}
        className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-sm ${
          seleccionado ? "bg-blue-100" : "hover:bg-gray-50"
        }`}
      >
        <span className="text-lg w-6">{getIcono(item.tipo)}</span>

        <div className="flex-1 min-w-0">
          <div className="truncate text-gray-400 italic text-xs">
            {item.nombreEstandar || "(sin nombre estándar aún)"}
          </div>
          <div className="truncate font-medium">{item.nombreCasual}</div>
        </div>

        {!esCarpeta(item) && (
          <span className="w-24 text-gray-500">{getNombreTipo(item.tipo)}</span>
        )}

        {!esCarpeta(item) && (
          <span className="w-20 text-gray-500">{formatSize(item.size)}</span>
        )}

        {!esCarpeta(item) && <CeldaFecha etiqueta="Creado" fecha={item.fechaCreacion} />}
        {!esCarpeta(item) && <CeldaFecha etiqueta="Modificado" fecha={item.fechaModificacion} />}

        {!esCarpeta(item) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setVersionesAbiertas(!versionesAbiertas);
            }}
            className={`w-6 text-gray-400 hover:text-gray-700 ${!tieneVersiones ? "invisible" : ""}`}
          >
            {versionesAbiertas ? "▲" : "▼"}
          </button>
        )}

        {item.estado && (
          <span className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${COLOR_ESTADO[item.estado]}`}>
            {item.estado}
          </span>
        )}

        {!esCarpeta(item) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setComentarioAbierto(!comentarioAbierto);
            }}
            className="w-6 text-gray-400 hover:text-gray-700"
          >
            💬
          </button>
        )}
      </div>

      {versionesAbiertas && tieneVersiones && (
        <div className="bg-gray-50 pl-12 pr-3 py-2 space-y-1">
          {item.versiones!.map((v) => (
            <div key={v.id} className="flex items-center gap-3 text-xs text-gray-600 py-1">
              <span>{getIcono(v.tipo)}</span>
              <span className="flex-1">{v.nombreCasual}</span>
              <span className="w-20">{formatSize(v.size)}</span>
              <CeldaFecha etiqueta="Creado" fecha={v.fechaCreacion} />
              <CeldaFecha etiqueta="Modificado" fecha={v.fechaModificacion} />
              <button className="text-blue-600 hover:underline">Hacer principal</button>
            </div>
          ))}
        </div>
      )}

      {comentarioAbierto && (
        <div className="bg-gray-50 px-3 py-2">
          <textarea
            value={textoComentario}
            onChange={(e) => setTextoComentario(e.target.value)}
            placeholder="Escribe un comentario sobre este documento..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}