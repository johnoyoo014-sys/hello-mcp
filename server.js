import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
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

const transport = new StdioServerTransport();
await server.connect(transport);
