import respaldo from "../data/perfil.json";
import { validarPerfil, type Perfil } from "./perfil";

export const URL_PERFIL = "https://raw.githubusercontent.com/GCrist1an/GCrist1an/main/perfil.json";
export const REVALIDAR_SEGUNDOS = 60 * 60 * 24;

/**
 * Lee perfil.json desde GitHub (server-side, revalidación diaria).
 * Si la descarga o la validación fallan, usa el respaldo local data/perfil.json.
 * Solo debe importarse desde componentes de servidor.
 */
export async function obtenerPerfil(): Promise<Perfil> {
  try {
    const respuesta = await fetch(URL_PERFIL, { next: { revalidate: REVALIDAR_SEGUNDOS } });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    return validarPerfil(await respuesta.json());
  } catch (error) {
    console.warn("[perfil] Usando respaldo data/perfil.json:", error instanceof Error ? error.message : error);
    return validarPerfil(respaldo);
  }
}
