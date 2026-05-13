from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import List

from .embedding import LocalEmbeddingModel, MockTextEmbeddingModel
from .mocks.vertex_ai import MockGenerativeModel
from .retrieval import RetrievalEngine
from .vector_store import VectorStore


@dataclass
class PipelineArtifacts:
    embedder: LocalEmbeddingModel
    embedding_model: MockTextEmbeddingModel
    generator_model: MockGenerativeModel
    store: VectorStore
    retrieval_engine: RetrievalEngine


class RAGPipeline:
    def __init__(self, dataset_path: Path) -> None:
        self.dataset_path = dataset_path
        self._artifacts: PipelineArtifacts | None = None

    def load_texts(self) -> List[str]:
        raw = self.dataset_path.read_text(encoding="utf-8")
        return [chunk.strip() for chunk in raw.split("\n\n") if chunk.strip()]

    def build(self) -> PipelineArtifacts:
        texts = self.load_texts()
        embedder = LocalEmbeddingModel.fit(texts)
        embedding_model = MockTextEmbeddingModel(embedder)
        generator_model = MockGenerativeModel()

        embeddings = embedder.encode(texts)
        store = VectorStore()
        store.add(texts, embeddings)

        retrieval_engine = RetrievalEngine(embedding_model, store)
        self._artifacts = PipelineArtifacts(
            embedder=embedder,
            embedding_model=embedding_model,
            generator_model=generator_model,
            store=store,
            retrieval_engine=retrieval_engine,
        )
        return self._artifacts

    def ensure_built(self) -> PipelineArtifacts:
        return self._artifacts if self._artifacts else self.build()
