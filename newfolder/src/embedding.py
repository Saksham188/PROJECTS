from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, List

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer


@dataclass
class LocalEmbeddingModel:
    """Lightweight local embedding model using TF-IDF vectors.

    This simulates Vertex AI textembedding-gecko behavior for local testing.
    """

    vectorizer: TfidfVectorizer

    @classmethod
    def fit(cls, texts: Iterable[str]) -> "LocalEmbeddingModel":
        vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
        vectorizer.fit(texts)
        return cls(vectorizer=vectorizer)

    def encode(self, texts: Iterable[str]) -> np.ndarray:
        matrix = self.vectorizer.transform(list(texts))
        return matrix.toarray().astype(np.float32)

    def encode_single(self, text: str) -> np.ndarray:
        return self.encode([text])[0]


@dataclass
class Embedding:
    values: List[float]


class MockTextEmbeddingModel:
    """Mocked vertexai.language_models.TextEmbeddingModel."""

    def __init__(self, embedder: LocalEmbeddingModel) -> None:
        self._embedder = embedder

    def get_embeddings(self, texts: Iterable[str]) -> List[Embedding]:
        vectors = self._embedder.encode(texts)
        return [Embedding(values=vector.tolist()) for vector in vectors]
