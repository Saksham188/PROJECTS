# Context-Aware Retrieval Engine (Local RAG)

This project implements a local Retrieval-Augmented Generation pipeline that compares:

- **Strategy A**: Raw vector search.
- **Strategy B**: Query expansion (mocked) + vector search.

It uses a lightweight TF-IDF embedding model to simulate Vertex AI `textembedding-gecko` behavior and a NumPy-based vector store with cosine similarity.

## Project layout

- `src/embedding.py` — local embeddings + mocked `TextEmbeddingModel`.
- `src/vector_store.py` — in-memory vector database.
- `src/mocks/vertex_ai.py` — mocked `GenerativeModel` for query expansion.
- `src/retrieval.py` — retrieval logic.
- `src/pipeline.py` — ingestion + orchestration.
- `src/benchmark.py` — strategy comparison and report formatting.
- `run_benchmark.py` — generates `retrieval_benchmark.md` and prints JSON.
- `data/tech_paragraphs.txt` — sample corpus.
- `tests/` — pytest suite.

## Similarity metric choice

We use **cosine similarity** because TF-IDF vectors are sparse and directionally meaningful. Cosine similarity focuses on semantic overlap rather than raw magnitude, which is more stable for text embeddings. Euclidean distance would overly penalize longer or denser vectors.

## Migration to Vertex AI Vector Search

To move this pipeline to Vertex AI:

1. Replace `LocalEmbeddingModel` with `vertexai.language_models.TextEmbeddingModel`.
2. Replace `VectorStore` with Vertex AI **Matching Engine** (Vector Search) index.
3. Store embeddings in a managed index and query via the `find_neighbors` API.
4. Replace `MockGenerativeModel` with `vertexai.language_models.GenerativeModel` for real query rewriting.
5. Add authentication via service accounts and deploy as a service (Cloud Run or GKE).

## Try it

```powershell
& "C:/Users/Downloads/New folder (2)/.venv/Scripts/python.exe" -m pip install -r requirements.txt
& "C:/Users/Downloads/New folder (2)/.venv/Scripts/python.exe" run_benchmark.py
```

The benchmark output is written to `retrieval_benchmark.md` and JSON is printed to stdout.

## Run tests

```powershell
& "C:/Users/Downloads/New folder (2)/.venv/Scripts/python.exe" -m pytest -q
```
