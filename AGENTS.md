<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-conventions -->
# Project Conventions

## Build
- Run with `$env:NODE_ENV="production"; npm run build`
- The global shell has `NODE_ENV=development` set, which breaks the build. Always override to `production` before building.
- Static export (`output: "export"`) — no server-side features.
- `experimental.inlineCss: true` enabled — CSS is inlined into `<style>` tags.

## Files
- `public/sitemap.xml` and `public/robots.txt` — static files (Route Handlers not supported with `output: "export"`).
- `src/app/not-found.tsx` — custom 404 page.
- `src/app/JsonLd.tsx` — Organization + WebApplication structured data.
- GA4 is conditional on `NEXT_PUBLIC_GA_ID` env var. Set in `.env.local` or build environment.
- Hero image: `public/hero-composting.svg` rendered via `next/image` with `priority`.
<!-- END:project-conventions -->
