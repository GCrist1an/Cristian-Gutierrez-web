import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristian David Gutiérrez | Software, Automatización y Operaciones",
  description:
    "Perfil profesional de Cristian David Gutiérrez. Ingeniería de software, automatización y soluciones tecnológicas aplicadas a procesos operativos.",
  keywords: [
    "Cristian David Gutiérrez",
    "software",
    "automatización",
    "operaciones",
    "Next.js",
    "TypeScript",
    "Gutierrez Systems",
  ],
  authors: [{ name: "Cristian David Gutiérrez" }],
  creator: "Cristian David Gutiérrez",
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "Cristian David Gutiérrez | Software, Automatización y Operaciones",
    description:
      "Transformo procesos operativos en soluciones tecnológicas trazables, eficientes y mantenibles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
