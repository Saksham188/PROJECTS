from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Sequence

import numpy as np


def cosine_similarity(matrix: np.ndarray, vector: np.ndarray) -> np.ndarray:
    matrix_norm = np.linalg.norm(matrix, axis=1) + 1e-10
    vector_norm = np.linalg.norm(vector) + 1e-10
    return (matrix @ vector) / (matrix_norm * vector_norm)


@dataclass
class VectorStore:
    texts: List[str] = field(default_factory=list)
    embeddings: np.ndarray | None = None

    def add(self, texts: Sequence[str], embeddings: np.ndarray) -> None:
        if self.embeddings is None:
            self.embeddings = embeddings
        else:
            self.embeddings = np.vstack([self.embeddings, embeddings])
        self.texts.extend(texts)

    def search(self, query_embedding: np.ndarray, top_k: int = 3) -> List[str]:
        if self.embeddings is None or not self.texts:
            return []
        scores = cosine_similarity(self.embeddings, query_embedding)
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [self.texts[idx] for idx in top_indices]
