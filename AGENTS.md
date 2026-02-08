# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Next.js App Router pages, route groups (`(main)`, `(auth)`), and API handlers in `app/api/*/route.ts`.
- `components/` holds reusable UI grouped by domain (`auth/`, `post/`, `review/`, `layout/`, `tiptap/`, etc.).
- `lib/` contains server logic and feature actions (`auth`, `post`, `comment`, `favorite`, `user`) plus Prisma setup in `lib/prisma.ts`.
- `prisma/` stores `schema.prisma` and migrations; `generated/prisma/` is generated client code.
- `public/assets/` is for static media; shared types and constants live in `types/` and `constants/`.

## Build, Test, and Development Commands
- `pnpm dev` — start the local development server (`http://localhost:3000`).
- `pnpm build` — create a production build.
- `pnpm start` — run the built app locally.
- `pnpm lint` — run ESLint with Next.js + TypeScript rules.
- `pnpm exec prisma migrate dev` — create/apply local schema migrations.
- `pnpm exec prisma generate` — regenerate Prisma client after schema updates.

## Coding Style & Naming Conventions
- Use TypeScript with strict types; avoid `any` unless required.
- Match existing style: 2-space indentation, semicolons, and double quotes.
- Name React components with `PascalCase` (e.g., `PostCard.tsx`), hooks as `useX.ts`, and action files as `*.action.ts`.
- Follow App Router filenames exactly: `page.tsx`, `layout.tsx`, `route.ts`.
- Prefer `@/` path aliases over deep relative imports when practical.

## Testing Guidelines
- No automated test framework is configured yet.
- For each change, run at least `pnpm lint` and `pnpm build` before opening a PR.
- Manually verify impacted flows (auth, create/edit post, review/search, profile updates).
- If adding tests, use `*.test.ts` or `*.test.tsx` and keep them close to the feature files.

## Commit & Pull Request Guidelines
- Current history uses short, action-based Chinese messages (e.g., `更新`, `优化`, `评论+收藏功能`).
- Keep commits focused and descriptive; recommended style: `<scope>: <change>` (example: `post: 修复分页加载`).
- PRs should include: objective, affected modules/routes, database migration notes, and UI screenshots for visual changes.
- Link related issues and list local verification steps completed.

## Security & Configuration Tips
- Store secrets in `.env` and never commit credentials.
- Review auth and API changes carefully (`lib/auth`, `app/api`).
- Treat `generated/prisma/` as generated output; do not edit manually.
