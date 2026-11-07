import Inicio from "@/components/Inicio";
import { obtenerPerfil } from "@/lib/obtener-perfil";
import { perfilPublico } from "@/lib/perfil";

export const revalidate = 86400;

export default async function Home() {
  const perfil = await obtenerPerfil();
  return <Inicio perfil={perfilPublico(perfil)} />;
}
