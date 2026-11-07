import { afterEach, describe, expect, it, vi } from "vitest";
import respaldo from "../data/perfil.json";
import { enlaceWhatsApp, obtenerPerfil, perfilPublico, proyectosPortafolio, validarPerfil, type Perfil } from "./perfil";

const copia = (): Perfil => structuredClone(respaldo) as Perfil;

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("validarPerfil", () => {
  it("acepta el respaldo data/perfil.json", () => {
    expect(() => validarPerfil(respaldo)).not.toThrow();
  });

  it("acepta un perfil sin el campo opcional capacidades", () => {
    const perfil = copia();
    delete perfil.capacidades;
    expect(() => validarPerfil(perfil)).not.toThrow();
  });

  it("rechaza si falta persona.titular", () => {
    const perfil = copia() as unknown as { persona: Record<string, unknown> };
    delete perfil.persona.titular;
    expect(() => validarPerfil(perfil)).toThrow(/persona\.titular/);
  });

  it("rechaza un contacto sin whatsapp", () => {
    const perfil = copia() as unknown as { contacto: Record<string, unknown> };
    perfil.contacto.whatsapp = "";
    expect(() => validarPerfil(perfil)).toThrow(/contacto\.whatsapp/);
  });

  it("rechaza un estado de proyecto desconocido", () => {
    const perfil = copia() as unknown as { proyectos: { estado: string }[] };
    perfil.proyectos[0].estado = "inventado";
    expect(() => validarPerfil(perfil)).toThrow(/estado desconocido/);
  });

  it("rechaza mostrar_nombre no booleano", () => {
    const perfil = copia() as unknown as { proyectos: { mostrar_nombre: unknown }[] };
    perfil.proyectos[0].mostrar_nombre = "si";
    expect(() => validarPerfil(perfil)).toThrow(/mostrar_nombre/);
  });

  it("rechaza datos que no son objeto", () => {
    expect(() => validarPerfil(null)).toThrow();
    expect(() => validarPerfil([])).toThrow();
  });
});

describe("obtenerPerfil", () => {
  it("usa el JSON remoto cuando la descarga funciona", async () => {
    const remoto = copia();
    remoto.persona.frase = "Frase remota";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(remoto))));
    const perfil = await obtenerPerfil();
    expect(perfil.persona.frase).toBe("Frase remota");
  });

  it("pide revalidación diaria", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(respaldo)));
    vi.stubGlobal("fetch", fetchMock);
    await obtenerPerfil();
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ next: { revalidate: 86400 } });
  });

  it.each([
    ["error de red", () => Promise.reject(new Error("sin conexión"))],
    ["HTTP 500", () => Promise.resolve(new Response("error", { status: 500 }))],
    ["JSON inválido", () => Promise.resolve(new Response("{no-json"))],
    ["JSON sin campos obligatorios", () => Promise.resolve(new Response(JSON.stringify({ persona: {} })))],
  ])("usa el respaldo ante %s", async (_caso, respuesta) => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn(respuesta));
    const perfil = await obtenerPerfil();
    expect(perfil).toEqual(respaldo);
  });
});

describe("proyectosPortafolio", () => {
  it("solo incluye proyectos con el canal portafolio", () => {
    const perfil = copia();
    const ids = proyectosPortafolio(perfil).map((p) => p.id);
    const esperados = perfil.proyectos.filter((p) => p.canales.includes("portafolio")).map((p) => p.id);
    expect(ids).toEqual(esperados);
    expect(ids).not.toContain("gs-contractops");
  });

  it("oculta el nombre si mostrar_nombre es false", () => {
    const perfil = copia();
    perfil.proyectos[0].mostrar_nombre = false;
    const [primero] = proyectosPortafolio(perfil);
    expect(primero.nombre).toBeNull();
    expect(primero.descripcion).toBe(perfil.proyectos[0].descripcion);
  });
});

describe("perfilPublico", () => {
  it("no expone proyectos fuera del portafolio ni nombres ocultos", () => {
    const perfil = copia();
    perfil.proyectos[0].mostrar_nombre = false;
    const json = JSON.stringify(perfilPublico(perfil));
    const fuera = perfil.proyectos.filter((p) => !p.canales.includes("portafolio"));
    expect(fuera.length).toBeGreaterThan(0);
    for (const p of fuera) expect(json).not.toContain(p.descripcion);
    expect(json).not.toContain(`"${perfil.proyectos[0].nombre}"`);
    expect(json).not.toContain("experiencia");
  });
});

describe("enlaceWhatsApp", () => {
  it("genera un enlace wa.me solo con dígitos", () => {
    expect(enlaceWhatsApp("+57 300 678-2181")).toBe("https://wa.me/573006782181");
  });
});
