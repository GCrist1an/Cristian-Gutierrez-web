# Cristian David Gutiérrez — Web personal

Web profesional personal de **Cristian David Gutiérrez**, enfocada en software, automatización y operaciones.

## Objetivo

Presentar de forma clara y verificable el perfil profesional, trabajo seleccionado, capacidades técnicas y relación con **Gutierrez Systems**, manteniendo separadas la identidad personal y la identidad corporativa.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- ESLint
- GitHub Actions

## Desarrollo local

Requisito: Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

Validaciones:

```bash
npm run lint
npm run build
```

## Flujo de trabajo

Los cambios importantes siguen el flujo:

`rama → Pull Request → CI → revisión → main`

## Despliegue

**Vercel** es la plataforma oficial de despliegue.

- `main` representa producción.
- las demás ramas y Pull Requests se utilizan como previews;
- cada Preview Deployment de Vercel es inmutable y corresponde a un commit concreto;
- variables de entorno y secretos se administran en Vercel, no se almacenan en el repositorio.

## Alcance de la primera versión

La primera versión incluirá Hero, Sobre mí, Trabajo seleccionado, Capacidades, Tecnología, Forma de trabajo, Gutierrez Systems, GitHub y Contacto, con diseño responsive y SEO base.
