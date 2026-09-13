# STEP 4: Think specifically about AI coding agents

Now inspect the project from the perspective of an AI coding agent.

Ask:

### Can an AI find the correct place for a new feature?

If not, explain why.

### Can an AI accidentally create duplicate functionality?

Look for existing functionality that is difficult to discover.

### Can an AI accidentally create a second source of truth?

Identify where this could happen.

### Can an AI accidentally violate architectural boundaries?

Identify the specific boundaries.

### Can an AI make a small change that causes a large unrelated change?

Identify the mechanisms that make this possible.

### Can an AI understand important project-specific rules from the code?

If not, identify which rules may need documentation.

Do not assume that AI instructions are required.

Only recommend them when the code itself cannot reasonably communicate an important rule.

---

# STEP 5: Check protection against mistakes

Inspect the project's:

* type checking
* linting
* tests
* build process
* validation
* CI checks, if present

Ask:

> If an AI agent makes a subtle mistake here, what will catch it?

Focus on important behavior, not test coverage percentages.

Identify areas where a small number of good tests would provide strong protection.

---

# STEP 6: Consider future growth

Imagine the project becomes approximately 3–5 times larger.

Do NOT imagine a hypothetical giant enterprise system.

Ask:

> What existing decisions are likely to become painful at that size?

Focus on problems that would become expensive to fix later.

Do not recommend changes merely because they might theoretically matter at massive scale.
