import type { Metadata } from "next";
import { obtenerPerfil } from "@/lib/obtener-perfil";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { persona, contacto } = await obtenerPerfil();
  const titulo = `${persona.nombre_corto} | ${persona.titular}`;
  const descripcion = persona.frase;
  const url = contacto.portafolio;

  return {
    ...(url && { metadataBase: new URL(url), alternates: { canonical: "/" } }),
    title: titulo,
    description: descripcion,
    keywords: [persona.nombre, persona.nombre_corto, ...persona.titular.split(" · ")],
    authors: [{ name: persona.nombre, url }],
    creator: persona.nombre,
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: url ?? undefined,
      siteName: persona.nombre_corto,
      title: titulo,
      description: descripcion,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
