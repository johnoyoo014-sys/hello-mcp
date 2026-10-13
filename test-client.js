import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client({
  name: "termux-test-client",
  version: "1.0.0"
});

try {
  await client.connect(transport);

  console.log("\n1. AVAILABLE TOOLS");
  const tools = await client.listTools();
  console.log(tools.tools.map(t => t.name));

  console.log("\n2. ADD TEST");
  console.log(await client.callTool({
    name: "add",
    arguments: { a: 25, b: 75 }
  }));

  console.log("\n3. REVERSE TEST");
  console.log(await client.callTool({
    name: "reverse",
    arguments: { text: "Nganya" }
  }));

  console.log("\n4. READ NOTE TEST");
  console.log(await client.callTool({
    name: "read_note",
    arguments: {}
  }));

  console.log("\n5. SEARCH NOTE TEST");
  console.log(await client.callTool({
    name: "search_notes",
    arguments: { query: "MCP" }
  }));

  await client.close();
} catch (error) {
  console.error("ERROR:", error.message);
  process.exitCode = 1;
}
