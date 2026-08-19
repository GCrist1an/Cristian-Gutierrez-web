export default function Home() {
  return (
    <main className="min-h-screen px-6 py-20 sm:px-10 lg:px-16">
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          Software · Automatización · Operaciones
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Cristian David Gutiérrez
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
          Transformo procesos operativos en soluciones tecnológicas trazables, eficientes y mantenibles.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            className="rounded-md bg-[var(--foreground)] px-5 py-3 font-medium text-[var(--background)]"
            href="https://github.com/GCrist1an"
          >
            Ver GitHub
          </a>
          <a
            className="rounded-md border border-[var(--border)] px-5 py-3 font-medium"
            href="mailto:cdgutierrez00@gmail.com"
          >
            Contactar
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-[var(--border)] py-16">
        <p className="max-w-2xl text-[var(--muted)]">
          Fundación técnica lista. Las secciones completas de Sobre mí, Trabajo seleccionado, Capacidades,
          Tecnología, Forma de trabajo y Gutierrez Systems se desarrollarán en la siguiente fase.
        </p>
      </section>
    </main>
  );
}
