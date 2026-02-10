# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Next.js App Router pages, route groups like `(main)` and `(auth)`, and API handlers in `app/api/*/route.ts`.
- `components/` holds reusable UI grouped by domain (`auth/`, `post/`, `review/`, `layout/`, `tiptap/`).
- `lib/` contains server-side feature logic (`auth`, `post`, `comment`, `favorite`, `user`) and Prisma setup in `lib/prisma.ts`.
- `prisma/` stores `schema.prisma` and migrations; `generated/prisma/` is generated output.
- `public/assets/` stores static media; shared contracts live in `types/` and `constants/`.

## Build, Test, and Development Commands
- `pnpm dev` — run the local dev server at `http://localhost:3000`.
- `pnpm build` — create a production build.
- `pnpm start` — run the built app locally.
- `pnpm lint` — run ESLint (Next.js + TypeScript rules).
- `pnpm exec prisma migrate dev` — create/apply local schema migrations.
- `pnpm exec prisma generate` — regenerate Prisma client after schema updates.

## Coding Style & Naming Conventions
- Use strict TypeScript and avoid `any` unless truly necessary.
- Follow existing formatting: 2-space indentation, semicolons, and double quotes.
- Use `PascalCase` for components (e.g., `PostCard.tsx`), `useX.ts` for hooks, and `*.action.ts` for action files.
- Keep App Router filenames exact (`page.tsx`, `layout.tsx`, `route.ts`).
- Prefer `@/` imports over deep relative paths when practical.

## Testing Guidelines
- No automated test framework is configured yet.
- Before opening a PR, run at minimum: `pnpm lint` and `pnpm build`.
- Manually verify impacted user flows (auth, create/edit post, review/search, profile updates).
- If adding tests, place `*.test.ts` or `*.test.tsx` close to the feature files.

## Commit & Pull Request Guidelines
- Keep commits focused and descriptive; history favors short, action-based Chinese messages (e.g., `更新`, `优化`, `评论+收藏功能`).
- Recommended format: `<scope>: <change>` (example: `post: 修复分页加载`).
- PRs should include objective, affected modules/routes, migration notes, linked issues, and UI screenshots for visual changes.
- List local verification steps completed in the PR description.

## Security & Configuration Tips
- Store secrets in `.env`; never commit credentials.
- Review auth and API changes carefully, especially under `lib/auth` and `app/api`.
- Do not manually edit `generated/prisma/`; regenerate it via Prisma commands.
