# fastai-stack

Build production-ready, AI-first FastAPI backends in minutes.

`fastai-stack` is an interactive CLI generator for modern Python teams that want strongly typed APIs, async-first architecture, and built-in paths for LLM apps, embeddings, background jobs, observability, and container deployment.

## Why fastai-stack

- AI-native backend scaffolding, not generic boilerplate
- FastAPI + Pydantic v2 conventions out of the box
- Opinionated project structure for scale and maintainability
- Interactive and non-interactive modes for both humans and CI
- One command to scaffold full backend architecture

## Core Features

- Typer-based CLI with clean UX and smart defaults
- Jinja2 template engine with conditional generation
- Modular API layout (`app/api/v1/endpoints/*`)
- Pydantic settings model for environment-driven config
- Async-ready backend structure
- Optional AI endpoints for chat and embeddings
- Optional vector DB integration (`pgvector`, `weaviate`)
- Optional task queue support (`celery + redis`)
- Optional monitoring support (`sentry`, `prometheus`)
- Docker + Docker Compose with CPU/GPU profiles
- Poetry-based dependency management
- Test + CI scaffolding included

## Install

```bash
pip install fastai-stack
```

## Quick Start

### Interactive Mode

```bash
fastai-stack create myapp --interactive
```

### Non-Interactive Mode

```bash
fastai-stack create myapp \
	--non-interactive \
	--db postgres \
	--auth jwt \
	--tasks celery+redis \
	--ai openai \
	--vector-db pgvector \
	--docker gpu \
	--monitoring prometheus \
	--frontend htmx+vite
```

## CLI Options

`fastai-stack create <project_name> [options]`

- `--interactive / --non-interactive`
- `--db`: `postgres` | `mongodb` | `sqlite`
- `--auth`: `none` | `jwt` | `oauth2`
- `--tasks`: `none` | `celery+redis`
- `--ai`: `none` | `openai` | `langchain` | `huggingface`
- `--vector-db`: `none` | `pgvector` | `weaviate`
- `--docker`: `cpu` | `gpu`
- `--monitoring`: `none` | `sentry` | `prometheus`
- `--frontend`: `none` | `htmx+vite`
- `--output-dir <path>`

## Generated Project Structure

```text
<project_slug>/
|- app/
|  |- core/
|  |  |- config.py
|  |  |- deps.py
|  |  `- security.py
|  |- api/v1/endpoints/
|  |  |- health.py
|  |  `- ai/ (optional)
|  |- models/
|  |- schemas/
|  `- crud/
|- tests/
|- migrations/ (postgres)
|- docker-compose.yml
|- Dockerfile
|- .env.example
|- pyproject.toml
`- .github/workflows/ci.yml
```

## AI Capabilities

- OpenAI chat endpoint template with SSE token streaming
- Embeddings endpoint starter template
- Hugging Face sentence-transformers friendly defaults
- LangChain-ready integration stubs

## Dev Experience

- Consistent settings loading through `pydantic-settings`
- Clear separation of API, core, schemas, and crud layers
- Ready-to-run local development setup
- Starter tests for smoke validation

## Local Development

```bash
poetry install
poetry run pytest
poetry run fastai-stack --help
```

## Running a Generated App

Inside the generated project:

```bash
cp .env.example .env
poetry install
poetry run uvicorn app.main:app --reload
```

Open docs: `http://127.0.0.1:8000/docs`

## Docker Usage

```bash
docker compose up --build
```

If you choose `--docker gpu`, the generated compose config includes NVIDIA device reservations.

## Publishing This CLI

```bash
poetry build
poetry publish
```

## Roadmap Direction

- Richer auth blueprints (fastapi-users full wiring)
- Production-ready DB model templates
- More AI provider templates and eval-ready scaffolds
- Full release automation for PyPI + GitHub Releases

## License

MIT
