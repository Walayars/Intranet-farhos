import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-96 shadow-sm">
        <h1 className="text-xl font-semibold mb-1">Farhos</h1>
        <p className="text-sm text-gray-500 mb-6">Ingresa con tu cuenta para continuar</p>
        <LoginForm />
      </div>
    </div>
  );
}