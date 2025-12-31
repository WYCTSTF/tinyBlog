# tinyBlog

A high-performance personal blog system built with Bun, Elysia.js, and Next.js.

## Tech Stack

- **Runtime**: Bun
- **Backend**: Elysia.js
- **Frontend**: Next.js + Tailwind CSS
- **Database**: SQLite (Planned)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)

### Installation

1. Clone the repository.
2. Install dependencies for both server and client:

```bash
cd server && bun install
cd ../client && bun install
```

### Running the Project

**Backend (Elysia):**

```bash
cd server
bun run index.ts
```
Server runs at `http://localhost:8000`.
Swagger UI available at `http://localhost:8000/swagger`.

**Frontend (Next.js):**

```bash
cd client
bun run dev
```
Client runs at `http://localhost:3000`.

## Features

- **Markdown Editor**: Dual-pane editor with real-time preview.
- **Spoiler Support**: Use `:::spoiler` syntax for hidden content.
- **Tag Graph**: API endpoint for tag co-occurrence visualization.
