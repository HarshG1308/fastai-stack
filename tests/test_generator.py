from pathlib import Path

from fastai_stack.generator import render_project
from fastai_stack.models import (AIChoice, AuthChoice, DatabaseChoice,
                                 DockerChoice, FrontendChoice,
                                 MonitoringChoice, ProjectConfig, TaskChoice,
                                 VectorDBChoice)


def test_render_project_with_ai(tmp_path: Path) -> None:
    config = ProjectConfig(
        project_name="My AI App",
        project_slug="my-ai-app",
        db=DatabaseChoice.postgres,
        auth=AuthChoice.jwt,
        tasks=TaskChoice.celery_redis,
        ai=AIChoice.openai,
        vector_db=VectorDBChoice.pgvector,
        docker=DockerChoice.gpu,
        monitoring=MonitoringChoice.prometheus,
        frontend=FrontendChoice.none,
    )

    project_dir = render_project(config=config, destination=tmp_path)

    assert project_dir.exists()
    assert (project_dir / "app" / "api" / "v1" / "endpoints" / "ai" / "chat.py").exists()
    assert (project_dir / "app" / "tasks.py").exists()
    assert (project_dir / "migrations" / ".gitkeep").exists()


def test_minimal_stack_compose_does_not_emit_empty_sections(tmp_path: Path) -> None:
    config = ProjectConfig(
        project_name="Minimal",
        project_slug="minimal",
        db=DatabaseChoice.sqlite,
        auth=AuthChoice.none,
        tasks=TaskChoice.none,
        ai=AIChoice.none,
        vector_db=VectorDBChoice.none,
        docker=DockerChoice.cpu,
        monitoring=MonitoringChoice.none,
        frontend=FrontendChoice.none,
    )

    project_dir = render_project(config=config, destination=tmp_path)
    compose_text = (project_dir / "docker-compose.yml").read_text(encoding="utf-8")

    assert "depends_on:" not in compose_text
    assert "\nvolumes:" not in compose_text
