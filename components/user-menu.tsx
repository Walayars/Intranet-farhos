"use client";

import { signOut } from "next-auth/react";

type UserMenuProps = {
  nombre: string;
  rol: "admin" | "trabajador";
};

export function UserMenu({ nombre, rol }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="text-right leading-tight">
        <div className="font-medium">{nombre}</div>
        <div className="text-xs text-gray-500">{rol === "admin" ? "Administrador" : "Trabajador"}</div>
      </div>
      <button
        onClick={() => signOut({ redirectTo: "/login" })}
        className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
      >
        Salir
      </button>
    </div>
  );
}