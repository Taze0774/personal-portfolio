# JP Alzate — Personal Portfolio

A minimalist, editorial-style developer portfolio built with Next.js, TypeScript, Tailwind CSS, Lucide React, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
npm run lint
npm run build
npm run start
```

## Before publishing

A few places intentionally contain placeholders so no contact details or links are invented:

- `data/site.ts` — email address and social profile URLs for site contact information.
- `data/projects.ts` — project links and case study copy. Update `links.github` / `links.live` when repositories or deployments are public.
- `components/ProfilePortrait.tsx` — replace the illustrated profile placeholder with a professional photograph. The about section has a fixed portrait frame ready for the final image.
- `components/ProjectVisual.tsx` — replace the illustrative interface previews with real screenshots when available. The case study pages use the same component, so updating it updates both the cards and detail pages.

Social links in the contact section use the profile URLs configured in `data/site.ts`.

## Routes

- `/` — single-page portfolio (home, about, projects, skills, education, contact)
- `/projects/amg-dental`
- `/projects/ideal`
- `/projects/event-management`

## Structure

- `app/` — App Router pages, metadata, global styles
- `components/` — reusable sections and UI pieces
- `data/` — site details and project case study content
- `lib/` — shared styles

## Deploy

The project is ready for Vercel. Import the repository, keep the default Next.js build settings, and deploy.
