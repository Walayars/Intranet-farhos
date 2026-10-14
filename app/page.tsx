import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Explorador } from "@/components/explorador";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <Explorador
      usuario={{ nombre: session.user.name ?? "Usuario", rol: session.user.role }}
    />
  );
}