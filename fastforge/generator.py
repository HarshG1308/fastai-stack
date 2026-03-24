from __future__ import annotations

from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, StrictUndefined

from .models import ProjectConfig

TEMPLATE_ROOT = Path(__file__).resolve().parent.parent / "templates" / "project"


def _base_dependencies(config: ProjectConfig) -> list[str]:
    deps = [
        "fastapi>=0.115.0",
        "uvicorn>=0.30.0",
        "pydantic>=2.7.0",
        "pydantic-settings>=2.3.0",
        "python-dotenv>=1.0.1",
    ]

    if config.use_postgres:
        deps += ["sqlalchemy>=2.0.30", "asyncpg>=0.29.0", "alembic>=1.13.1"]
    elif config.use_sqlite:
        deps += ["sqlalchemy>=2.0.30", "aiosqlite>=0.20.0"]
    elif config.use_mongodb:
        deps += ["motor>=3.5.1", "beanie>=1.26.0"]

    if config.use_jwt or config.use_oauth2:
        deps.append("fastapi-users>=13.0.0")

    if config.use_ai:
        deps += ["httpx>=0.27.0", "sse-starlette>=2.1.0"]
    if config.ai.value == "openai":
        deps.append("openai>=1.35.0")
    if config.ai.value == "langchain":
        deps += ["langchain>=0.2.6", "langchain-openai>=0.1.14"]
    if config.ai.value == "huggingface":
        deps += ["transformers>=4.42.0", "accelerate>=0.32.0"]

    if config.use_celery:
        deps += ["celery>=5.4.0", "redis>=5.0.7", "flower>=2.0.1"]

    if config.use_pgvector:
        deps.append("pgvector>=0.2.5")
    if config.use_weaviate:
        deps.append("weaviate-client>=4.6.7")

    if config.use_sentry:
        deps.append("sentry-sdk>=2.7.1")
    if config.use_prometheus:
        deps.append("prometheus-fastapi-instrumentator>=7.0.0")

    if config.use_frontend:
        deps.append("jinja2>=3.1.4")

    return deps


def _dev_dependencies() -> list[str]:
    return [
        "pytest>=8.2.0",
        "pytest-asyncio>=0.23.8",
        "httpx>=0.27.0",
        "factory-boy>=3.3.0",
        "black>=24.4.2",
        "ruff>=0.5.0",
        "mypy>=1.10.0",
        "pre-commit>=3.7.1",
        "commitizen>=3.27.0",
    ]


def _template_map(config: ProjectConfig) -> list[tuple[str, str]]:
    mapping = [
        ("README.md.j2", "README.md"),
        ("pyproject.toml.j2", "pyproject.toml"),
        (".env.example.j2", ".env.example"),
        ("Dockerfile.j2", "Dockerfile"),
        ("docker-compose.yml.j2", "docker-compose.yml"),
        ("app/__init__.py.j2", "app/__init__.py"),
        ("app/main.py.j2", "app/main.py"),
        ("app/core/config.py.j2", "app/core/config.py"),
        ("app/core/deps.py.j2", "app/core/deps.py"),
        ("app/core/security.py.j2", "app/core/security.py"),
        ("app/api/__init__.py.j2", "app/api/__init__.py"),
        ("app/api/v1/__init__.py.j2", "app/api/v1/__init__.py"),
        ("app/api/v1/deps.py.j2", "app/api/v1/deps.py"),
        ("app/api/v1/endpoints/__init__.py.j2", "app/api/v1/endpoints/__init__.py"),
        ("app/api/v1/endpoints/health.py.j2", "app/api/v1/endpoints/health.py"),
        ("app/models/__init__.py.j2", "app/models/__init__.py"),
        ("app/schemas/__init__.py.j2", "app/schemas/__init__.py"),
        ("app/crud/__init__.py.j2", "app/crud/__init__.py"),
        ("tests/conftest.py.j2", "tests/conftest.py"),
        ("tests/test_api/test_health.py.j2", "tests/test_api/test_health.py"),
        (".github/workflows/ci.yml.j2", ".github/workflows/ci.yml"),
        (".gitignore.j2", ".gitignore"),
    ]

    if config.use_postgres:
        mapping.append(("migrations/.gitkeep.j2", "migrations/.gitkeep"))

    if config.use_ai:
        mapping += [
            ("app/api/v1/endpoints/ai/__init__.py.j2", "app/api/v1/endpoints/ai/__init__.py"),
            ("app/api/v1/endpoints/ai/chat.py.j2", "app/api/v1/endpoints/ai/chat.py"),
            ("app/api/v1/endpoints/ai/embeddings.py.j2", "app/api/v1/endpoints/ai/embeddings.py"),
        ]

    if config.use_celery:
        mapping.append(("app/tasks.py.j2", "app/tasks.py"))

    if config.use_frontend:
        mapping += [
            ("frontend/package.json.j2", "frontend/package.json"),
            ("frontend/index.html.j2", "frontend/index.html"),
            ("frontend/src/main.js.j2", "frontend/src/main.js"),
        ]

    return mapping


def render_project(config: ProjectConfig, destination: Path) -> Path:
    project_dir = destination / config.project_slug
    if project_dir.exists():
        raise FileExistsError(f"Directory already exists: {project_dir}")

    project_dir.mkdir(parents=True, exist_ok=False)

    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_ROOT)),
        autoescape=False,
        trim_blocks=True,
        lstrip_blocks=True,
        undefined=StrictUndefined,
    )

    context: dict[str, Any] = {
        "config": config,
        "project_name": config.project_name,
        "project_slug": config.project_slug,
        "dependencies": _base_dependencies(config),
        "dev_dependencies": _dev_dependencies(),
    }

    for source_name, target_name in _template_map(config):
        template = env.get_template(source_name)
        rendered = template.render(**context)
        target = project_dir / target_name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(rendered.rstrip() + "\n", encoding="utf-8")

    return project_dir
