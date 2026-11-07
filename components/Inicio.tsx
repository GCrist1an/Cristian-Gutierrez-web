"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { enlaceWhatsApp, ETIQUETAS_ESTADO, type PerfilPublico, type ProyectoPortafolio } from "@/lib/perfil";

const enlaces = [
  ["Trabajo", "#trabajo"],
  ["Habilidades", "#habilidades"],
  ["Gutierrez Systems", "#gutierrez-systems"],
] as const;

/** Títulos de los grupos de habilidades del JSON; si llega un grupo nuevo se usa su clave. */
const TITULOS_GRUPO: Record<string, string> = {
  qa: "QA",
  lenguajes: "Lenguajes",
  desarrollo: "Desarrollo",
  bases_de_datos: "Bases de datos",
  herramientas: "Herramientas",
};
const tituloGrupo = (clave: string) => TITULOS_GRUPO[clave] ?? clave.replace(/_/g, " ");

/** Logos de Simple Icons para las habilidades que tienen uno (slug o slug/color). */
const LOGOS: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  React: "react",
  "Next.js": "nextdotjs/ffffff",
  "Node.js": "nodedotjs",
  Angular: "angular",
  HTML: "html5",
  CSS: "css",
  FastAPI: "fastapi",
  Vite: "vite",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Supabase: "supabase",
  Git: "git",
  GitHub: "github/ffffff",
  "GitHub Actions": "githubactions",
  Vercel: "vercel/ffffff",
  Jira: "jira",
  Notion: "notion/ffffff",
};

const proceso = ["Entender", "Diseñar", "Construir", "Validar", "Documentar", "Mejorar"] as const;

const entrada = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

function TarjetaProyecto({ proyecto }: { proyecto: ProyectoPortafolio }) {
  const { destacado } = proyecto;
  return (
    <motion.article
      {...entrada}
      className={`grupo-tarjeta flex flex-col justify-between rounded-3xl border p-6 ${
        destacado ? "min-h-[280px] border-[var(--accent)]/30 bg-[var(--surface)]" : "min-h-[245px] border-white/8 bg-[var(--surface)]/75"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">{destacado ? "Destacado" : ""}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-[var(--muted)]">{ETIQUETAS_ESTADO[proyecto.estado]}</span>
        </div>
        {proyecto.nombre && <h3 className={`mt-6 font-semibold ${destacado ? "text-2xl" : "text-xl"}`}>{proyecto.nombre}</h3>}
        <p className={`${proyecto.nombre ? "mt-3" : "mt-6"} text-sm leading-6 text-[var(--muted-light)]`}>{proyecto.descripcion}</p>
      </div>
      {(proyecto.stack.length > 0 || proyecto.url) && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/7 pt-4">
          {proyecto.stack.length > 0 && <p className="text-xs text-[var(--muted)]">{proyecto.stack.join(" · ")}</p>}
          {proyecto.url && (
            <a
              href={proyecto.url}
              target="_blank"
              rel="noreferrer"
              className={destacado ? "boton-principal px-4 py-2 text-sm" : "inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"}
            >
              Ver proyecto <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export default function Inicio({ perfil }: { perfil: PerfilPublico }) {
  const { contacto, persona } = perfil;
  const [nombrePila, ...resto] = persona.nombre_corto.split(" ");
  const apellidos = resto.join(" ");
  const destacados = perfil.proyectos.filter((p) => p.destacado);
  const otros = perfil.proyectos.filter((p) => !p.destacado);
  const { habilidades, capacidades } = perfil;
  const gruposTecnicos = Object.entries(habilidades).filter(([grupo, lista]) => grupo !== "qa" && lista.length > 0);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sm font-bold">CG</span>
            <span className="hidden text-sm font-medium text-[var(--muted-light)] sm:inline">{persona.nombre_corto}</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
            {enlaces.map(([texto, href]) => (
              <a key={href} href={href} className="text-sm text-[var(--muted)] transition hover:text-white">
                {texto}
              </a>
            ))}
            <a href="#contacto" className="boton-secundario px-4 py-2 text-sm">Contacto</a>
          </nav>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 lg:hidden"
            onClick={() => setMenuAbierto((valor) => !valor)}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <AnimatePresence>
          {menuAbierto && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/6 bg-[var(--background)] px-5 lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col py-4">
                {enlaces.map(([texto, href]) => (
                  <a key={href} href={href} className="border-b border-white/6 py-3 text-sm" onClick={() => setMenuAbierto(false)}>
                    {texto}
                  </a>
                ))}
                <a href="#contacto" className="mt-4 boton-principal justify-center" onClick={() => setMenuAbierto(false)}>Contacto</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section id="inicio" className="relative scroll-mt-20 pt-24">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pb-16 lg:pt-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{persona.titular}</p>
            <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              {nombrePila}<br /><span className="texto-gradiente">{apellidos}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-light)] sm:text-xl">{persona.frase}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#trabajo" className="boton-principal">Ver mi trabajo <ArrowDownRight size={18} /></a>
              <a href="/cv/CV Cristian Gutierrez ***REMOVED***.pdf" download="Cristian Gutierrez ***REMOVED***.pdf" className="boton-secundario"><ArrowDownRight size={17} /> Descargar CV</a>
            </div>
            <div className="mt-3 flex flex-wrap gap-3" aria-label="Contacto">
              <a href={`mailto:${contacto.correo}`} className="boton-secundario"><Mail size={17} /> Correo</a>
              <a href={enlaceWhatsApp(contacto.whatsapp)} target="_blank" rel="noreferrer" className="boton-secundario"><img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" width="17" height="17" className="h-[17px] w-[17px] object-contain" /> WhatsApp</a>
              <a href={contacto.github} target="_blank" rel="noreferrer" className="boton-secundario"><GitBranch size={17} /> GitHub</a>
              <a href={contacto.linkedin} target="_blank" rel="noreferrer" className="boton-secundario"><BriefcaseBusiness size={17} /> LinkedIn</a>
            </div>
            {(persona.ubicacion || persona.disponibilidad) && (
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
                {persona.ubicacion && <span className="flex items-center gap-2"><MapPin size={15} /> {persona.ubicacion}</span>}
                {persona.disponibilidad && <span>{persona.disponibilidad}</span>}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mx-auto w-full max-w-[430px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] shadow-2xl shadow-black/35">
              <div
                role="img"
                aria-label={`Retrato profesional de ${persona.nombre_corto}`}
                className="aspect-[430/764] w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/images/cristian-gutierrez.webp")' }}
              />
              {persona.enfoque && persona.enfoque.length > 0 && (
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Enfoque</p>
                  <p className="mt-1 text-sm text-white/85">{persona.enfoque.join(" · ")}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="trabajo" className="scroll-mt-20 border-y border-white/6 bg-white/[0.012] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...entrada} className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">01 · Trabajo seleccionado</p>
              <h2 className="mt-3 titulo-seccion">Problemas concretos. Sistemas mantenibles.</h2>
            </div>
          </motion.div>

          {destacados.length > 0 && (
            <div className="grid gap-4 lg:grid-cols-2">
              {destacados.map((proyecto) => <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />)}
            </div>
          )}
          {otros.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otros.map((proyecto) => <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />)}
            </div>
          )}
        </div>
      </section>

      <section id="habilidades" className="scroll-mt-20 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...entrada}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">02 · Habilidades</p>
            <h2 className="mt-3 titulo-seccion">Tecnología conectada con operación.</h2>
          </motion.div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...entrada} className="rounded-3xl border border-[var(--accent)]/30 bg-[var(--surface)] p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">Enfoque principal</p>
              <h3 className="mt-3 text-2xl font-semibold">{tituloGrupo("qa")}</h3>
              <ul className="mt-5 space-y-3">
                {habilidades.qa.map((habilidad) => (
                  <li key={habilidad} className="flex items-start gap-3 text-sm leading-6 text-[var(--muted-light)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    {habilidad}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {gruposTecnicos.map(([grupo, lista]) => (
                <motion.div key={grupo} {...entrada} className="tarjeta-suave p-5">
                  <h3 className="text-base font-semibold">{tituloGrupo(grupo)}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {lista.map((habilidad) => (
                      <li key={habilidad} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-xs text-[var(--muted-light)]">
                        {LOGOS[habilidad] && (
                          <img src={`https://cdn.simpleicons.org/${LOGOS[habilidad]}`} alt="" width="14" height="14" loading="lazy" className="h-3.5 w-3.5 object-contain" />
                        )}
                        {habilidad}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {capacidades && capacidades.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {capacidades.map(({ nombre, descripcion }) => (
                <motion.div key={nombre} {...entrada} className="tarjeta-suave p-5">
                  <h3 className="text-base font-semibold">{nombre}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{descripcion}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...entrada} className="rounded-3xl border border-white/8 bg-[var(--surface)]/55 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">03 · Cómo trabajo</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {proceso.map((paso, indice) => (
                <div key={paso} className="relative rounded-2xl border border-white/7 bg-white/[0.02] px-4 py-4">
                  <span className="text-[10px] font-mono text-[var(--accent)]">0{indice + 1}</span>
                  <p className="mt-2 text-sm font-semibold">{paso}</p>
                  {indice < proceso.length - 1 && <ArrowUpRight size={14} className="absolute right-3 top-3 hidden text-white/25 lg:block" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="gutierrez-systems" className="scroll-mt-20 pb-14 sm:pb-16">
        <motion.div {...entrada} className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div className="rounded-[2rem] border border-[var(--accent)]/20 bg-[linear-gradient(135deg,rgba(88,166,255,.10),rgba(22,27,34,.75))] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">04 · Gutierrez Systems</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">Software y automatización aplicada a operaciones.</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-light)]">Desarrollo Gutierrez Systems como entorno corporativo para software, automatización, calidad y soluciones aplicadas a operaciones.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={contacto.empresa} target="_blank" rel="noreferrer" className="boton-principal">Sitio corporativo <ArrowUpRight size={16} /></a>
              <a href="https://github.com/Gutierrez-Systems" target="_blank" rel="noreferrer" className="boton-secundario"><GitBranch size={16} /> GitHub</a>
              <a href="https://www.facebook.com/GutierrezSystems/" target="_blank" rel="noreferrer" className="boton-secundario"><img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" width="16" height="16" className="h-4 w-4 object-contain" /> Facebook</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/8 bg-[var(--surface)]/70 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Código y evidencia</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">GitHub documenta la evolución del trabajo.</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-light)]">Repositorios, Pull Requests, CI y documentación permiten auditar decisiones y mantener productos con contexto.</p>
            <a href={contacto.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline">@GCrist1an <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>
      </section>

      <section id="contacto" className="border-t border-white/6 py-14 text-center sm:py-16">
        <motion.div {...entrada} className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">05 · Contacto</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">¿Tienes un proceso que necesita ser más claro, medible o automatizado?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted-light)]">Podemos hablar de software, automatización, operaciones digitales o colaboración técnica.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${contacto.correo}`} className="boton-principal"><Mail size={17} /> Escribirme</a>
            <a href={contacto.github} target="_blank" rel="noreferrer" className="boton-secundario"><GitBranch size={17} /> GitHub</a>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[var(--muted)] sm:flex-row sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Cristian David Gutiérrez.</p>
          <p>Software · Automatización · Operaciones</p>
        </div>
      </footer>
    </main>
  );
}
