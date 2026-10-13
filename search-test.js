import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client({
  name: "search-test",
  version: "1.0.0"
});

try {
  await client.connect(transport);

  const result = await client.callTool({
    name: "search_notes",
    arguments: { query: "revenue" }
  });

  console.log("SEARCH RESULT:");
  console.log(result.content);

  await client.close();
} catch (error) {
  console.error(error);
}
