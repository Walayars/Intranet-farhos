import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "admin" | "trabajador";
  }
  interface Session {
    user: { id: string; role: "admin" | "trabajador" } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "admin" | "trabajador";
    id?: string;
  }
}