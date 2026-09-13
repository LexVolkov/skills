# Evidence & priorities

Every finding needs **evidence** (real paths / imports / behavior). No vague “too coupled.”

In the HTML `agent-data` body use:

```text
FACT:
WHERE:
GOAL:          (or WATCH FOR / KEEP — by kind)
DO NOT:
DONE WHEN:     (skip for pure WATCH/KEEP if N/A)
CONFIDENCE: HIGH | MEDIUM | LOW
```

On the page: short product-language explanation (+ “if ignored” for Fix now/soon).

**FACT** = observed in the repo. **RISK** = plausible consequence. **OPINION** = preference—never present as FACT.

## Do not over-engineer

No microservices, DI frameworks, extra state libs, monorepo splits, rewrites, library swaps—unless a concrete problem in *this* repo requires it. “Best practice / modern / enterprise” is not a reason.

## Priorities

| | |
| --- | --- |
| 🔴 FIX NOW | Cheap now, expensive later |
| 🟠 FIX SOON | Real, but work can continue |
| 🟡 WATCH | Later concern—don’t refactor yet |
| 🟢 KEEP | Preserve; don’t “improve” |

Healthy repo → more KEEP than forced problems. **NO ACTION** is valid when change isn’t worth the risk.

## Before shipping a finding

Observed? Evidence? Realistic consequence? Fix smaller than the problem? Still worth it without AI agents? If mostly no → drop or downgrade.
