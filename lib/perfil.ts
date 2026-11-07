import respaldo from "../data/perfil.json";

export const URL_PERFIL = "https://raw.githubusercontent.com/GCrist1an/GCrist1an/main/perfil.json";
export const REVALIDAR_SEGUNDOS = 60 * 60 * 24;

export const ESTADOS = ["produccion", "publicado", "desarrollo", "colaboracion", "academico", "privado"] as const;
export type EstadoProyecto = (typeof ESTADOS)[number];

export const ETIQUETAS_ESTADO: Record<EstadoProyecto, string> = {
  produccion: "Producción",
  publicado: "Publicado",
  desarrollo: "Desarrollo",
  colaboracion: "Colaboración",
  academico: "Académico",
  privado: "Privado",
};

export type Persona = {
  nombre: string;
  nombre_corto: string;
  titular: string;
  frase: string;
  ubicacion?: string;
  disponibilidad?: string;
  sobre_mi?: string;
};

export type Contacto = {
  correo: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  empresa: string;
  portafolio?: string;
};

export type Proyecto = {
  id: string;
  nombre: string;
  tipo?: string;
  estado: EstadoProyecto;
  mostrar_nombre: boolean;
  descripcion: string;
  stack: string[];
  url: string | null;
  canales: string[];
};

export type Capacidad = { nombre: string; descripcion: string };

export type Habilidades = { qa: string[] } & Record<string, string[]>;

export type Perfil = {
  version?: string;
  actualizado?: string;
  persona: Persona;
  contacto: Contacto;
  habilidades: Habilidades;
  proyectos: Proyecto[];
  capacidades?: Capacidad[];
  servicios?: { nombre: string; descripcion: string }[];
  experiencia?: { cargo: string; empresa: string; inicio: string | null; fin: string | null; resumen: string }[];
  formacion?: { titulo: string; institucion: string; estado: string }[];
  idiomas?: { idioma: string; nivel: string }[];
};

/** Proyecto listo para mostrar: `nombre` es null cuando no se debe revelar. */
export type ProyectoPortafolio = Omit<Proyecto, "nombre"> & { nombre: string | null };

// ---------- Validación ----------

type Objeto = Record<string, unknown>;

const esObjeto = (v: unknown): v is Objeto => typeof v === "object" && v !== null && !Array.isArray(v);
const esTexto = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const esListaTextos = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

function exigirTextos(objeto: Objeto, campos: string[], ruta: string, errores: string[]) {
  for (const campo of campos) {
    if (!esTexto(objeto[campo])) errores.push(`${ruta}.${campo} debe ser un texto no vacío`);
  }
}

/** Valida la forma del perfil. Lanza un Error con la lista de problemas si no es válido. */
export function validarPerfil(datos: unknown): Perfil {
  const errores: string[] = [];

  if (!esObjeto(datos)) throw new Error("perfil.json inválido: la raíz debe ser un objeto");

  const { persona, contacto, habilidades, proyectos, capacidades } = datos;

  if (esObjeto(persona)) exigirTextos(persona, ["nombre", "nombre_corto", "titular", "frase"], "persona", errores);
  else errores.push("persona debe ser un objeto");

  if (esObjeto(contacto)) exigirTextos(contacto, ["correo", "whatsapp", "linkedin", "github", "empresa"], "contacto", errores);
  else errores.push("contacto debe ser un objeto");

  if (esObjeto(habilidades)) {
    if (!esListaTextos(habilidades.qa)) errores.push("habilidades.qa debe ser una lista de textos");
    for (const [grupo, lista] of Object.entries(habilidades)) {
      if (!esListaTextos(lista)) errores.push(`habilidades.${grupo} debe ser una lista de textos`);
    }
  } else errores.push("habilidades debe ser un objeto");

  if (Array.isArray(proyectos)) {
    proyectos.forEach((p, i) => {
      const ruta = `proyectos[${i}]`;
      if (!esObjeto(p)) return void errores.push(`${ruta} debe ser un objeto`);
      exigirTextos(p, ["id", "nombre", "descripcion"], ruta, errores);
      if (!ESTADOS.includes(p.estado as EstadoProyecto)) errores.push(`${ruta}.estado desconocido: ${String(p.estado)}`);
      if (typeof p.mostrar_nombre !== "boolean") errores.push(`${ruta}.mostrar_nombre debe ser booleano`);
      if (!esListaTextos(p.stack)) errores.push(`${ruta}.stack debe ser una lista de textos`);
      if (!esListaTextos(p.canales)) errores.push(`${ruta}.canales debe ser una lista de textos`);
      if (p.url !== null && !esTexto(p.url)) errores.push(`${ruta}.url debe ser texto o null`);
    });
  } else errores.push("proyectos debe ser una lista");

  if (capacidades !== undefined) {
    if (!Array.isArray(capacidades)) errores.push("capacidades debe ser una lista");
    else
      capacidades.forEach((c, i) => {
        if (esObjeto(c)) exigirTextos(c, ["nombre", "descripcion"], `capacidades[${i}]`, errores);
        else errores.push(`capacidades[${i}] debe ser un objeto`);
      });
  }

  if (errores.length > 0) throw new Error(`perfil.json inválido:\n- ${errores.join("\n- ")}`);
  return datos as Perfil;
}

// ---------- Carga ----------

/**
 * Lee perfil.json desde GitHub (server-side, revalidación diaria).
 * Si la descarga o la validación fallan, usa el respaldo local data/perfil.json.
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

// ---------- Utilidades de presentación ----------

/** Proyectos marcados para el canal "portafolio", ocultando el nombre si mostrar_nombre es false. */
export function proyectosPortafolio(perfil: Perfil): ProyectoPortafolio[] {
  return perfil.proyectos
    .filter((p) => p.canales.includes("portafolio"))
    .map((p) => ({ ...p, nombre: p.mostrar_nombre ? p.nombre : null }));
}

/** Datos que se envían al navegador: nada de proyectos fuera del canal portafolio ni nombres ocultos. */
export type PerfilPublico = Pick<Perfil, "persona" | "contacto" | "habilidades" | "capacidades"> & {
  proyectos: ProyectoPortafolio[];
};

export function perfilPublico(perfil: Perfil): PerfilPublico {
  const { persona, contacto, habilidades, capacidades } = perfil;
  return { persona, contacto, habilidades, capacidades, proyectos: proyectosPortafolio(perfil) };
}

/** Enlace wa.me a partir del número del JSON (solo dígitos). */
export function enlaceWhatsApp(numero: string): string {
  return `https://wa.me/${numero.replace(/\D/g, "")}`;
}
