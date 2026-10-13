import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { z } from "zod";

const server = new McpServer({ name: "hello-mcp", version: "1.0.0" });

server.tool(
  "add",
  "Add two numbers together",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: `The sum is ${a + b}` }],
  })
);

server.tool(
  "reverse",
  "Reverse a piece of text",
  { text: z.string() },
  async ({ text }) => ({
    content: [{ type: "text", text: text.split("").reverse().join("") }],
  })
);

server.tool(
  "read_note",
  "Read the contents of notes.txt",
  {},
  async () => {
    try {
      const text = readFileSync("notes.txt", "utf-8");
      return { content: [{ type: "text", text }] };
    } catch {
      return { content: [{ type: "text", text: "notes.txt not found." }] };
    }
  }
);


server.tool(
  "search_notes",
  "Search for a word or phrase in notes.txt",
  { query: z.string() },
  async ({ query }) => {
    try {
      const text = readFileSync("notes.txt", "utf-8");
      const matches = text.split("\n").filter(line =>
        line.toLowerCase().includes(query.toLowerCase())
      );
      return {
        content: [{
          type: "text",
          text: matches.length ? matches.join("\n") : "No matching information found."
        }]
      };
    } catch {
      return {
        content: [{ type: "text", text: "Could not read notes.txt." }]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
