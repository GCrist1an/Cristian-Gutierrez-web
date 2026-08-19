export type Proyecto = {
  nombre: string;
  categoria: string;
  descripcion: string;
  tecnologia: string;
  estado: string;
};

export const proyectos: Proyecto[] = [
  {
    nombre: "GS ContractOps",
    categoria: "Producto Gutierrez Systems",
    descripcion:
      "Plataforma en descubrimiento para convertir la operación contractual en un flujo trazable de planificación, ejecución, evidencias, supervisión y entregables.",
    tecnologia: "Next.js · Arquitectura modular · Supabase",
    estado: "Discovery",
  },
  {
    nombre: "EMINSER Cierre de Nómina",
    categoria: "Automatización operativa",
    descripcion:
      "Herramienta privada para consolidar asistencia, novedades e incidencias y facilitar la revisión mensual previa al cierre de nómina.",
    tecnologia: "Next.js · React · Supabase",
    estado: "En operación",
  },
  {
    nombre: "GS Document Verification",
    categoria: "Producto Gutierrez Systems",
    descripcion:
      "Sistema privado orientado a validación documental, trazabilidad y generación de expedientes verificables para procesos operativos.",
    tecnologia: "React · FastAPI · Python",
    estado: "Base técnica",
  },
  {
    nombre: "Aquality",
    categoria: "Colaboración externa",
    descripcion:
      "Participación técnica en un proyecto de terceros, manteniendo clara la separación entre colaboración profesional y propiedad de producto.",
    tecnologia: "Colaboración técnica",
    estado: "Externo",
  },
];

export const capacidades = [
  {
    titulo: "Ingeniería de software",
    descripcion: "Construcción de soluciones mantenibles, enfocadas en resolver procesos reales y no solo en producir interfaces.",
  },
  {
    titulo: "Automatización",
    descripcion: "Reducción de tareas repetitivas mediante flujos digitales, reglas claras y evidencia verificable.",
  },
  {
    titulo: "Operaciones digitales",
    descripcion: "Diseño de herramientas que conectan equipos, actividades, seguimiento, incidencias y control operativo.",
  },
  {
    titulo: "Calidad y confiabilidad",
    descripcion: "Validación, CI, trazabilidad y criterios de aceptación como parte del proceso de entrega.",
  },
  {
    titulo: "Arquitectura",
    descripcion: "Decisiones técnicas proporcionales al problema, priorizando simplicidad, modularidad y capacidad de evolución.",
  },
  {
    titulo: "Documentación técnica",
    descripcion: "Documentación útil para operar, mantener y transferir conocimiento sin depender de memoria informal.",
  },
];

export const tecnologias = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "Supabase",
  "GitHub Actions",
  "Vite",
];

export const proceso = [
  ["01", "Entender", "Proceso, restricciones y evidencia necesaria."],
  ["02", "Diseñar", "Flujo, responsabilidades y arquitectura proporcional."],
  ["03", "Construir", "Implementación incremental con criterios claros."],
  ["04", "Validar", "Calidad funcional, técnica y operativa."],
  ["05", "Documentar", "Decisiones, uso y mantenimiento."],
  ["06", "Mejorar", "Aprendizaje basado en operación real."],
] as const;
