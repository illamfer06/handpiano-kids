---
name: plan
description: Analyze risks, dependencies, and implementation steps
---

Read project configuration, specifications, architecture, design, task, and memory. Classify the task by size and risk. Before breaking it down, adversarially examine concrete edge cases involving camera permissions, gestures, evaluation, deployment, or privacy as relevant; record consciously accepted risks in memory. Create atomic tasks with affected files and validation. If work touches more than 3 files, authentication/sensitive data/payments, or over 150 new lines, update `implementation_plan.md` with YAML `dependencies`, `risks`, and `rollback_strategy`, then request explicit approval before building. Otherwise record a short plan in task. Do not write product code.
