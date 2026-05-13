from pathlib import Path

from src.benchmark import BenchmarkRunner
from src.mocks.vertex_ai import MockGenerativeModel
from src.pipeline import RAGPipeline


def test_pipeline_builds_and_retrieves(tmp_path: Path) -> None:
    dataset = tmp_path / "data.txt"
    dataset.write_text(
        "Autoscaling adds instances when traffic spikes.\n\n"
        "Caching reduces database load during peak hours.\n\n"
        "Queues buffer bursts and protect services.",
        encoding="utf-8",
    )

    pipeline = RAGPipeline(dataset)
    runner = BenchmarkRunner(pipeline, top_k=2)
    rows = runner.run(["How does the system handle peak load?"])

    assert len(rows) == 1
    assert len(rows[0].strategy_a) == 2
    assert len(rows[0].strategy_b) == 2


def test_mock_generative_model_expands_query() -> None:
    model = MockGenerativeModel()
    response = model.generate_content("How does the system handle peak load?")

    assert "peak load" in response.text.lower()
    assert "traffic" in response.text.lower()
