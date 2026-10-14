import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verificarCredenciales } from "@/lib/usuarios";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 }, // 8 horas
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;
        return verificarCredenciales(email, password);
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
    session.user.role = token.role as unknown as "admin" | "trabajador";
    session.user.id = token.id as unknown as string;
    return session; 
    },
  },
});