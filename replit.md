# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **AI**: OpenAI via Replit AI Integrations (gpt-5.2, no user API key required)

## Artifacts

### The Foundation (`artifacts/the-foundation`)
- React + Vite frontend at `/`
- **Routes**: `/`, `/leadership`, `/realtors`, `/transition`, `/s2`, `/contact`
- **Features**:
  - Password-protected Leadership page (password: `Founders`)
  - Interactive cost calculator on Realtors page
  - S2 AI chatbot powered by OpenAI with streaming SSE responses
  - Floating S2 chat button site-wide
  - Contact form
- **Colors**: Deep Green (#1F3D2B), Warm Off-White (#F5F3EF), Earth Tan (#C2A878), Soft Blue (#3F6E8C), Charcoal (#2B2B2B)
- **Fonts**: Playfair Display (headings), Inter (body)

### API Server (`artifacts/api-server`)
- Express 5 backend at `/api`
- **Routes**: `/api/healthz`, `/api/contact`, `/api/openai/conversations/*`
- S2 system prompt defines assistant as LPT Realty Ontario real estate specialist

## AI Integration

Uses Replit AI Integrations for OpenAI (no user API key needed). Env vars `AI_INTEGRATIONS_OPENAI_BASE_URL` and `AI_INTEGRATIONS_OPENAI_API_KEY` are auto-set.

## Database

PostgreSQL with conversations and messages tables (for S2 chat history).

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
