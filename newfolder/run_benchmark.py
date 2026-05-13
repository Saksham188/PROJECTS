from __future__ import annotations

import json
from pathlib import Path

from src.benchmark import BenchmarkRunner
from src.pipeline import RAGPipeline

DATASET_PATH = Path(__file__).parent / "data" / "tech_paragraphs.txt"
OUTPUT_PATH = Path(__file__).parent / "retrieval_benchmark.md"

QUERIES = [
    "How does the system handle peak load?",
    "What protects services from cascading failures during traffic spikes?",
    "How do caches help keep latency low at scale?",
]


def main() -> None:
    pipeline = RAGPipeline(DATASET_PATH)
    runner = BenchmarkRunner(pipeline, top_k=3)
    rows = runner.run(QUERIES)

    OUTPUT_PATH.write_text(runner.to_markdown(rows), encoding="utf-8")
    print(json.dumps(runner.to_json(rows), indent=2))


if __name__ == "__main__":
    main()
