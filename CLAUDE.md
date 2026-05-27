# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chinese-language blog platform ("DMB") built with **Next.js 16 App Router**, **Prisma/PostgreSQL**, and **Tiptap** rich-text editing. Features JWT auth, admin post review workflow, comments, favorites, file uploads (UploadThing), client-side search (MiniSearch), and dark/light theming.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server at `localhost:3000` (uses `--webpack`) |
| `pnpm build` | Production build (standalone output for Docker) |
| `pnpm start` | Run production build locally |
| `pnpm lint` | ESLint (Next.js + TypeScript rules) |
| `pnpm exec prisma migrate dev` | Create/apply schema migrations |
| `pnpm exec prisma generate` | Regenerate Prisma client (output in `generated/prisma/`) |

No test framework is configured. Before committing, run `pnpm lint` and `pnpm build`.

## Architecture

### Routing

App Router with two route groups:
- **`(main)/`** — Blog experience (Header layout). Pages: `home`, `content/[id]`, `create-post`, `my-posts`, `profile`, `review`, `assist`, `about`.
- **`(auth)/`** — Minimal layout. Pages: `login`.

### Data Flow

- **Server Components** call server actions (`lib/**/*.action.ts`) directly at render time.
- Server actions use `"use server"` and talk to Prisma — see `lib/post/post.action.ts`, `lib/user/user.action.ts`, `lib/comment/comment.action.ts`, `lib/favorite/favorite.action.ts`.
- API routes in `app/api/` handle pagination endpoints and UploadThing webhooks.
- Infinite scroll: server component fetches page 1 → client components (`PostInfiniteSection`, `PostInfiniteList`) load more via API + intersection observer.

### Authentication

Custom JWT-based (no NextAuth). `lib/auth/index.ts` handles login (bcrypt verify + JWT sign → httpOnly cookie). `getUser()` in `lib/user/user.action.ts` reads JWT from cookies and returns the user.

### Prisma Models

User, Post, Comment, Favorite. Post `published` field: `"0"` = pending, `"1"` = approved, `"2"` = rejected. Schema at `prisma/schema.prisma`.

### Styling

- **Tailwind CSS v4** (via `@tailwindcss/postcss`) for utilities.
- **CSS custom properties** in `app/globals.css` for theming (`--bg`, `--card`, `--text`, `--primary` under `:root` and `.dark`).
- **SCSS** in `styles/_variables.scss` for Tiptap editor theming.
- Custom utility classes in `globals.css` under `@layer utilities` (`.bg-theme`, `.bg-card`, `.btn-primary`, etc.).
- Dark mode: `darkMode: "class"` — toggle `.dark` on root.

## Coding Conventions

- Strict TypeScript; avoid `any`.
- 2-space indent, semicolons, double quotes.
- `PascalCase` for components, `useX.ts` for hooks, `*.action.ts` for server actions.
- Use `@/` path alias over deep relative paths.
- ESLint flat config (`eslint.config.mjs`) ignores Tiptap ecosystem dirs and `hooks/`.
- Do not edit `generated/prisma/` manually.
- Commit format: `<scope>: <change>` (e.g., `post: 修复分页加载`). Chinese messages are common in history.
