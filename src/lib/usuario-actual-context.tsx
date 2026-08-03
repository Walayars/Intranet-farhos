"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { usuarios } from "./mock-data";

type UsuarioActualContextType = {
  usuarioActualId: string;
  setUsuarioActualId: (id: string) => void;
};

const UsuarioActualContext = createContext<UsuarioActualContextType | null>(null);

export function UsuarioActualProvider({ children }: { children: ReactNode }) {
  const [usuarioActualId, setUsuarioActualId] = useState(usuarios[0].id);

  return (
    <UsuarioActualContext.Provider value={{ usuarioActualId, setUsuarioActualId }}>
      {children}
    </UsuarioActualContext.Provider>
  );
}

export function useUsuarioActual() {
  const context = useContext(UsuarioActualContext);
  if (!context) throw new Error("useUsuarioActual debe usarse dentro de UsuarioActualProvider");
  return context;
}