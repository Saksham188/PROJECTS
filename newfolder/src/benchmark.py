from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List

from .mocks.vertex_ai import MockGenerativeModel
from .pipeline import RAGPipeline


@dataclass
class BenchmarkRow:
    query: str
    strategy_a: List[str]
    strategy_b: List[str]


class BenchmarkRunner:
    def __init__(self, pipeline: RAGPipeline, top_k: int = 3) -> None:
        artifacts = pipeline.ensure_built()
        self.retrieval_engine = artifacts.retrieval_engine
        self.generator_model: MockGenerativeModel = artifacts.generator_model
        self.top_k = top_k

    def run_query(self, query: str) -> BenchmarkRow:
        raw_results = self.retrieval_engine.retrieve(query, top_k=self.top_k)
        expanded_query = self.generator_model.generate_content(query).text
        expanded_results = self.retrieval_engine.retrieve(expanded_query, top_k=self.top_k)
        return BenchmarkRow(query=query, strategy_a=raw_results, strategy_b=expanded_results)

    def run(self, queries: List[str]) -> List[BenchmarkRow]:
        return [self.run_query(query) for query in queries]

    @staticmethod
    def to_json(rows: List[BenchmarkRow]) -> Dict[str, Dict[str, List[str]]]:
        return {
            row.query: {"strategy_a": row.strategy_a, "strategy_b": row.strategy_b}
            for row in rows
        }

    @staticmethod
    def to_markdown(rows: List[BenchmarkRow]) -> str:
        lines = [
            "# Retrieval Benchmark",
            "",
            "| Query | Strategy A (Raw Vector Search) | Strategy B (Expanded Query) |",
            "| --- | --- | --- |",
        ]
        for row in rows:
            a_items = "<br>".join(row.strategy_a)
            b_items = "<br>".join(row.strategy_b)
            lines.append(f"| {row.query} | {a_items} | {b_items} |")
        return "\n".join(lines)
