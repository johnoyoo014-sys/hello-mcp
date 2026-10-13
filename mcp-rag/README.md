# mini-rag

A minimal Retrieval-Augmented-Generation (RAG) pipeline built from scratch in Python - no vector database library, just raw embeddings and cosine similarity.

## How it works
1. Documents are embedded using Voyage AI's embedding API
2. A user query is embedded the same way
3. Cosine similarity ranks documents by relevance to the query
4. The top-ranked chunks are returned as retrieved context

## Tech
- Python
- requests (direct REST calls, no heavy SDK dependencies)
- numpy for vector math
- Voyage AI embeddings API

## Run it
export VOYAGE_API_KEY=your-key-here
python rag.py

## What I learned
- What embeddings actually represent and how similarity search works under the hood
- Why production RAG tools (Chroma, Pinecone) are just convenience wrappers around this same math
- Working around constrained environments (mobile/Termux) by choosing lightweight, dependency-free approaches
