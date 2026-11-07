import { ImageResponse } from "next/og";
import { obtenerPerfil } from "@/lib/obtener-perfil";

// Imagen para compartir en LinkedIn, WhatsApp, etc. Usa los colores del tema del sitio.
export const alt = "Cristian Gutiérrez · Portafolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default async function Image() {
  const { persona } = await obtenerPerfil();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 60%, #1d2430 100%)",
          color: "#f0f6fc",
        }}
      >
        <div style={{ display: "flex", marginBottom: 40, height: 6, width: 160, borderRadius: 3, background: "#58a6ff" }} />
        <div style={{ display: "flex", fontSize: 28, color: "#58a6ff", letterSpacing: 2, textTransform: "uppercase" }}>
          {persona.titular}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 104, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          {persona.nombre_corto}
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 36, color: "#b1bac4", maxWidth: 980, lineHeight: 1.35 }}>
          {persona.frase}
        </div>
      </div>
    ),
    size,
  );
}
