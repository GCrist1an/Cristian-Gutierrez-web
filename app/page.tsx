"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Github,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { useState } from "react";

import { capacidades, proceso, proyectos, tecnologias } from "@/lib/data";

const enlaces = [
  ["Sobre mí", "#sobre-mi"],
  ["Trabajo", "#trabajo"],
  ["Capacidades", "#capacidades"],
  ["Tecnología", "#tecnologia"],
  ["Gutierrez Systems", "#gutierrez-systems"],
] as const;

const aparicion = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

function EtiquetaSeccion({ numero, children }: { numero: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
      <span>{numero}</span>
      <span className="h-px w-8 bg-[var(--accent)]/50" />
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[var(--background)]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir al inicio">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sm font-bold tracking-tight transition group-hover:border-[var(--accent)]/50">
              CG
            </span>
            <span className="hidden text-sm font-medium text-[var(--muted-light)] sm:inline">Cristian Gutiérrez</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
            {enlaces.map(([texto, href]) => (
              <a key={href} href={href} className="text-sm text-[var(--muted)] transition hover:text-white">
                {texto}
              </a>
            ))}
            <a href="#contacto" className="boton-secundario px-4 py-2 text-sm">
              Contacto
            </a>
          </nav>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 lg:hidden"
            onClick={() => setMenuAbierto((estado) => !estado)}
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
              aria-label="Navegación móvil"
            >
              <div className="mx-auto flex max-w-7xl flex-col py-5">
                {enlaces.map(([texto, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="border-b border-white/6 py-4 text-sm text-[var(--muted-light)]"
                    onClick={() => setMenuAbierto(false)}
                  >
                    {texto}
                  </a>
                ))}
                <a href="#contacto" className="mt-5 boton-principal justify-center" onClick={() => setMenuAbierto(false)}>
                  Contacto
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section id="inicio" className="relative min-h-screen scroll-mt-24 pt-28">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span>Software</span><span className="text-white/25">·</span><span>Automatización</span><span className="text-white/25">·</span><span>Operaciones</span>
            </div>

            <h1 className="max-w-4xl text-[clamp(3.4rem,8vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Cristian David<br />
              <span className="texto-gradiente">Gutiérrez</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted-light)] sm:text-xl">
              Transformo procesos operativos en soluciones tecnológicas trazables, eficientes y mantenibles.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#trabajo" className="boton-principal">
                Ver mi trabajo <ArrowDownRight size={18} />
              </a>
              <a href="https://github.com/GCrist1an" target="_blank" rel="noreferrer" className="boton-secundario">
                <Github size={17} /> GitHub
              </a>
              <a href="mailto:cdgutierrez00@gmail.com" className="boton-secundario">
                <Mail size={17} /> Contactar
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-2"><MapPin size={15} /> Colombia</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.7)]" /> Disponible para proyectos y colaboración</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[var(--accent)]/10 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] shadow-2xl shadow-black/35">
              <Image
                src="/images/cristian-gutierrez.webp"
                alt="Retrato profesional de Cristian David Gutiérrez"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover object-[50%_42%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/35 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-lg sm:inset-x-6 sm:bottom-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Enfoque</p>
                <p className="mt-2 text-sm leading-6 text-white/85">Personas · Procesos · Tecnología · Evidencia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="sobre-mi" className="seccion scroll-mt-24">
        <motion.div {...aparicion} className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
          <div>
            <EtiquetaSeccion numero="01">Sobre mí</EtiquetaSeccion>
            <h2 className="titulo-seccion">Operación primero. Tecnología con propósito.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-[var(--muted-light)]">
            <p>
              Trabajo en la intersección entre operaciones y tecnología. Me interesa entender cómo funciona un proceso en la realidad, dónde pierde tiempo, qué información necesita y qué evidencia debe dejar antes de decidir cómo digitalizarlo.
            </p>
            <p>
              Combino liderazgo operativo, automatización y desarrollo de software para construir herramientas que sean claras para quien las usa y mantenibles para quien debe evolucionarlas.
            </p>
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {["Procesos reales", "Trazabilidad", "Mejora continua"].map((item) => (
                <div key={item} className="tarjeta-suave px-4 py-4 text-sm font-medium text-white/90">{item}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="trabajo" className="seccion scroll-mt-24 border-y border-white/6 bg-white/[0.012]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...aparicion} className="mb-12 max-w-3xl">
            <EtiquetaSeccion numero="02">Trabajo seleccionado</EtiquetaSeccion>
            <h2 className="titulo-seccion">Sistemas construidos alrededor de problemas concretos.</h2>
            <p className="mt-5 texto-seccion">Productos propios, herramientas operativas y colaboraciones técnicas con contexto verificable.</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {proyectos.map((proyecto, indice) => (
              <motion.article
                key={proyecto.nombre}
                {...aparicion}
                transition={{ duration: 0.5, delay: indice * 0.06 }}
                className="grupo-tarjeta flex min-h-[300px] flex-col justify-between rounded-3xl border border-white/8 bg-[var(--surface)]/75 p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{proyecto.categoria}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-[var(--muted)]">{proyecto.estado}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">{proyecto.nombre}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-[var(--muted-light)]">{proyecto.descripcion}</p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/7 pt-5">
                  <p className="text-sm text-[var(--muted)]">{proyecto.tecnologia}</p>
                  <ArrowUpRight className="shrink-0 text-white/35 transition group-hover:text-[var(--accent)]" size={19} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="capacidades" className="seccion scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...aparicion} className="mb-12 grid gap-8 lg:grid-cols-2">
            <div>
              <EtiquetaSeccion numero="03">Capacidades</EtiquetaSeccion>
              <h2 className="titulo-seccion">Capacidad técnica conectada con contexto operativo.</h2>
            </div>
            <p className="texto-seccion self-end">No uso porcentajes de dominio. Prefiero mostrar áreas donde puedo aportar con decisiones, ejecución y documentación.</p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {capacidades.map((capacidad, indice) => {
              const Icono = [Code2, Sparkles, Workflow, ShieldCheck, BriefcaseBusiness, Github][indice];
              return (
                <motion.div key={capacidad.titulo} {...aparicion} className="bg-[var(--background)] p-6 sm:p-7">
                  <Icono size={21} className="text-[var(--accent)]" />
                  <h3 className="mt-8 text-lg font-semibold">{capacidad.titulo}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{capacidad.descripcion}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tecnologia" className="seccion scroll-mt-24 border-y border-white/6 bg-white/[0.012]">
        <motion.div {...aparicion} className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <EtiquetaSeccion numero="04">Tecnología</EtiquetaSeccion>
            <h2 className="titulo-seccion">Herramientas al servicio de la solución.</h2>
            <p className="mt-5 texto-seccion">La tecnología cambia. El criterio para elegirla debe permanecer.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tecnologias.map((tecnologia) => (
              <div key={tecnologia} className="tarjeta-suave flex min-h-24 items-end p-4 text-sm font-medium text-white/90 sm:min-h-28">{tecnologia}</div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="como-trabajo" className="seccion">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...aparicion} className="mb-12 max-w-4xl">
            <EtiquetaSeccion numero="05">Cómo trabajo</EtiquetaSeccion>
            <h2 className="titulo-seccion">No empiezo por la tecnología.</h2>
            <p className="mt-5 texto-seccion">Primero entiendo el proceso, las restricciones y la evidencia necesaria. Después diseño una solución proporcional al problema.</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {proceso.map(([numero, titulo, descripcion]) => (
              <motion.div key={numero} {...aparicion} className="tarjeta-suave p-6">
                <span className="font-mono text-xs text-[var(--accent)]">{numero}</span>
                <h3 className="mt-9 text-xl font-semibold">{titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="gutierrez-systems" className="seccion scroll-mt-24">
        <motion.div {...aparicion} className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--accent)]/20 bg-[linear-gradient(135deg,rgba(88,166,255,.10),rgba(22,27,34,.75)_48%,rgba(88,166,255,.04))] p-7 sm:p-10 lg:p-14">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <EtiquetaSeccion numero="06">Gutierrez Systems</EtiquetaSeccion>
                <h2 className="titulo-seccion max-w-3xl">Construyendo un entorno corporativo para software y automatización aplicada.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-light)]">
                  Desarrollo Gutierrez Systems como entorno corporativo para software, automatización, calidad y soluciones aplicadas a operaciones. Mi identidad profesional y la organización se mantienen diferenciadas, pero conectadas por el trabajo técnico.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a href="https://www.gutierrezsystems.online/" target="_blank" rel="noreferrer" className="boton-principal">
                  Sitio corporativo <ArrowUpRight size={17} />
                </a>
                <a href="https://github.com/Gutierrez-Systems" target="_blank" rel="noreferrer" className="boton-secundario">
                  Organización en GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="github" className="seccion border-y border-white/6 bg-white/[0.012]">
        <motion.div {...aparicion} className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10">
          <div className="grid h-32 w-32 place-items-center rounded-[2rem] border border-white/10 bg-white/[0.03] sm:h-40 sm:w-40">
            <Github size={58} strokeWidth={1.2} />
          </div>
          <div>
            <EtiquetaSeccion numero="07">Código y trabajo técnico</EtiquetaSeccion>
            <h2 className="titulo-seccion">GitHub es la evidencia técnica del trabajo.</h2>
            <p className="mt-5 texto-seccion">Repositorios, Pull Requests, CI, documentación y evolución de productos viven donde pueden auditarse y mantenerse.</p>
            <a href="https://github.com/GCrist1an" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline">
              @GCrist1an <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      <section id="contacto" className="seccion scroll-mt-24">
        <motion.div {...aparicion} className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">08 · Contacto</p>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">¿Tienes un proceso que necesita ser más claro, medible o automatizado?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-light)]">Podemos hablar de software, automatización, operaciones digitales o colaboración técnica.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="mailto:cdgutierrez00@gmail.com" className="boton-principal"><Mail size={17} /> Escribirme</a>
            <a href="https://github.com/GCrist1an" target="_blank" rel="noreferrer" className="boton-secundario"><Github size={17} /> GitHub</a>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Cristian David Gutiérrez.</p>
          <p>Software · Automatización · Operaciones</p>
        </div>
      </footer>
    </main>
  );
}
