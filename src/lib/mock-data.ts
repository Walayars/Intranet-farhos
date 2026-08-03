export type Carpeta = {
  id: string;
  nombre: string;
  carpetaPadreId: string | null; // null = carpeta raíz
};

export type Archivo = {
  id: string;
  nombre: string;
  carpetaId: string;
  tipo: "pdf" | "imagen" | "excel" | "word";
};

export type Rol = {
  id: string;
  nombre: string;
  carpetasPermitidas: string[];
  puedeEditar: boolean; // nuevo
};

export type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rolId: string;
};

export const carpetas: Carpeta[] = [
  { id: "admin", nombre: "Admin", carpetaPadreId: null },
  { id: "templates", nombre: "Templates", carpetaPadreId: null },
  { id: "propuestas", nombre: "Propuestas", carpetaPadreId: null },
  { id: "clientes", nombre: "Clientes", carpetaPadreId: null },
  { id: "pipeline", nombre: "Pipeline", carpetaPadreId: null },
  { id: "modelos", nombre: "Modelos", carpetaPadreId: null },
  { id: "research", nombre: "Research", carpetaPadreId: null },
  { id: "ontier", nombre: "Ontier", carpetaPadreId: null },
  { id: "estrategia", nombre: "Estrategia", carpetaPadreId: null },
  { id: "gestion-patrimonial", nombre: "Gestión Patrimonial", carpetaPadreId: null },
  { id: "investment", nombre: "Investment", carpetaPadreId: null },

  // subcarpetas de ejemplo dentro de Clientes
  { id: "cliente-abc", nombre: "Comercial ABC", carpetaPadreId: "clientes" },
  { id: "cliente-xyz", nombre: "Distribuidora XYZ", carpetaPadreId: "clientes" },
  { id: "cliente-abc-contratos", nombre: "Contratos", carpetaPadreId: "cliente-abc" },
  { id: "cliente-abc-facturas", nombre: "Facturas", carpetaPadreId: "cliente-abc" },
];

export const archivos: Archivo[] = [
  { id: "a1", nombre: "contrato_2026.pdf", carpetaId: "cliente-abc-contratos", tipo: "pdf" },
  { id: "a2", nombre: "factura_junio.pdf", carpetaId: "cliente-abc-facturas", tipo: "pdf" },
];

export const roles: Rol[] = [
  { id: "rol-total", nombre: "Acceso total", carpetasPermitidas: ["admin", "templates", "propuestas", "clientes", "pipeline", "modelos", "research", "ontier", "estrategia", "gestion-patrimonial", "investment"], puedeEditar: true, },
  { id: "rol-limitado", nombre: "Acceso limitado", carpetasPermitidas: ["clientes", "pipeline", "propuestas"], puedeEditar: false },
  { id: "rol-research", nombre: "Solo lectura Research", carpetasPermitidas: ["research", "modelos"], puedeEditar: false },
];

export const usuarios: Usuario[] = [
  { id: "u1", nombre: "Camila Ríos", correo: "camila@empresa.cl", rolId: "rol-total" },
  { id: "u2", nombre: "Marcelo González", correo: "marcelo@empresa.cl", rolId: "rol-limitado" },
  { id: "u3", nombre: "Fernanda Soto", correo: "fernanda@empresa.cl", rolId: "rol-research" },
];


export function subcarpetasDe(carpetaId: string, carpetas: Carpeta[]): Carpeta[] {
  return carpetas.filter((c) => c.carpetaPadreId === carpetaId);
}

export function archivosDe(carpetaId: string, archivos: Archivo[]): Archivo[] {
  return archivos.filter((a) => a.carpetaId === carpetaId);
}

export function rutaDeCarpeta(carpetaId: string, carpetas: Carpeta[]): Carpeta[] {
  const ruta: Carpeta[] = [];
  let actual = carpetas.find((c) => c.id === carpetaId);
  while (actual) {
    ruta.unshift(actual);
    actual = actual.carpetaPadreId
      ? carpetas.find((c) => c.id === actual!.carpetaPadreId)
      : undefined;
  }
  return ruta;
}

export function carpetasVisiblesParaUsuario(usuarioId: string, carpetas: Carpeta[]): Carpeta[] {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) return [];
  const rol = roles.find((r) => r.id === usuario.rolId);
  if (!rol) return [];
  return carpetas.filter((c) => c.carpetaPadreId === null && rol.carpetasPermitidas.includes(c.id));
}