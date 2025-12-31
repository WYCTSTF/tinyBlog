import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { tagsPlugin } from "./src/tags";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(tagsPlugin)
  .get("/", () => "Hello Elysia")
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;