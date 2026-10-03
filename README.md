# HandPiano Kids

<div align="center">
  <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80" alt="Music classroom and notes" width="1200" />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Project-Spec%20Driven%20Development-0A84FF" alt="Spec Driven Development" />
  <img src="https://img.shields.io/badge/Stack-React%20%2B%20Spring%20Boot-8B5CF6" alt="Stack" />
  <img src="https://img.shields.io/badge/Status-MVP%20Prototype-F59E0B" alt="Status" />
</p>

<p align="center">
  <strong>Learn music through hand gestures, computer vision, and real-time audio feedback.</strong>
</p>

HandPiano Kids is an educational application designed to help users learn musical notes through hand gestures, camera capture, and audio synthesis. It blends interactive frontend logic with a backend foundation and follows a structured specification-driven workflow.

## Why this project

This repository follows a Spec-Driven Development approach. Requirements, planning, validation rules, and implementation decisions are documented in the `dbv-specs-ops` folder before the code is extended.

This means the project should be understood as a specification-first implementation rather than an ad-hoc codebase built without a defined product process.

## Key features

- Real-time hand tracking and note detection
- Visual staff representation for musical notes
- Audio feedback for note generation and volume control
- Evaluation flow for learning and training
- Full-stack foundation with frontend and backend separation
- Project documentation and planning aligned to a structured delivery process

## Screenshots

### Interface overview

<img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80" alt="Frontend user interface" width="1200" />

### Musical learning experience

<img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80" alt="Music learning and education" width="1200" />

### Developer workflow and project planning

<img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="Planning and development process" width="1200" />

## Tech stack
- Frontend: React + Vite + JavaScript
- Backend: Spring Boot + Java + PostgreSQL
- Vision: MediaPipe Hands
- Audio: Web Audio API
- Workflow: Spec-Driven Development

## Repository structure

```text
mi-app/
├── backend/
│   ├── pom.xml
│   └── src/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
├── dbv-specs-ops/
│   ├── docs/
│   ├── implementation_plan.md
│   ├── memory.md
│   ├── project.config.md
│   └── task.md
├── README.md
├── CLAUDE.md
├── GEMINI.md
├── start.bat
├── .gitignore
└── .github/
```

## Current status
- Phase: MVP / validation iteration
- Scope: note recognition, visual staff, evaluation flow, and backend foundation

## Requirements
- Node.js 20+
- Java 21+
- Maven
- PostgreSQL

## Quick start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:
- http://localhost:5173

### Backend

```bash
cd backend
mvn spring-boot:run
```

Open:
- http://localhost:8080

### Windows startup

```bat
start.bat
```

This script installs frontend dependencies if needed, launches the backend, opens the frontend, and starts the browser for local testing.

The backend requires a PostgreSQL database named `handpianokids` with the credentials defined in `backend/src/main/resources/application.properties`.

## Core endpoints
- `GET /api/health` — verifies backend availability

## Spec-Driven Development workflow

This project was developed following a structured lifecycle:

1. Specification definition
2. Planning and configuration
3. Implementation
4. Validation and testing
5. Simplification and refinement
6. Delivery

The main documents live in:
- `dbv-specs-ops/docs/`
- `dbv-specs-ops/implementation_plan.md`
- `dbv-specs-ops/task.md`

## Testing

### Frontend

```bash
cd frontend
npm test
```

### Backend

```bash
cd backend
mvn test
```

## Contribution guidelines

- Keep tests close to the behavior they validate.
- Prefer small, readable, purpose-specific tests.
- Cover business logic and UI changes before merging.
- Run the relevant test suite before finishing a task.

## PR checklist

- [ ] Change is clearly described.
- [ ] Tests were added or updated for the modified behavior.
- [ ] Relevant frontend/backend tests pass.
- [ ] No regressions were introduced.
- [ ] Documentation was updated when required.

## Notes

This project is intended as a learning and prototyping effort combining computer vision, music education, and full-stack architecture. Its development is aligned with a specification-first process and validation checkpoints throughout the lifecycle.

## About dbv-specs-ops

`dbv-specs-ops` is not a runtime dependency for Node or Maven. It acts as the specification and operations layer of the project, capturing product requirements, planning, and validation records.

The main documents are in `dbv-specs-ops/docs/`, and task status is tracked in `dbv-specs-ops/task.md`.
