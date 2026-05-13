from __future__ import annotations

from dataclasses import dataclass
from typing import List

import numpy as np

from .embedding import MockTextEmbeddingModel
from .vector_store import VectorStore


@dataclass
class RetrievalResult:
    query: str
    strategy: str
    results: List[str]


class RetrievalEngine:
    def __init__(self, embedding_model: MockTextEmbeddingModel, store: VectorStore) -> None:
        self.embedding_model = embedding_model
        self.store = store

    def retrieve(self, query: str, top_k: int = 3) -> List[str]:
        embedding = self._embed_query(query)
        return self.store.search(embedding, top_k=top_k)

    def _embed_query(self, query: str) -> np.ndarray:
        return np.array(self.embedding_model.get_embeddings([query])[0].values, dtype=np.float32)
