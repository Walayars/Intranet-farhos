"use client";

import { useUsuarioActual } from "@/lib/usuario-actual-context";
import { usuarios, roles } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectorUsuario() {
  const { usuarioActualId, setUsuarioActualId } = useUsuarioActual();

  return (
    <Select
  value={usuarioActualId}
  onValueChange={(value) => {
    if (value) setUsuarioActualId(value);
  }}
>
      <SelectTrigger className="w-[240px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {usuarios.map((u) => {
          const rol = roles.find((r) => r.id === u.rolId);
          return (
            <SelectItem key={u.id} value={u.id}>
              {u.nombre} — {rol?.nombre}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}