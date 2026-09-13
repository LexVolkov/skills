# STEP 3: Look for real architectural risks

Investigate these areas.

## A. Confusing structure

Ask:

> If a new developer joins this project, can they reasonably figure out where a new feature belongs?

Look for:

* unclear responsibilities
* misleading directories
* enormous folders
* random shared code
* duplicated concepts
* files whose names do not describe what they do

Do not report harmless naming preferences.

---

## B. Dangerous dependencies

Look for situations where changing one thing unexpectedly affects many other things.

Examples (TypeScript full-stack / SPA):

* circular dependencies (often via barrel `index.ts` files)
* React/UI components importing ORM clients or DB modules directly
* business rules living only in UI components/hooks
* client modules importing server-only code (or the reverse)
* one global `lib`/`utils`/`store` module imported everywhere
* Prisma/Drizzle/SQL or raw fetch details spreading through the UI

For every finding, identify actual files involved.

---

## C. Too much coupling

Ask:

> If I change feature X, how much unrelated code might I accidentally break?

Look for:

* giant modules / route files
* giant React components
* giant hooks (especially data + UI + business rules mixed)
* global mutable stores used as a dumping ground
* hidden side effects in hooks/effects
* shared objects modified from many places
* multiple modules owning the same piece of data (store + React Query + local state)

Do not recommend splitting something merely because it is long.

Length alone is not a problem.

---

## D. Business rules

Find important rules in the project.

Examples:

* permissions
* pricing
* calculations
* state transitions
* validation
* game rules
* level calculations
* economy rules
* limits

For each important rule, determine:

> Where is the single source of truth?

If the same rule exists in multiple places, investigate whether that can cause inconsistent behavior.

---

## E. Type safety

Look for things that make accidental mistakes easy.

Pay attention to:

* `any`
* unsafe `as` casts and non-null `!`
* duplicated types for the same API/DB shape
* `fetch`/JSON used as typed data without boundary validation
* magic strings for routes, roles, status enums
* unclear optional values on shared contracts
* unchecked external data (webhooks, third-party APIs, `process.env`)

Do not report every `any`.

Only report type problems that create a realistic risk.

---

## F. State

Understand the different kinds of state.

For example:

* local UI state
* global application state
* server data
* cached data
* derived data
* persistent data

Look for multiple sources of truth.

Example:

```text
Database says:
coins = 10

Global state says:
coins = 15

Component state says:
coins = 20
```

This is a real problem if all three can influence behavior.

---

## G. External systems

Inspect boundaries with:

* databases
* APIs
* authentication
* storage
* third-party services
* browser/platform APIs
* environment variables

Ask:

> Can normal application code accidentally become tightly dependent on infrastructure details?

Again, only report concrete problems.
