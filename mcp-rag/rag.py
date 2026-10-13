import os, requests, numpy as np

VOYAGE_KEY = os.environ["VOYAGE_API_KEY"]

documents = [
    "YWI (Young Wealth Investor) is a micro-funding platform using M-Pesa micro-deposits to fund early-stage ideas.",
    "RAG stands for Retrieval Augmented Generation — it retrieves relevant text before generating an answer.",
    "MCP (Model Context Protocol) lets an AI call external tools and access external data sources.",
]

def embed(texts, input_type="document"):
    resp = requests.post(
        "https://api.voyageai.com/v1/embeddings",
        headers={"Authorization": f"Bearer {VOYAGE_KEY}"},
        json={"input": texts, "model": "voyage-3.5", "input_type": input_type},
    )
    resp.raise_for_status()
    data = resp.json()["data"]
    return np.array([d["embedding"] for d in data])

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def retrieve(query, doc_embeddings, top_k=2):
    query_emb = embed([query], input_type="query")[0]
    scores = [cosine_sim(query_emb, d) for d in doc_embeddings]
    ranked = np.argsort(scores)[::-1][:top_k]
    print("\nSimilarity scores:")
    for i, s in enumerate(scores):
        print(f"  [{s:.4f}] {documents[i]}")
    return [documents[i] for i in ranked]

print("Embedding documents...")
doc_embeddings = embed(documents)

query = "What is MCP?"
print(f"\nQuery: {query}")
top_matches = retrieve(query, doc_embeddings)

print("\nTop retrieved chunks (this is what would be sent to an LLM):")
for chunk in top_matches:
    print(f"  - {chunk}")
