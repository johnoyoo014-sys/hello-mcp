# hello-mcp

A minimal MCP (Model Context Protocol) server built with Node.js, exposing three tools an AI client can call:

- add - adds two numbers
- reverse - reverses a string
- read_note - reads a local text file as a resource

## Why this exists
Built as a hands-on learning project to understand the MCP protocol: how a client and server handshake, discover available tools, and exchange typed requests/responses over stdio.

## Tech
- Node.js
- @modelcontextprotocol/sdk
- zod for input validation

## What I learned
- The MCP handshake (initialize then capabilities exchange)
- Defining typed tools with zod schemas
- Debugging real environment issues (Node/OpenSSL version mismatches, ESM vs CommonJS)
