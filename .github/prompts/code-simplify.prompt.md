---
name: code-simplify
description: Review bugs, security, compliance, and simplify the diff
---

Review the diff using `dbv-specs-ops/docs/REVIEW.md` and the product specs/architecture/design. Make three passes: bugs/edge cases; security/privacy/dependencies; compliance. Ignore generated noise and issues already reported by deterministic checks. Resolve critical findings before ship; record important findings in the changelog or document explicit acceptance; limit nits to five examples. Then simplify without changing behavior. Run affected tests and report a clean review if no findings exist.
