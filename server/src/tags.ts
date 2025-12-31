import { Elysia } from "elysia";

// Mock data structure for Tag Graph
interface Node {
  id: string;
  group: number;
  val: number; // occurrence count
}

interface Link {
  source: string;
  target: string;
  value: number; // co-occurrence strength
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export const tagsPlugin = new Elysia().group("/tags", (app) =>
  app.get("/graph", (): GraphData => {
    // TODO: Implement actual logic reading from DB/Markdown
    // Mock data
    return {
      nodes: [
        { id: "Bun", group: 1, val: 10 },
        { id: "Elysia", group: 1, val: 8 },
        { id: "React", group: 2, val: 15 },
        { id: "TypeScript", group: 1, val: 20 },
        { id: "Performance", group: 3, val: 5 },
      ],
      links: [
        { source: "Bun", target: "Elysia", value: 5 },
        { source: "Bun", target: "TypeScript", value: 3 },
        { source: "Elysia", target: "TypeScript", value: 4 },
        { source: "React", target: "TypeScript", value: 10 },
      ],
    };
  })
);