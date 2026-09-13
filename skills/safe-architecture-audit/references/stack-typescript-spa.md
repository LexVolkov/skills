# TypeScript Full-stack / SPA focus

This skill targets **TypeScript** product apps: SPA, Next.js/Remix-style full-stack, or Node API + TS frontend in one repo.

If the project is clearly another stack, still apply the core method, but skip checks that do not apply. Do not invent TS problems in a non-TS codebase.

---

## Detect the shape first

Identify which of these you are in (use real paths/files as evidence):

* **SPA + API**: separate `client`/`web` and `server`/`api`
* **Full-stack framework**: Next.js, Remix, Nuxt-with-TS-like, etc. (UI + route handlers in one app)
* **Monorepo of apps/packages**: `apps/*`, `packages/*` (only if that is how THIS repo is structured)

Map:

* browser/client entry
* server/API entry
* shared packages (types, UI, config)
* ORM / DB access
* auth boundary
* validation schemas (Zod/Valibot/etc. if present)

---

## TS-specific risks (only with evidence)

### Types that lie

Look for:

* `any`, broad `as` casts, non-null `!` on uncertain values
* duplicated types for the same API payload (manual interfaces vs inferred Zod/ORM types)
* `JSON.parse` / `fetch().json()` used as typed data without validation at the boundary
* `ProcessEnv` / env access without a single typed config module
* shared types imported from server modules into client (or the reverse), creating wrong coupling

Do not list every `any`. Report only where it enables a realistic bug or boundary leak.

### Client / server boundary

Especially in Next.js / full-stack frameworks:

* `"use client"` (or equivalent) spreading too far so server-only code is pulled into the client bundle
* UI importing ORM clients, DB URLs, secret env, or Node-only modules
* route handlers / server actions that reimplement business rules already living elsewhere
* public env (`NEXT_PUBLIC_*` or similar) holding secrets or over-sharing internal config

### Data fetching and state

Look for multiple owners of the same server data:

* React Query / SWR / RTK Query cache
* global store (Redux/Zustand/Context) mirroring the same entities
* component local state that can diverge from server truth
* form state treated as source of truth for persisted domain data

Ask: after a mutation, what is the single place that defines the updated truth?

### Module graph smells common in TS apps

* barrel `index.ts` files that re-export everything and create cycles
* one `utils.ts` / `helpers.ts` / `lib.ts` imported everywhere
* path-alias imports that hide circular dependencies
* UI feature folders that import each other sideways instead of through shared kernel or clear APIs

### API and validation boundary

* request/response shapes validated in one place but trusted raw elsewhere
* business rules only in the UI (disabled buttons) and missing on the server
* Prisma/Drizzle/SQL details leaking into React components
* GraphQL/tRPC/REST procedures that grow into "god routers"

---

## Typical healthy patterns (KEEP if present — do not "improve" them)

Only mark KEEP when you actually see them working:

* one validation schema (e.g. Zod) reused on client and server for the same contract
* DB/ORM confined to server modules
* clear split between UI state and server-state library
* typed API client generated or shared from one contract
* thin route handlers that call application functions

Do not recommend adopting these patterns merely because they are popular. Recommend only if a concrete problem would be fixed.

---

## Commands that usually help (read-only)

Prefer project scripts if they exist:

* `tsc --noEmit` / `pnpm exec tsc --noEmit`
* `eslint .` without `--fix`
* existing `typecheck` / `lint` package scripts

If a command may write caches or touch the DB, do not run it.
