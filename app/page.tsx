"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const enlaces = [
  ["Trabajo", "#trabajo"],
  ["Capacidades", "#capacidades"],
  ["Tecnología", "#tecnologia"],
  ["Gutierrez Systems", "#gutierrez-systems"],
] as const;

const proyectos = [
  {
    nombre: "GS ContractOps",
    categoria: "Producto Gutierrez Systems",
    estado: "Discovery",
    descripcion:
      "Operación contractual convertida en un flujo trazable de planificación, ejecución, evidencias, supervisión y entregables.",
    tecnologia: "Next.js · Arquitectura modular · Supabase",
  },
  {
    nombre: "EMINSER Cierre de Nómina",
    categoria: "Automatización operativa",
    estado: "En operación",
    descripcion:
      "Consolidación de asistencia, novedades e incidencias para agilizar la revisión mensual previa al cierre de nómina.",
    tecnologia: "Next.js · React · Supabase",
  },
  {
    nombre: "GS Document Verification",
    categoria: "Producto Gutierrez Systems",
    estado: "Base técnica",
    descripcion:
      "Validación documental, trazabilidad y generación de expedientes verificables para procesos operativos.",
    tecnologia: "React · FastAPI · Python",
  },
] as const;

const capacidades = [
  ["Software", "Construyo soluciones mantenibles alrededor de procesos reales."],
  ["Automatización", "Reduzco trabajo repetitivo con flujos, reglas y evidencia."],
  ["Operaciones", "Conecto equipos, actividades, incidencias y control digital."],
  ["Calidad", "Integro validación, CI, documentación y trazabilidad."],
] as const;

const tecnologias = [
  ["TypeScript", "https://cdn.simpleicons.org/typescript"],
  ["React", "https://cdn.simpleicons.org/react"],
  ["Next.js", "https://cdn.simpleicons.org/nextdotjs/ffffff"],
  ["Python", "https://cdn.simpleicons.org/python"],
  ["FastAPI", "https://cdn.simpleicons.org/fastapi"],
  ["Supabase", "https://cdn.simpleicons.org/supabase"],
  ["GitHub Actions", "https://cdn.simpleicons.org/githubactions"],
  ["Vite", "https://cdn.simpleicons.org/vite"],
] as const;

const proceso = ["Entender", "Diseñar", "Construir", "Validar", "Documentar", "Mejorar"] as const;

const entrada = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sm font-bold">CG</span>
            <span className="hidden text-sm font-medium text-[var(--muted-light)] sm:inline">Cristian Gutiérrez</span>
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
            <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              <span>Software</span><span>·</span><span>Automatización</span><span>·</span><span>Operaciones</span>
            </div>
            <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              Cristian David<br /><span className="texto-gradiente">Gutiérrez</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-light)] sm:text-xl">
              Transformo procesos operativos en soluciones tecnológicas trazables, eficientes y mantenibles.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              Combino operación, automatización y desarrollo de software para construir herramientas claras para quien las usa y mantenibles para quien debe evolucionarlas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#trabajo" className="boton-principal">Ver mi trabajo <ArrowDownRight size={18} /></a>
              <a href="https://github.com/GCrist1an" target="_blank" rel="noreferrer" className="boton-secundario"><GitBranch size={17} /> GitHub</a>
              <a href="mailto:cdgutierrez00@gmail.com" className="boton-secundario"><Mail size={17} /> Contactar</a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-2"><MapPin size={15} /> Colombia</span>
              <span>Disponible para proyectos y colaboración</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mx-auto w-full max-w-[430px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] shadow-2xl shadow-black/35">
              <img
                src="/images/cristian-gutierrez.webp"
                alt="Retrato profesional de Cristian David Gutiérrez"
                width="900"
                height="1125"
                loading="eager"
                fetchPriority="high"
                className="block h-auto w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Enfoque</p>
                <p className="mt-1 text-sm text-white/85">Personas · Procesos · Tecnología · Evidencia</p>
              </div>
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
            <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">Aquality se mantiene como colaboración técnica externa, separada de los productos propios.</p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3">
            {proyectos.map((proyecto) => (
              <motion.article key={proyecto.nombre} {...entrada} className="grupo-tarjeta flex min-h-[245px] flex-col justify-between rounded-3xl border border-white/8 bg-[var(--surface)]/75 p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">{proyecto.categoria}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-[var(--muted)]">{proyecto.estado}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{proyecto.nombre}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-light)]">{proyecto.descripcion}</p>
                </div>
                <p className="mt-5 border-t border-white/7 pt-4 text-xs text-[var(--muted)]">{proyecto.tecnologia}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="capacidades" className="scroll-mt-20 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...entrada}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">02 · Capacidades</p>
            <h2 className="mt-3 titulo-seccion">Tecnología conectada con operación.</h2>
          </motion.div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {capacidades.map(([titulo, descripcion]) => (
              <motion.div key={titulo} {...entrada} className="tarjeta-suave p-5">
                <h3 className="text-base font-semibold">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologia" className="scroll-mt-20 border-y border-white/6 bg-white/[0.012] py-11">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...entrada} className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">03 · Tecnología</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Stack habitual</h2>
            </div>
            <div className="grid flex-1 grid-cols-4 gap-3 sm:grid-cols-8">
              {tecnologias.map(([nombre, logo]) => (
                <div key={nombre} className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/[0.025] p-3 text-center">
                  <img src={logo} alt={`Logo de ${nombre}`} width="30" height="30" loading="lazy" className="h-7 w-7 object-contain" />
                  <span className="text-[11px] leading-4 text-[var(--muted-light)]">{nombre}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...entrada} className="rounded-3xl border border-white/8 bg-[var(--surface)]/55 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">04 · Cómo trabajo</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">05 · Gutierrez Systems</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">Software y automatización aplicada a operaciones.</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-light)]">Desarrollo Gutierrez Systems como entorno corporativo para software, automatización, calidad y soluciones aplicadas a operaciones.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.gutierrezsystems.online/" target="_blank" rel="noreferrer" className="boton-principal">Sitio corporativo <ArrowUpRight size={16} /></a>
              <a href="https://github.com/Gutierrez-Systems" target="_blank" rel="noreferrer" className="boton-secundario"><GitBranch size={16} /> GitHub</a>
              <a href="https://www.facebook.com/GutierrezSystems/" target="_blank" rel="noreferrer" className="boton-secundario"><img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" width="16" height="16" className="h-4 w-4 object-contain" /> Facebook</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/8 bg-[var(--surface)]/70 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Código y evidencia</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">GitHub documenta la evolución del trabajo.</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-light)]">Repositorios, Pull Requests, CI y documentación permiten auditar decisiones y mantener productos con contexto.</p>
            <a href="https://github.com/GCrist1an" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline">@GCrist1an <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>
      </section>

      <section id="contacto" className="border-t border-white/6 py-14 text-center sm:py-16">
        <motion.div {...entrada} className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">06 · Contacto</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">¿Tienes un proceso que necesita ser más claro, medible o automatizado?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted-light)]">Podemos hablar de software, automatización, operaciones digitales o colaboración técnica.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="mailto:cdgutierrez00@gmail.com" className="boton-principal"><Mail size={17} /> Escribirme</a>
            <a href="https://github.com/GCrist1an" target="_blank" rel="noreferrer" className="boton-secundario"><GitBranch size={17} /> GitHub</a>
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