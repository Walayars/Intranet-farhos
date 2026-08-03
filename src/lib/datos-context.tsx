"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { carpetas as carpetasIniciales, archivos as archivosIniciales, Carpeta, Archivo } from "./mock-data";

type DatosContextType = {
  carpetas: Carpeta[];
  archivos: Archivo[];
  agregarCarpeta: (nombre: string, carpetaPadreId: string | null) => void;
  renombrarCarpeta: (id: string, nuevoNombre: string) => void;
  eliminarCarpeta: (id: string) => void;
  agregarArchivo: (nombre: string, carpetaId: string, tipo: Archivo["tipo"]) => void;
  eliminarArchivo: (id: string) => void;
};

const DatosContext = createContext<DatosContextType | null>(null);

export function DatosProvider({ children }: { children: ReactNode }) {
  const [carpetas, setCarpetas] = useState<Carpeta[]>(carpetasIniciales);
  const [archivos, setArchivos] = useState<Archivo[]>(archivosIniciales);

  function agregarCarpeta(nombre: string, carpetaPadreId: string | null) {
    setCarpetas((prev) => [...prev, { id: `carpeta-${Date.now()}`, nombre, carpetaPadreId }]);
  }

  function renombrarCarpeta(id: string, nuevoNombre: string) {
    setCarpetas((prev) => prev.map((c) => (c.id === id ? { ...c, nombre: nuevoNombre } : c)));
  }

  function eliminarCarpeta(id: string) {
    // elimina la carpeta + todas sus subcarpetas (en cualquier nivel) + sus archivos
    const idsAEliminar = new Set<string>([id]);
    let cambiado = true;
    while (cambiado) {
      cambiado = false;
      carpetas.forEach((c) => {
        if (c.carpetaPadreId && idsAEliminar.has(c.carpetaPadreId) && !idsAEliminar.has(c.id)) {
          idsAEliminar.add(c.id);
          cambiado = true;
        }
      });
    }
    setCarpetas((prev) => prev.filter((c) => !idsAEliminar.has(c.id)));
    setArchivos((prev) => prev.filter((a) => !idsAEliminar.has(a.carpetaId)));
  }

  function agregarArchivo(nombre: string, carpetaId: string, tipo: Archivo["tipo"]) {
    setArchivos((prev) => [...prev, { id: `archivo-${Date.now()}`, nombre, carpetaId, tipo }]);
  }

  function eliminarArchivo(id: string) {
    setArchivos((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <DatosContext.Provider value={{ carpetas, archivos, agregarCarpeta, renombrarCarpeta, eliminarCarpeta, agregarArchivo, eliminarArchivo }}>
      {children}
    </DatosContext.Provider>
  );
}

export function useDatos() {
  const context = useContext(DatosContext);
  if (!context) throw new Error("useDatos debe usarse dentro de DatosProvider");
  return context;
}