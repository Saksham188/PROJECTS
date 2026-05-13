from __future__ import annotations

from dataclasses import dataclass


@dataclass
class GenerationResponse:
    text: str


class MockGenerativeModel:
    """Mocked vertexai.language_models.GenerativeModel for query expansion."""

    def __init__(self) -> None:
        self._expansions = {
            "peak load": "traffic surge high throughput scaling autoscaling",
            "latency": "p99 response time tail latency bottleneck",
            "cache": "caching layer redis cdn",
        }

    def generate_content(self, prompt: str) -> GenerationResponse:
        lowered = prompt.lower()
        expansion = "".join(
            [f" {value}" for key, value in self._expansions.items() if key in lowered]
        ).strip()
        if expansion:
            rewritten = f"{prompt} {expansion}"
        else:
            rewritten = f"{prompt} reliability scaling throughput"
        return GenerationResponse(text=rewritten)
