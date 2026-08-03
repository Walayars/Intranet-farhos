"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/inicio"); // por ahora no valida nada, solo redirige
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: "320px", padding: "32px", border: "1px solid #eee", borderRadius: "8px" }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: 600 }}>
          Sistema interno
        </h1>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", background: "#111", color: "#fff", borderRadius: "4px" }}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}