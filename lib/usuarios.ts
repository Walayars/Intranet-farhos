import bcrypt from "bcryptjs";

export type Rol = "admin" | "trabajador";

export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  passwordHash: string;
  activo: boolean;
};

// TODO real: reemplazar el cuerpo de buscarUsuarioPorEmail por
// prisma.usuario.findUnique({ where: { email: email.toLowerCase() } })
// (si Prisma devuelve el rol en mayúsculas: rol: u.rol.toLowerCase() as Rol).
const usuarios: Usuario[] = [
  {
    id: "u-1",
    nombre: "Administrador",
    email: "admin@farhos.cl",
    rol: "admin",
    passwordHash: "$2b$10$rQ1UHi6I4i/7FaDbBpHXxeTvwMxfiioxhm28x0kh8Jcw9IcACWzd6",
    activo: true,
  },
  {
    id: "u-2",
    nombre: "Trabajador de prueba",
    email: "trabajador@farhos.cl",
    rol: "trabajador",
    passwordHash: "$2b$10$RBsNQwVYt1buK2I4BxeVPOohg1d4RZ1Ctn6lMTVCdgxFKiPYUq/pe",
    activo: true,
  },
];

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
  return usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function verificarCredenciales(email: string, password: string) {
  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario) return null;
  if (!usuario.activo) return null;
  const ok = await bcrypt.compare(password, usuario.passwordHash);
  if (!ok) return null;
  return { id: usuario.id, name: usuario.nombre, email: usuario.email, role: usuario.rol };
}