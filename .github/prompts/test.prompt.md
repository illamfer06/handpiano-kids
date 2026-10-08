---
name: test
description: Run tests and verify acceptance criteria
---

Map each affected acceptance criterion to evidence and run focused validation. Frontend: from `frontend`, `npm test` and `npm run build`; backend: from `backend`, `mvn test`; plugin: repository root, `node scripts/validate-agent-plugin.mjs`. For UI changes verify desktop/mobile in a browser; jsdom does not validate a physical camera. For the MediaPipe gesture recognizer, use `dbv-specs-ops/docs/EVALS.md`: synthetic fixtures run in CI; real-camera evaluation is manual and stores only aggregate counts. For non-deterministic AI/complex prompts, define additional Evals as needed. Report exact results, limitations, and failures. If a test falsifies a specification assumption, update memory/spec before continuing.
