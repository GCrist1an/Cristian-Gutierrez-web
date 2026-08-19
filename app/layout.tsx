import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristian David Gutiérrez | Software, Automatización y Operaciones",
  description:
    "Perfil profesional de Cristian David Gutiérrez. Ingeniería de software, automatización y soluciones tecnológicas aplicadas a procesos operativos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
